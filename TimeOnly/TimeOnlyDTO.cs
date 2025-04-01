using System.Text.Json.Serialization;

namespace TimeOnly;

public class TimeOnlyDTO
{
    [JsonPropertyName("hour")]
    public required int Hour { get; init; }
    
    [JsonPropertyName("minutes")]
    public required int Minutes { get; init; }
    
    [JsonPropertyName("seconds")]
    public required int Seconds { get; init; }
}