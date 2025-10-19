import { LovelaceCardConfig } from 'custom-card-helpers';

export interface WeatherPulseCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
  outdoor_temp_sensor?: string;
  header_mode?: 'time-focused' | 'date-focused' | 'balanced' | 'minimal' | 'greeting' | 'graphical';
  greeting_name?: string;
  show_date?: boolean;
  show_time?: boolean;
  forecast_type?: 'daily' | 'hourly';
  forecast_days?: 5 | 7;
  hourly_count?: number;
  view_mode?: 'compact' | 'standard' | 'detailed' | 'hourly' | 'weekly';
  theme?: 'retro' | 'glass' | 'minimal' | 'vibrant' | 'dark' | 'auto' | 'custom';
  animate_icons?: boolean;
  data_rows?: DataRow[];
  alerts?: AlertType[];
  custom_colors?: CustomColors;
  seasonal_images?: SeasonalImages;
  show_forecast?: boolean;
  show_current_temp?: boolean;
  show_actual_temp?: boolean;
  temp_display_mode?: 'forecast' | 'actual' | 'both';
  night_mode?: boolean;
  show_weather_info?: WeatherInfoOption[];
  weather_info_layout?: 'compact' | 'standard' | 'detailed';
  sun_entity?: string;
  moon_entity?: string;
  show_nws_alerts?: boolean;
}

export type DataRow =
  | 'temperature'
  | 'precipitation'
  | 'wind'
  | 'humidity'
  | 'uv_index'
  | 'pressure'
  | 'visibility'
  | 'cloud_cover'
  | 'sunrise_sunset'
  | 'dew_point';

export type WeatherInfoOption =
  | 'uv_index'
  | 'wind'
  | 'feels_like'
  | 'precipitation'
  | 'humidity'
  | 'pressure'
  | 'visibility'
  | 'sunrise_sunset';

export type AlertType =
  | 'weather_warnings'
  | 'rain_timing'
  | 'best_time_outside'
  | 'pollen'
  | 'contextual';

export interface CustomColors {
  cold?: string;
  cool?: string;
  moderate?: string;
  warm?: string;
  hot?: string;
}

export interface SeasonalImages {
  spring?: string;
  summer?: string;
  fall?: string;
  winter?: string;
}

export interface WeatherData {
  temperature?: number;
  temperature_unit?: string;
  humidity?: number;
  pressure?: number;
  pressure_unit?: string;
  wind_speed?: number;
  wind_speed_unit?: string;
  wind_bearing?: number;
  wind_gust_speed?: number;
  condition?: string;
  forecast?: ForecastDay[];
  apparent_temperature?: number;
  uv_index?: number;
  visibility?: number;
  visibility_unit?: string;
  precipitation?: number;
  precipitation_unit?: string;
  cloud_coverage?: number;
  dew_point?: number;
  ozone?: number;
}

export interface ForecastDay {
  datetime: string;
  temperature?: number;
  templow?: number;
  condition?: string;
  precipitation?: number;
  precipitation_probability?: number;
  wind_speed?: number;
  wind_bearing?: number;
}

export interface NWSAlert {
  id: string;
  event: string;
  headline: string;
  description: string;
  instruction?: string;
  severity: 'Extreme' | 'Severe' | 'Moderate' | 'Minor' | 'Unknown';
  urgency: 'Immediate' | 'Expected' | 'Future' | 'Past' | 'Unknown';
  certainty: 'Observed' | 'Likely' | 'Possible' | 'Unlikely' | 'Unknown';
  onset: string;
  expires: string;
  areaDesc: string;
}

export interface TemperatureGradient {
  color: string;
  backgroundColor: string;
  textColor: string;
}
