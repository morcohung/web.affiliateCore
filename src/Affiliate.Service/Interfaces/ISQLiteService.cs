using Affiliate.Service.Models.Response.IMDB;

namespace Affiliate.Service.Interfaces
{
    public interface ISQLiteService
    {
        //IpConfigIMDBResponse ExecuteSQLiteIMDBStatement(string sql, string connStr);

        IpConfigAllowResponse ExecuteSQLiteIpAllowStatement(string sql, string connStr);
    }
}
