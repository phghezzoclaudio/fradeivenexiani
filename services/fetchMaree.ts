export async function fetchMaree() {
  const res = await fetch(
    "https://dati.venezia.it/sites/default/files/dataset/opendata/previsione.json",
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error("Errore recupero maree");
  }

  const json = await res.json();

  // adattiamo il formato open data
  return json?.data?.previsioni?.map((p: any) => ({
    time: p.orario,
    value: Number(p.valore),
  })) ?? [];
}