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
  wind_speed?: number;
  wind_bearing?: number;
  condition?: string;
  forecast?: ForecastDay[];
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

export interface TemperatureGradient {
  color: string;
  backgroundColor: string;
  textColor: string;
}
