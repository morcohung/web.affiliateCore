using Affiliate.Service.Interfaces;
using StackExchange.Redis;

namespace Affiliate.Service.Redis
{
	public class DataEntity : IDataEntity
	{
		public string GetCitySegment(IDatabase db, string key, double ipdecimal)
		{
			RedisValue[] array = db.SortedSetRangeByScore(key, 0, ipdecimal, Exclude.None, Order.Descending, 0, 1, CommandFlags.PreferSlave);
			if (array.Length >= 1)
			{
				return array[0];
			}
			return "-";
		}
	}
}
