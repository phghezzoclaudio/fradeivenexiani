export interface Stop {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
}

export interface StopTime {
  trip_id: string;
  arrival_time: string;
  departure_time: string;
  stop_id: string;
  stop_sequence: string;
}