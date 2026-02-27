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

export interface Trip {

  trip_id: string;

  route_id: string;

  service_id: string;

  shape_id: string;

  trip_headsign?: string;

}

export interface Route {

  route_id: string;

  route_short_name: string;

  route_long_name: string;

  route_color?: string;

}

export interface Shape {

  shape_id: string;

  shape_pt_lat: string;

  shape_pt_lon: string;

  shape_pt_sequence: string;

}

export interface RouteResult {

  tripId: string;

  routeId: string;

  departure: string;

  arrival: string;

}