import Image from "next/image";
import Link from "next/link";

export default function ChiSiamoPage() {
  return (
    <main className="bg-venice-ivory text-venice-graphite">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-venice-red">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          
          <p className="text-venice-gold uppercase tracking-[0.25em] text-xs mb-6">
            Chi siamo
          </p>

          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Due fratelli.
            <br />
            Una sola Venezia.
          </h1>

          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Siamo i fradeivenexiani e raccontiamo Venezia in modo autentico,
            pratico e senza filtri.
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            La nostra storia
          </h2>

          <p className="text-lg leading-relaxed text-gray-600 mb-6">
            Siamo due fratelli — <strong>“Farei”</strong> in dialetto veneziano.
            La nostra storia nasce tra calli, campi e laguna, cresciuti con
            valori che ci hanno insegnato a guardare Venezia con occhi diversi.
          </p>

          <p className="text-lg leading-relaxed text-gray-600 mb-6">
            Grazie a nostro nonno <strong>Vincenzo</strong> abbiamo imparato ad
            amare la cultura, a fermarci davanti ai dettagli e a capire che ogni
            angolo di Venezia ha qualcosa da raccontare.
          </p>

          <p className="text-lg leading-relaxed text-gray-600 mb-6">
            Con nostro nonno <strong>Virginio</strong> è nato invece l’amore per
            le tradizioni della nostra laguna — quelle vere, tramandate nel
            tempo, lontane dalle rotte più turistiche.
          </p>

          <p className="text-lg leading-relaxed text-gray-600">
            E prima di tutto, grazie a <strong>Giorgio</strong>, nostro padre,
            abbiamo scoperto la fotografia: lo sguardo, la pazienza, il momento
            giusto. È da lì che nasce il nostro modo di raccontare Venezia.
          </p>
        </div>
      </section>

      {/* ================= BROTHERS ================= */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            I fradeivenexiani
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Fratello 1 */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden bg-gray-200">
                <Image
                  src="/images/brand/fratello-1.jpg"
                  alt="Fradeivenexiani"
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Fradeivenexiano
              </h3>

              <p className="text-gray-600">
                Sempre alla ricerca degli angoli più autentici della città,
                tra storia, cultura e scorci nascosti.
              </p>
            </div>

            {/* Fratello 2 */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden bg-gray-200">
                <Image
                  src="/images/brand/fratello-2.jpg"
                  alt="Fradeivenexiani"
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Fradeivenexiano
              </h3>

              <p className="text-gray-600">
                In esplorazione continua tra laguna e sestieri per trovare
                consigli davvero utili per chi visita Venezia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="py-20 px-6 bg-venice-ivory">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            La nostra missione
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Con <strong>Venice Smart</strong> vogliamo aiutarti a vivere Venezia
            come un locale: meno stress, meno tempo perso e più esperienze
            autentiche nella nostra città.
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-venice-red py-20 px-6 text-center">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">
          Pronto a scoprire Venezia?
        </h2>

        <Link
          href="/itinerari"
          className="inline-block px-8 py-3 rounded-full bg-white text-venice-red font-semibold hover:bg-venice-ivory transition"
        >
          Esplora gli itinerari
        </Link>
      </section>

    </main>
  );
}