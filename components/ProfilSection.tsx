'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProfilSection() {
  // Daftar foto (cukup tulis /nama_file karena otomatis dari folder public)
  const images = [
    "/kantor1.jpg",
    "/kantor2.jpg",
    "/kantor3.jpg",
    "/kantor4.jpg",
    "/kantor5.jpg",
    "/kantor6.jpg",
    "/kantor7.jpg",
    "/kantor8.jpg",
    "/kantor9.jpg",
    "/kantor10.jpg",
    "/kantor11.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Ganti foto setiap 10 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="profil" className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-6 text-center text-emerald-700">
          Profil Desa
        </h3>

        <div className="md:flex md:space-x-8 items-center">
          {/* Foto slider */}
          <div className="relative md:w-1/2 mb-6 md:mb-0">
            <Image
              src={images[currentIndex]}
              alt={`Foto Desa ${currentIndex + 1}`}
              width={800} // ganti sesuai resolusi
              height={500}
              className="rounded-lg shadow-md w-full transition-all duration-700 ease-in-out"
            />
            {/* indikator bulat */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex ? "bg-emerald-600" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>
          </div>

          {/* Teks profil */}
          <h1 className="text-gray-700 md:w-1/2 text-3xl">
            Desa Corawali adalah desa yang memiliki visi menjadi desa mandiri,
            maju, dan berkelanjutan. Misi kami adalah meningkatkan kesejahteraan
            warga, memperbaiki infrastruktur, dan mendukung pelestarian
            lingkungan.
          </h1>
        </div>
      </div>
    </section>
  );
}
