import TideDashboard from "../components/tides/TideDashboard";


export default function maree() {
  return (
    <main className="min-h-screen bg-slate-100 p-10 space-y-10">
      <h1 className="text-5xl font-bold">Maree Venezia Live</h1>

      <TideDashboard />

     
    </main>
  );
}