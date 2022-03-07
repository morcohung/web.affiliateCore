using System;

namespace Affiliate.Repositories.DAL
{
    [AttributeUsage(AttributeTargets.Property)]
    public class NoConversionAttribute : Attribute
    {
    }
}
