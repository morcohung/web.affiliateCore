using log4net;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml.Serialization;

namespace Web.Portal.Utilities
{
    public static class XmlSerializerHelper
    {
        private static readonly Dictionary<string, XmlSerializer> serializerCache = new Dictionary<string, XmlSerializer>();
        private static readonly object syncRoot = new object();

        private static ILog log = LogManager.GetLogger(typeof(XmlSerializerHelper).Name);

        public static string ToXml<T>(T obj)
            where T : class
        {
            if (obj == null)
            {
                return string.Empty;
            }
            try
            {
                XmlSerializer serializer = GetXmlSerializer(typeof(T));
                using (MemoryStream stream = new MemoryStream())
                {
                    serializer.Serialize(stream, obj);
                    return Encoding.UTF8.GetString(stream.ToArray());
                }
            }
            catch (Exception ex)
            {
                log.Error("XmlSerializerHelper met with exception when execute ToXml:");
                log.Error("The type name :" + typeof(T).FullName);
                log.Error(ex);
                return string.Empty;
            }
        }

        public static TReturn ToObj<TReturn>(string xml)
        {
            if (string.IsNullOrEmpty(xml))
            {
                return default(TReturn);
            }

            XmlSerializer serializer = GetXmlSerializer(typeof(TReturn));
            using (MemoryStream stream = new MemoryStream(Encoding.UTF8.GetBytes(xml)))
            {
                return (TReturn)serializer.Deserialize(stream);
            }
        }

        private static XmlSerializer GetXmlSerializer(Type type)
        {
            XmlSerializer serializer;
            if (!serializerCache.TryGetValue(type.FullName, out serializer))
            {
                lock (syncRoot)
                {
                    if (!serializerCache.TryGetValue(type.FullName, out serializer))
                    {
                        serializer = new XmlSerializer(type);
                        serializerCache.Add(type.FullName, serializer);
                    }
                }
            }

            return serializer;
        }
    }
}
