using Newtonsoft.Json;
using static TimeOnly.TimeOnlyDTO;

namespace TimeOnly;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;

public class TimeOnlyValueConverter : IPropertyValueConverter
{
    public bool IsConverter(IPublishedPropertyType propertyType) => propertyType.EditorAlias == "UmbTimeOnly";
    
    // Deserialize raw DB value into a usable .NET object (DTO, string, etc.)
    public object? ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object? source,
        bool preview)
    {
        if (source == null) throw new NullReferenceException(source?.ToString());
        TimeOnlyDTO converted = JsonConvert.DeserializeObject<TimeOnlyDTO>(source.ToString()!)!;
        
        return converted;
    }
    
    // Convert the value from ConvertSourceToIntermediate into the final strongly typed value (TimeOnly in this case)
    public object? ConvertIntermediateToObject(IPublishedElement owner, IPublishedPropertyType propertyType,
        PropertyCacheLevel referenceCacheLevel, object? inter, bool preview)
    {
        if (inter == null) throw new NullReferenceException(inter?.ToString());

        if (inter is TimeOnlyDTO dto)
        {
            // ReSharper disable once HeapView.BoxingAllocation
            inter = new System.TimeOnly(dto.Hour, dto.Minutes, dto.Seconds);
            return inter;
        }

        return null;
    }

    public PropertyCacheLevel GetPropertyCacheLevel(IPublishedPropertyType propertyType) => PropertyCacheLevel.Element;

    public Type GetPropertyValueType(IPublishedPropertyType propertyType) => typeof(System.TimeOnly);
    
    public object? ConvertIntermediateToXPath(IPublishedElement owner, IPublishedPropertyType propertyType,
        PropertyCacheLevel referenceCacheLevel, object? inter, bool preview) => throw new NotImplementedException();

    public bool? IsValue(object? value, PropertyValueLevel level) => value is System.TimeOnly;
}