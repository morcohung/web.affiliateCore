using Affiliate.General.Enums;
using Affiliate.General.EventHandlers;
using Affiliate.General.Models.Config;
using Affiliate.Repositories.Constant;
using Affiliate.Repositories.DAL;
using Affiliate.Repositories.Enums;
using Affiliate.Repositories.Utilities;
using Affiliate.Service.Interfaces;
using Affiliate.Service.Models.Response.Common;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;

namespace Affiliate.Service.Implements
{
    public class CommonService : BaseLog, ICommonService
    {     
        private readonly IOptions<ConnectionConfig> _connection;
        public CommonService(IOptions<ConnectionConfig> connection)
        {
            _connection = connection;           
        }

        public IList<LanguageResponse> GetLanguage()
        {
            Log<CommonService>(LogLevel.Information, LogSourcePoint.Service, "GetLanguage Start", null);
   
            List<LanguageResponse> entities;
            using (
                var agent = new DapperDbAgent(DataProvider.SqlServer,
                    _connection.Value.AIP2Connection))
            {
                entities = agent.ExecuteObjects<LanguageResponse>(StoreProcedures.SP_CommonGetLanguage, null).ToList();
            }

            Log<CommonService>(LogLevel.Information, LogSourcePoint.Service, "GetLanguage End", null);
            return entities;
        }  

        public List<LocalizationCountryModel> GetLocalizationCountryList(string langCode)
        {
            Log<CommonService>(LogLevel.Information, LogSourcePoint.Service, "GetLocalizationCountryList Start", null);

            List<LocalizationCountryModel> entities;
            using (
                var agent = new DapperDbAgent(DataProvider.SqlServer,
                    _connection.Value.AIP2Connection))
            {
                entities = agent.ExecuteObjects<List<LocalizationCountryModel>>(StoreProcedures.SP_GetCountryLocalizationList, null).ToList().FirstOrDefault();
            }

            Log<CommonService>(LogLevel.Information, LogSourcePoint.Service, "GetLocalizationCountryList End", null);
            return entities;
        }

        public List<ChatToolResponse> GetChatToolList(string langCode)
        {
            Log<CommonService>(LogLevel.Information, LogSourcePoint.Service, "GetLanguage Start", null);
        
            var parameters = DbParameterBuilder.Create()
                     .AddAdditionalParameter("langCode", () => langCode)
                     .Build();
            List<ChatToolResponse> entities;
            using (
                var agent = new DapperDbAgent(DataProvider.SqlServer,
                    _connection.Value.AIP2Connection))
            {
                entities = agent.ExecuteObjects<ChatToolResponse>(StoreProcedures.SP_CommonGetChatTool, parameters).ToList();
            }

            Log<CommonService>(LogLevel.Information, LogSourcePoint.Service, "GetChatToolList End", null);
            return entities;
        }

        //public List<DialCodeRespnose> GetDialCodeList(string countryCode)
        //{
        //    Log<CommonService>(LogLevel.Information, LogSourcePoint.Service, "GetDialCodeList Start", null);

        //    var entities = new List<DialCodeRespnose>();
        //    var countrysettings = new List<CountrySetting>();

        //    var parameters = DbParameterBuilder.Create()
        //          .AddAdditionalParameter("countryCode", () => countryCode)
        //          .Build();

        //    using (
        //     var agent = new DapperDbAgent(DataProvider.SqlServer,
        //         _connection.Value.AIP2Connection))
        //    {
        //        countrysettings = agent.ExecuteObjects<CountrySetting>(StoreProcedures.SP_SettingGetCountryDefaultSettings, parameters).ToList();
        //    }

        //    IDictionary<string, CountrySettingValue> _keyValues;

        //    string _key;
        //    CountrySettingValue _value;

        //    _keyValues = new Dictionary<string, CountrySettingValue>();

        //    foreach (var item in countrysettings)
        //    {
        //        _key = item.CountryCode;

        //        if (_keyValues.ContainsKey(_key) == true)
        //        {
        //            _value = _keyValues[_key];
        //            _value.AddCurrencyCode(item.CurrencyCode);

        //            continue;
        //        }

        //        _value = new CountrySettingValue();
        //        _value.PhoneCode = item.PhoneCode;
        //        _value.DefaultCurrency = item.DefaultCurrency;
        //        _value.AddCurrencyCode(item.CurrencyCode);

        //        _keyValues.Add(_key, _value);
        //    }

        //    foreach (var item in _keyValues)
        //    {
        //        var model = new DialCodeRespnose() { Code = item.Value.id, Descr = "+" + item.Value.PhoneCode, CountryCode = item.Key };

        //        if (!entities.Contains(model))
        //            entities.Add(model);
        //    }

        //    Log<CommonService>(LogLevel.Information, LogSourcePoint.Service, "GetDialCodeList End", null);
        //    return entities;
        //}
    }
}
