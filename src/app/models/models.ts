export interface Data {
  name:        string;
  local_names: { [key: string]: string };
  lat:         number;
  lon:         number;
  country:     string;
}

export interface DailyData {
  date: number;
  temp: number;
  weather: string;
  icon: string;
}

export interface HourlyData {
  date: number;
  temp: number;
  weather: string;
  icon: string;
}
  