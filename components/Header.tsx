'use client'
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full text-emerald-700">
      {/* Header utama */}
      <div className="navbar bg-white px-4">
        {/* Logo */}
        <div className="navbar-start">
          <Image
            src="/Sidrap.png"
            alt="Logo Kabupaten Sidrap"
            width={50}
            height={50}
            className="rounded"
          />
          <Image
            src="/Kemendes_Logo_(2015).png"
            alt="Logo Kemendes"
            width={50}
            height={50}
            className="rounded m-2"
          />
        </div>

        {/* Judul Tengah */}
        <div className="navbar-center">
          <a className="text-lg lg:text-xl font-bold">Desa Corawali</a>
        </div>

        {/* Tombol Login */}
        <div className="navbar-end">
          <Link
            href="/admin/login"
            className="bg-emerald-700 text-white px-4 py-1 rounded hover:text-yellow-300"
          >
            Masuk
          </Link>
        </div>
      </div>

      {/* Menu Navigasi */}
      <nav className="bg-emerald-800 px-4 py-2">
        {/* Mobile Menu */}
        <div className="lg:hidden flex justify-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-emerald-700 rounded-box w-52"
            >
              <li><a href="#profil">Profil</a></li>
              <li><a href="#berita">Berita</a></li>
              <li><a href="#staff">Staff</a></li>
              <li><a href="#infografik">Infografik</a></li>
            </ul>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex justify-center">
          <ul className="menu menu-horizontal gap-6 text-sm font-medium text-white">
            <li><a href="#profil" className="hover:text-yellow-300">Profil</a></li>
            <li><a href="#berita" className="hover:text-yellow-300">Berita</a></li>
            <li><a href="#staff" className="hover:text-yellow-300">Staff</a></li>
            <li><a href="#infografik" className="hover:text-yellow-300">Infografik</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
