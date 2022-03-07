using Affiliate.Service.Interfaces;
using StackExchange.Redis;
using System;
using System.Linq;
using System.Reflection;

namespace Affiliate.Service.Redis
{
    public class RedisHashEntry<T> : IRedisHashEntry<T>
    {
        private readonly IDatabase _DB;

        public RedisHashEntry(IDatabase DB)
        {
            _DB = DB;
        }

        public T Get(string key)
        {
            try
            {
                key = GenerateKey(key);
                var hash = _DB.HashGetAll(key);
                return MapFromHash(hash);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public HashEntry[] GetHash(string key)
        {
            try
            {
                key = GenerateKey(key);
                var hash = _DB.HashGetAll(key);
                return hash;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Save(string key, T obj)
        {
            if (obj != null)
            {
                try
                {
                    var hash = GenerateRedisHash(obj);
                    key = GenerateKey(key);
                    _DB.HashSet(key, hash);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public void SaveHash(string key, HashEntry[] hash)
        {
            if (hash != null)
            {
                try
                {
                    key = GenerateKey(key);
                    _DB.HashSet(key, hash);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public void Delete(string key)
        {
            if (string.IsNullOrWhiteSpace(key) || key.Contains(":"))
                throw new ArgumentException("invalid key");

            key = GenerateKey(key);
            _DB.KeyDelete(key);
        }

        public void SetKeyExpire(string key, int TTL)
        {
            key = GenerateKey(key);
            _DB.KeyExpire(key, TimeSpan.FromMinutes(TTL));
        }

        #region Helpers
        //generate a key from a given key and the class name of the object we are storing
        string GenerateKey(string key) => key.Contains(":") ? key :
            string.Concat(key.ToLower(), ":", NameOfT.ToLower());

        //create a hash entry array from object using reflection
        HashEntry[] GenerateRedisHash(T obj)
        {
            var props = PropertiesOfT;
            var hash = new HashEntry[props.Count()];
            for (int i = 0; i < props.Count(); i++)
            {
                string strval = props[i].PropertyType == typeof(DateTime) ?
                    ((DateTime)props[i].GetValue(obj)).ToString("MM/dd/yyyy HH:mm") : props[i].GetValue(obj).ToString();
                hash[i] = new HashEntry(props[i].Name, strval);
            }
            return hash;
        }

        //build object from hash entry array using reflection
        T MapFromHash(HashEntry[] hash)
        {
            var obj = (T)Activator.CreateInstance(TypeOfT);
            var props = PropertiesOfT;

            for (int i = 0; i < props.Count(); i++)
                for (int j = 0; j < hash.Count(); j++)
                    if (props[i].Name == hash[j].Name)
                    {
                        var val = hash[j].Value;
                        var type = props[i].PropertyType;

                        if (type.IsGenericType && type.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
                            if (string.IsNullOrEmpty(val))
                                props[i].SetValue(obj, null);

                        var covertobj = type.IsEnum ? Enum.Parse(type, val, true) : Convert.ChangeType(val, type);
                        props[i].SetValue(obj, covertobj);
                    }
            return obj;
        }

        Type TypeOfT { get { return typeof(T); } }

        string NameOfT { get { return TypeOfT.FullName; } }

        PropertyInfo[] PropertiesOfT { get { return TypeOfT.GetProperties(); } }
        #endregion
    }
}
