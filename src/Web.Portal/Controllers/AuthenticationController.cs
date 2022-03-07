using Affiliate.General.Models.Config;
using Affiliate.Service.Enums;
using Affiliate.Service.Interfaces;
using Affiliate.Service.Utilities;
using Affiliate.Token.Enum;
using Affiliate.Token.Interfaces;
using Affiliate.Token.Models.Config;
using Affiliate.Token.Models.JWT;
using Affiliate.Token.Utilities;
using log4net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Web.Portal.Models;

namespace Web.Portal.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(AuthenticationController));     
        public ITokenGenerator tokenGenerator { get; set; }
        public ITokenValidator tokenValidator { get; set; }
        public IMemberService memberService { get; set; }
        public IInternalPartnerService internalPartnerService { get; set; }

        public AuthenticationController(ITokenGenerator _tokenGenerator, ITokenValidator _tokenValidator, IMemberService _memberService, IInternalPartnerService _internalPartnerService)
        {
            tokenGenerator = _tokenGenerator;
            tokenValidator = _tokenValidator;
            memberService = _memberService;
            internalPartnerService = _internalPartnerService;
        }
       
        [HttpPost("login")]
        public ResponseModel Login([FromBody]LoginModel model)
        {
            var resp = new ResponseModel();
            try
                {

                var password = CommonHelper.HashPassword(model.Password);

                var ip = CommonHelper.GetIpAddress(HttpContext);

                var dto = memberService.GetMemberInfo(model.Username);

                if (dto == null)
                    return new ResponseModel(1, "incorrect.username.password");

                if (dto.MemberStatus != MemberStatus.Approved)
                    return new ResponseModel(1, "incorrect.username.password");

                if (dto.MemberStatus == MemberStatus.Terminated)                 
                    return new ResponseModel(1, "account.terminated");

                // Check for locked account
                if (dto.LockStatus == LockedStatus.Locked)
                    return new ResponseModel(1, "account.locked");
            
                if (memberService.Login(dto.Id, password, ip))
                {
                    Dictionary<string, string> keyValuePairs = new Dictionary<string, string>
                    { 
                        { "Id", dto.Id.ToString() },
                        { "Name", dto.Name.ToString()},
                        { "Language", dto.Language },                     
                    };
                    var token = tokenGenerator.CreateToken(keyValuePairs);
                    resp.Params = new Dictionary<string, object>();
                    resp.Params["Token"] = token;

#if !DEBUG
                    Log.Info("Call Iovation...");
                    Task.Factory.StartNew(() => AccessIovation(model.Username, ip, model.IovationBlackbox, dto.CreatedTime, AgileCheckEnum.RuleSet.Login));              
#endif
                }
            }
            catch (SmtpException ex)
            {
                // Just log the error if unable to send email
                Log.Error(ex.Message, ex);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message, ex);
            }
            return resp;
        }
      
        [HttpGet("IsSessionExpired")]       
        public ResponseModel IsSessionExpired()
        {
            var resp = new ResponseModel();
            try
            {
                resp.Message = null;
                var expires = DateTime.Parse(User.Claims.FirstOrDefault(p => p.Type == "ExpireTime").Value);
                resp.Status = DateTime.Now <= expires ? 1 : 0;
            }
            catch
            {
                resp.Message = null;
                resp.Status =  1 ;
            }
            return resp;
        }

        [HttpGet("RefreshToken")]
        public ResponseModel RefreshToken(string token)
        {
            var resp = new ResponseModel();
            try
            {
                var tokeninfo = tokenGenerator.RefreshToken(token);
                resp.Params = new Dictionary<string, object>();
                resp.Params["Token"] = tokeninfo;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message, ex);
            }
            return resp;
        }

        public void AccessIovation(string affUserName, string clientIpAddress, string iOvationBlackbox, DateTime registrationDate, AgileCheckEnum.RuleSet ruleSet)
        {
            try
            {
                if (internalPartnerService.isiOvationEnabled())
                {
                    var agileCheckResponse = internalPartnerService.GetAccessType(affUserName, clientIpAddress, iOvationBlackbox, registrationDate, ruleSet);
                }
            }
            catch (AggregateException ex)
            {
                var exceptions = ex.Flatten();
                if (exceptions.InnerExceptions.Count > 0)
                    Log.Error(exceptions.InnerExceptions[0]);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
            }
        }

        //[Authorize]
        //[HttpGet]
        //public ResponseModel ValiToken(string tokenStr)
        //{
        //    var resp = new ResponseModel();

        //    bool isvilidate = tokenValidator.ValiToken(tokenStr);
        //    if (isvilidate)
        //    {
        //        resp.Params = new Dictionary<string, object>();
        //        resp.Params["Token"] = tokenStr;
        //    }
        //    else
        //    {
        //        resp.Status = 1;
        //        resp.Message = "token fail";
        //    } 

        //    return resp;
        //}

        //[HttpGet("ValiTokenState")]
        //public ReturnModel ValiTokenState(string tokenStr)
        //{
        //    var ret = new ReturnModel
        //    {
        //        TnToken = new TnToken()
        //    };
        //    string loginID = "";
        //    TokenType tokenType = tokenValidator.ValiTokenState(tokenStr, a => a["iss"] == "WYY" && a["aud"] == "EveryTestOne", action => { loginID = action["loginID"]; });
        //    if (tokenType == TokenType.Fail)
        //    {
        //        ret.Code = 202;
        //        ret.Msg = "token fail";
        //        return ret;
        //    }
        //    if (tokenType == TokenType.Expired)
        //    {
        //        ret.Code = 205;
        //        ret.Msg = "token expired";
        //        return ret;
        //    }

        //    //..............其他邏輯
        //    var data = new List<Dictionary<string, string>>();
        //    var bb = new Dictionary<string, string>
        //    {
        //        { "Wyy", "123456" }
        //    };
        //    data.Add(bb);
        //    ret.Code = 200;
        //    ret.Msg = "訪問成功!";
        //    ret.Data = data;
        //    return ret;
        //}

        //[Authorize]
        //[HttpGet("claims")]
        //public IActionResult GetClaims()
        //{
        //    return Ok(User.Claims.Select(p => new { p.Type, p.Value }));
        //}          
    }
}
