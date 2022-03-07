using System;

namespace Affiliate.Repositories.DAL
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Property, Inherited = false)]
    public class DbTableTypeAttribute : Attribute
    {
        public string Name { get; }

        public DbTableTypeAttribute(string name)
        {
            if (string.IsNullOrEmpty(name))
                throw new ArgumentNullException(nameof(name));

            Name = name;
        }
    }
}
