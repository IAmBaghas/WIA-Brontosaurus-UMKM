export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero-bg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 to-background" />
      </div>

      <div className="relative container py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-[#133149]">
            Temukan UMKM di Sekitarmu
          </h1>
          <p className="text-lg md:text-xl text-[#133149]">
            Dukung UMKM lokal di lingkungan kampusmu. Makanan, minuman, dan jasa
            terbaik ada di sini.
          </p>
          <div className="p-4 flex justify-center items-center">
            <div className="flex justify-center items-center bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 w-full max-w-xl">
              <input
                type="text"
                disabled
                placeholder="Universitas Indonesia"
                className="w-full px-3 py-3 text-gray-400 bg-transparent focus:outline-none cursor-not-allowed"
              />
              <button
                disabled
                className="bg-[#204564] text-white font-semibold px-6 py-3 rounded-r-lg cursor-not-allowed"
              >
                Cari
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
