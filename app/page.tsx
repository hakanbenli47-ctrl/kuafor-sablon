"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "@/app/theme/theme"
/* HEADER COMPONENT */
function Header() {
  const [scrolled, setScrolled] = useState(false)
const { theme } = useTheme()
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
       scrolled
  ? `${theme.headerBg} ${theme.headerText} shadow-md py-3`
  : "bg-transparent text-white py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">

        <div className="text-2xl font-bold">
          FİLİZ
          <span className="block text-sm opacity-60 tracking-wide">
            Güzellik Merkezi
          </span>
        </div>

        <nav className="hidden md:flex space-x-10 text-sm font-medium">
          <a href="#hizmetler" className={`${theme.link}`}>Hizmetler</a>
          <a href="#ekip" className={`${theme.link}`}>Ekip</a>
          <a href="#galeri" className={`${theme.link}`}>Galeri</a>
          <a href="#yorumlar" className={`${theme.link}`}>Yorumlar</a>
        </nav>

        <Link
          href="/filizkuafor"
          className={`${theme.button} px-5 py-2 text-sm transition`}
        >
          Randevu Al
        </Link>

      </div>
    </header>
  )
}

/* MAIN PAGE */
export default function Home() {
  const { theme } = useTheme()

  return (
    <main className={`${theme.bg} overflow-x-hidden`}>

      <Header />

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center bg-[url('/hero.jpg')] bg-cover bg-center">
       <div className={`absolute inset-0 ${theme.heroOverlay}`}></div>

        <div className={`relative z-10 px-6 max-w-3xl space-y-6 ${theme.heroText}`}>
          <h1 className="text-5xl md:text-6xl font-bold">
            Filiz Güzellik Merkezi
          </h1>
          <p className="text-lg md:text-xl">
            Sakarya'nın en güvenilir ve modern güzellik deneyimi.
          </p>
          <Link
            href="/filizkuafor"
className={`${theme.button} px-8 py-4 rounded-lg font-semibold transition`}
          >
            Hemen Randevu Al
          </Link>
        </div>
      </section>
{/* KAMPANYALAR */}
<section className={`py-28 px-6 md:px-20 ${theme.sectionAlt} text-center`}>
  <h2 className="text-4xl font-bold mb-16">
    Güncel Kampanyalar
  </h2>

  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

    {[
      {
        title: "Hydrafacial %20 İndirim",
        desc: "Tüm cilt bakımı uygulamalarında sınırlı süreli fırsat.",
        badge: "Sınırlı Süre"
      },
      {
        title: "Protez Tırnak + Kalıcı Oje",
        desc: "İkili bakım paketinde özel fiyat avantajı.",
        badge: "Popüler"
      },
      {
        title: "Lazer Epilasyon Paket",
        desc: "3 Bölge al 1 Bölge hediye kampanyası.",
        badge: "En Çok Tercih Edilen"
      }
    ].map((item, i) => (
      <div
        key={i}
       className={`relative ${theme.card} rounded-2xl p-8 text-left shadow-xl hover:-translate-y-2 transition duration-300`}
      >

        <span className={`absolute -top-3 left-6 ${theme.button} text-xs px-3 py-1 rounded-full`}>
          {item.badge}
        </span>

        <h3 className="text-xl font-semibold mt-4">
          {item.title}
        </h3>

        <p className="opacity-70 mt-3 text-sm">
          {item.desc}
        </p>

        <Link
          href="/filizkuafor"
          className={`inline-block mt-6 ${theme.button} px-6 py-2 rounded-lg`}
        >
          Randevu Al
        </Link>

      </div>
    ))}

  </div>
</section>
     {/* HİZMETLER */}
<section id="hizmetler" className={`py-28 px-6 md:px-20 text-center ${theme.sectionAlt}`}>
  <h2 className="text-4xl font-bold mb-20">Hizmetlerimiz</h2>

  <div className="grid md:grid-cols-3 gap-12">

    {[
      {
        title: "Saç Tasarım",
        desc: "Saç kesimi, renklendirme, ombre, sombre ve profesyonel şekillendirme.",
        img: "sac.jpg"
      },
      {
        title: "Cilt Bakımı",
        desc: "Hydrafacial, leke bakımı, anti-aging uygulamalar.",
        img: "cilt.jpg"
      },
      {
        title: "Lazer Epilasyon",
        desc: "Son teknoloji cihazlarla güvenli ve konforlu uygulama.",
        img: "lazer.jpg"
      },
      {
        title: "Kalıcı Makyaj",
        desc: "Microblading, dudak renklendirme ve eyeliner uygulamaları.",
        img: "makyaj.jpg"
      },
      {
        title: "Protez Tırnak",
        desc: "Jel tırnak, kalıcı oje ve nail art tasarımları.",
        img: "tirnak.jpg"
      },
      {
        title: "Bölgesel Zayıflama",
        desc: "Kavitasyon ve sıkılaştırma uygulamaları.",
        img: "zayiflama.jpg"
      },
    ].map((item, i) => (
      <div
        key={i}
       className={`${theme.card} rounded-xl shadow-lg overflow-hidden group hover:-translate-y-2 transition duration-300`}
      >
        <img
          src={`/${item.img}`}
          className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
          alt={item.title}
        />

        <div className="p-6 space-y-4">
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="opacity-70 text-sm">{item.desc}</p>

          <Link
            href="/filizkuafor"
           className={`inline-block ${theme.link} font-semibold hover:underline`}
          >
            Randevu Al →
          </Link>
        </div>
      </div>
    ))}

  </div>
</section>
{/* HAKKIMIZDA */}
<section className={`py-28 px-6 md:px-20 ${theme.sectionSoft}`}>
  <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

    <div>
      <img
        src="/about.jpg"
        className="w-full h-[500px] object-cover rounded-xl shadow-xl"
        alt="Filiz Güzellik Merkezi"
      />
    </div>

    <div className="space-y-6">
      <h2 className="text-4xl font-bold">
        2010'dan Beri Güzelliğinize Değer Katıyoruz
      </h2>

     <div className={`w-20 h-1 ${theme.accentLine}`}></div>

      <p className="opacity-80 leading-relaxed">
        Filiz Güzellik Merkezi olarak amacımız sadece hizmet sunmak değil,
        kendinizi özel hissettiğiniz bir deneyim yaşatmaktır.
        Hijyen standartlarımız, profesyonel ekibimiz ve son teknoloji cihazlarımız
        ile Sakarya’da güvenilir bir marka olmayı başardık.
      </p>

      <p className="opacity-80 leading-relaxed">
        Her danışanımız bizim için özeldir. Kişiye özel bakım planları ile
        maksimum memnuniyet hedefliyoruz.
      </p>

      <Link
        href="/filizkuafor"
className={`inline-block ${theme.button} px-8 py-3 mt-4 transition`}
      >
        Randevu Al
      </Link>
    </div>

  </div>
</section>
      {/* EKİP */}
      <section id="ekip" className={`py-24 ${theme.sectionAlt} text-center`}>
        <h2 className="text-4xl font-bold mb-12">Uzman Ekibimiz</h2>
        <div className="grid md:grid-cols-3 gap-10 px-6 md:px-20">
          {["Ayşe", "Mehmet", "Elif"].map((name, i) => (
            <div key={i} className="space-y-3">
              <div className="w-40 h-40 mx-auto rounded-full bg-cover bg-center" style={{backgroundImage: `url(/person${i+1}.jpg)`}}></div>
              <h3 className="text-xl font-semibold">{name}</h3>
             <p className="opacity-70 text-sm">Profesyonel Uzman</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALERİ */}
      <section id="galeri" className="py-24 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold mb-12">Galeri</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map((i) => (
            <img
              key={i}
              src={`/gallery${i}.jpg`}
              className="w-full h-48 object-cover rounded-lg hover:scale-105 transition"
              alt="Salon Galeri"
            />
          ))}
        </div>
      </section>

      {/* YORUMLAR */}
      <section id="yorumlar" className={`py-24 ${theme.sectionSoft} text-center`}>
        <h2 className="text-4xl font-bold mb-12">Müşteri Yorumları</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            { name: "Zeynep", text: "Muhteşem hizmet, harika deneyim!" },
            { name: "Mehmet", text: "Kesinlikle tavsiye ederim." },
          ].map((item, i) => (
  <div key={i} className={`${theme.card} p-6 rounded-lg shadow-md`}>
              <p className="italic opacity-80">“{item.text}”</p>
              <p className="italic opacity-80">— {item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className={`py-20 text-center ${theme.ctaBg} ${theme.ctaText}`}>
        <h3 className="text-3xl font-bold mb-4">Randevu İçin Hazır Mısın?</h3>
        <Link
          href="/filizkuafor"
         className={`bg-white ${theme.link} px-8 py-3 rounded-lg font-semibold`}
        >
          Hemen Randevu Al
        </Link>
      </section>

      {/* FOOTER */}
      <footer className={`${theme.footerBg} ${theme.footerText} text-center py-12`}>
        <p>Sakarya – Türkiye</p>
        <p className="opacity-70 mt-1">0530 630 67 91 </p>
        <p className="opacity-50 mt-6 text-sm">© 2026 Filiz Güzellik Merkezi</p>
      </footer>

    </main>
  )
}