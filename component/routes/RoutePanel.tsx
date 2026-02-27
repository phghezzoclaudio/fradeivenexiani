interface Props {
  route: any;
}

export default function RoutePanel({ route }: Props) {

  if (!route) return null;

  return (
    <div className="mt-4">

      <div className="font-bold text-lg">
        Linea {route.route?.route_short_name}
      </div>

      <div className="text-sm text-gray-600">
        {route.from.stop_name} → {route.to.stop_name}
      </div>

      <div className="mt-3">

        {route.stops.map((s: any) => (
          <div key={s.stop_id}>
            • {s.stop_name}
          </div>
        ))}

      </div>

    </div>
  );
}