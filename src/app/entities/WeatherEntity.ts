export type WeatherAPIProps = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    weathercode: string;
  };
  hourly: {
    time: Date[],
    weathercode: number[]
  };
}
