using log4net;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;

namespace Web.Portal.Utilities
{
    public class JsonSerializerHelpr
    {
        private static ILog log = LogManager.GetLogger(typeof(JsonSerializerHelpr).Name);
        private static readonly Dictionary<string, DataContractJsonSerializer> cache = new Dictionary<string, DataContractJsonSerializer>();
        private static readonly object syncRoot = new object();

        public static TReturn ToObj<TReturn>(string folder, string fileName)
        {
            TReturn result = default(TReturn);
            try
            {
                if (string.IsNullOrEmpty(folder) || string.IsNullOrEmpty(fileName))
                {
                    return result;
                }
                var path = Path.Combine(folder, fileName);
                using (StreamReader file = File.OpenText(path))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    result = (TReturn)serializer.Deserialize(file, typeof(TReturn));
                }
            }
            catch (Exception e)
            {
                log.Error(e);
            }
            return result;
        }

        public static string Serialize<T>(T obj)
        {
            DataContractJsonSerializer serializer = GetSerializer(typeof(T));
            using (MemoryStream stream = new MemoryStream())
            {
                serializer.WriteObject(stream, obj);
                return Encoding.UTF8.GetString(stream.ToArray());
            }
        }

        private static DataContractJsonSerializer GetSerializer(Type type)
        {
            DataContractJsonSerializer serializer;
            string typeName = type.ToString();
            if (!cache.TryGetValue(typeName, out serializer))
            {
                lock (syncRoot)
                {
                    if (!cache.TryGetValue(typeName, out serializer))
                    {
                        serializer = new DataContractJsonSerializer(type);
                        cache[typeName] = serializer;
                    }
                }
            }

            return serializer;
        }
    }
}
