"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Staff", href: "/admin/staff" },
  { label: "Infografik", href: "/admin/infografik" },
  { label: "Berita", href: "/admin/berita" },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-green-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded hover:bg-green-800 transition ${
                pathname === item.href ? "bg-green-900" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
