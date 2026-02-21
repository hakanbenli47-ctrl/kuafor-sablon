"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

/* HEADER COMPONENT */
function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black shadow-lg py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        
        <div className="text-2xl font-bold tracking-widest">
          ANT
          <span className="block text-xs text-gray-400 tracking-wide">
            ERKEK KUAFÖRÜ
          </span>
        </div>

        <nav className="hidden md:flex space-x-10 text-sm">
          <a href="#hizmetler" className="hover:text-gray-400">Hizmetler</a>
          <a href="#galeri" className="hover:text-gray-400">Galeri</a>
          <a href="#iletisim" className="hover:text-gray-400">İletişim</a>
        </nav>

        <Link
          href="/antberber"
          className="bg-white text-black px-6 py-2 text-sm hover:scale-105 transition inline-block"
        >
          Randevu
        </Link>

      </div>
    </header>
  )
}

/* MAIN PAGE */
export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">

      <Header />

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <img
          src="/hero.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Hero"
        />

        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Erkek Bakımında <br /> Yeni Standart
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10">
            2012’den beri Antalya’da premium erkek kuaför hizmeti.
          </p>

          <Link
            href="/antberber"
            className="bg-white text-black px-10 py-4 font-semibold hover:scale-105 transition duration-300 inline-block"
          >
            Hemen Randevu Al
          </Link>

        </div>
      </section>

      {/* PRESTİJ BANDI */}
      <section className="bg-zinc-900 py-20 text-center border-t border-zinc-800 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 px-6">
          <div>
            <h2 className="text-4xl font-bold">12+</h2>
            <p className="text-gray-400 text-sm mt-2">Yıllık Deneyim</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">5.000+</h2>
            <p className="text-gray-400 text-sm mt-2">Mutlu Müşteri</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">4.9★</h2>
            <p className="text-gray-400 text-sm mt-2">Google Puanı</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">%100</h2>
            <p className="text-gray-400 text-sm mt-2">Memnuniyet</p>
          </div>
        </div>
      </section>

      {/* HİZMETLER */}
      <section id="hizmetler" className="py-28 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold mb-20">
          Hizmetlerimiz
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: "Saç Kesimi", img: "galeri1.jpg" },
            { title: "Sakal Tasarımı", img: "galeri2.jpg" },
            { title: "Cilt Bakımı", img: "galeri3.jpg" },
          ].map((item, i) => (
            <div key={i} className="group relative overflow-hidden">
              <img
                src={`/${item.img}`}
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                alt={item.title}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-2xl font-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="iletisim" className="bg-black text-center py-12 border-t border-zinc-800">
        <p>Antalya / Muratpaşa</p>
        <p className="text-gray-400 mt-2">0555 000 00 00</p>
        <p className="text-gray-600 mt-6 text-sm">
          © 2026 Erkek Kuaförü
        </p>
      </footer>

    </main>
  )
}
