using System;
using System.Runtime.Serialization;
using System.Xml.Serialization;

namespace Web.Portal.Models.Configuration
{
    [Serializable]
    [DataContract]
    public class SubDomainSetting
    {
        [XmlAttribute]
        [DataMember(Name = "id")]
        public string name { get; set; }

        [XmlAttribute]
        [DataMember(Name = "dyamic")]
        public bool isDynamic { get; set; }

        [XmlAttribute]
        [DataMember(Name = "u")]
        public string url { get; set; }
    }
}
