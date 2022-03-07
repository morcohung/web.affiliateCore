using System;
using System.Globalization;
using System.Runtime.Serialization;
using System.Xml.Serialization;

namespace Web.Portal.Models.Configuration
{
    [Serializable]
    [DataContract]
    public class LanguageInfo
    {
        [XmlAttribute]
        [DataMember(Name = "index")]
        public long Index { get; set; }

        [XmlAttribute]
        [DataMember(Name = "display")]
        public string Display { get; set; }

        [XmlAttribute]
        [DataMember(Name = "code")]
        public string Code { get; set; }

        [XmlAttribute]
        [DataMember(Name = "value")]
        public string Value
        {
            get { return this.value?.ToLower(); }
            set
            {
                if (this.value != value)
                {
                    this.CultureInfo = new CultureInfo(value);
                    this.value = value;
                }
            }
        }

        private string value;

        [XmlAttribute]
        [IgnoreDataMember]
        public string LegacyCode { get; set; }

        [XmlIgnore]
        [IgnoreDataMember]
        public CultureInfo CultureInfo { get; private set; }

        public override string ToString()
        {
            return string.Format("{0}:{1}", Display, Value);
        }
    }
}