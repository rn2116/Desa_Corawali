export default function ProfilSection() {
  return (
    <section id="profil" className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-6 text-center text-emerald-700">Profil Desa</h3>
        <div className="md:flex md:space-x-8">
          <img src="/images/desa.jpg" alt="Foto Desa" className="rounded-lg shadow-md md:w-1/2 mb-6 md:mb-0"/>
          <p className="text-gray-700 md:w-1/2">
            Desa Corawali adalah desa yang memiliki visi menjadi desa mandiri, maju, dan berkelanjutan.
            Misi kami adalah meningkatkan kesejahteraan warga, memperbaiki infrastruktur, dan mendukung
            pelestarian lingkungan.
          </p>
        </div>
      </div>
    </section>
  )
}
