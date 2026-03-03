export interface StopScheduleItem {
  time: string;
  route_short_name: string;
  route_color: string;
}

export function buildStopSchedule(
  stopId: string,
  stopTimes: any[],
  trips: any[],
  routes: any[]
): StopScheduleItem[] {

  const result: StopScheduleItem[] = [];

  for (const st of stopTimes) {

    if (st.stop_id !== stopId) continue;

    const trip = trips.find(
      t => t.trip_id === st.trip_id
    );

    if (!trip) continue;

    const route = routes.find(
      r => r.route_id === trip.route_id
    );

    if (!route) continue;

    result.push({
      time: st.arrival_time,
      route_short_name: route.route_short_name,
      route_color: route.route_color
    });

    if (result.length >= 8) break;
  }

  return result;
}