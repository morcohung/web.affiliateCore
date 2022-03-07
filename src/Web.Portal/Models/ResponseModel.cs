using System.Collections.Generic;

namespace Web.Portal.Models
{
    public class ResponseModel
    {
        public int Status { get; set; }
        public string Message { get; set; }
        public IDictionary<string, object> Params { get; set; }

        public ResponseModel()
        {
            Status = 0; // 0=success; 1=error
        }

        public ResponseModel(int status, string message)
        {
            Status = status;
            Message = message;
        }
    }
}
