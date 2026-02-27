export interface Stop {

  stop_id: string;

  stop_name: string;

  stop_lat: string;

  stop_lon: string;

}

export interface StopTime {

  trip_id: string;

  stop_id: string;

  stop_sequence: string;

}

export interface Shape {

  shape_id: string;

  shape_pt_lat: string;

  shape_pt_lon: string;

  shape_pt_sequence: string;

}

export interface Trip {

  trip_id: string;

  route_id: string;

  shape_id: string;

}