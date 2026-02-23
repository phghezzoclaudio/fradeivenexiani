import { DateTime } from "luxon";

interface Props {
  data: {
    line: string;
    departure: string;
    arrival: string;
    duration: number;
  };
}

export default function RouteResult({ data }: Props) {

  const now = DateTime.now().setZone("Europe/Rome");
  const departureTime = DateTime.fromFormat(
    data.departure,
    "HH:mm:ss",
    { zone: "Europe/Rome" }
  );

  const minutes = Math.max(
    0,
    Math.floor(departureTime.diff(now, "minutes").minutes)
  );

  return (
    <div className="mt-8 bg-white p-6 rounded-3xl shadow-xl border border-[var(--oro-veneziano)]/40">

      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-500">
            Prossima corsa
          </p>
          <p className="text-3xl font-bold text-[var(--rosso-veneziano)]">
            Linea {data.line}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xl font-semibold">
            {data.departure.slice(0,5)}
          </p>
          <p className="text-gray-500 text-sm">
            Arrivo {data.arrival.slice(0,5)}
          </p>
        </div>
      </div>

      <div className="bg-[var(--azzurro-veneziano)] text-white text-center py-4 rounded-2xl font-semibold text-lg">
        Parte tra {minutes} minuti
      </div>

      <div className="mt-4 text-center text-gray-500 text-sm">
        Durata viaggio {data.duration} min
      </div>
    </div>
  );
}