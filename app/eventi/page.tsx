const events = [
  {
    title: "Carnevale di Venezia",
    date: "31.01 – 17.02.2026",
    link: "https://carnevale.venezia.it"
  },
  {
    title: "Su e Zo per i Ponti",
    date: "12.04.2026",
    link: "https://suezo.it"
  },
  {
    title: "Biennale Arte",
    date: "09.05 – 22.11.2026",
    link: "https://labiennale.org"
  },
  {
    title: "Festa della Sensa",
    date: "17.05.2026",
    link: "https://sensavenezia.it"
  },
  {
    title: "Vogalonga",
    date: "24.05.2026",
    link: "https://vogalonga.com"
  },
  {
    title: "Salone Nautico Venezia",
    date: "27.05 – 31.05.2026",
    link: "https://salonenautico.venezia.it"
  },
  {
    title: "Festival Internazionale del Teatro",
    date: "07.06 – 21.06.2026",
    link: "https://labiennale.org"
  },
  {
    title: "Concerti in Piazza San Marco",
    date: "25.06 – 15.07.2026",
    link: "https://veneziaunica.it"
  },
  {
    title: "Festival Internazionale di Danza",
    date: "17.07 – 01.08.2026",
    link: "https://labiennale.org"
  },
  {
    title: "Festa del Redentore",
    date: "18.07 – 19.07.2026",
    link: "https://redentorevenezia.it"
  }
]

export default function Eventi() {
  return (
    <main className="min-h-screen bg-blue-900 text-white p-10 max-w-6xl mx-auto">

      <h1 className="text-5xl font-bold mb-10">
        Venezia Eventi 2026
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {events.map((event, i) => (
          <div
            key={i}
            className="border border-white/20 rounded-xl p-6 backdrop-blur"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {event.title}
            </h2>

            <p className="text-blue-200 mb-4">
              {event.date}
            </p>

            <a
              href={event.link}
              target="_blank"
              className="text-sm underline hover:text-blue-300"
            >
              Vai al sito
            </a>
          </div>
        ))}

      </div>

    </main>
  )
}