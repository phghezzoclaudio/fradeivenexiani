
export async function GET() {
  const res = await fetch(
    "https://dati.venezia.it/sites/default/files/dataset/opendata/previsione.json",
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    return Response.json({ error: "Errore maree" }, { status: 500 });
  }

  const raw = await res.json();

  const tides = raw.map((t: any) => ({
    time: t.DATA_ESTREMALE,
    value: Number(t.VALORE),
    type: t.TIPO_ESTREMALE
  }));

  return Response.json(tides.slice(0, 6));
}
