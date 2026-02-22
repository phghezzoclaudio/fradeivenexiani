interface Props {
  data: {
    line: string;
    departure: string;
    arrival: string;
    duration: number;
  };
}

export default function ResultCard({ data }: Props) {
  const departure = data.departure.slice(0, 5);
  const arrival = data.arrival.slice(0, 5);

  return (
    <div className="mt-6 bg-white p-5 rounded-2xl shadow-md">
      <div className="text-center">
        <p className="text-lg font-bold mb-2">
          Linea {data.line}
        </p>

        <p className="text-gray-600">
          Partenza: <strong>{departure}</strong>
        </p>

        <p className="text-gray-600">
          Arrivo: <strong>{arrival}</strong>
        </p>

        <p className="mt-3 text-sm text-gray-500">
          Durata {data.duration} minuti
        </p>
      </div>
    </div>
  );
}