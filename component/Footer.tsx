export default function Footer() {
  return (
    <footer className="bg-venice-red text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center">
        <h3 className="text-lg font-semibold tracking-wide">
          Venezia Smart City
        </h3>

        <p className="mt-2 text-white/80">
          Informazioni su trasporti, maree e mobilità
        </p>

        <p className="text-sm text-white/60 mt-6">
          © {new Date().getFullYear()} FradeiVenexiani
        </p>
      </div>
    </footer>
  );
}
