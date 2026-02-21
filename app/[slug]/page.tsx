"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function SalonPage() {
  const params = useParams()
  const slug = params?.slug as string

  const hizmetler = [
    { ad: "Saç Kesimi", sure: 30 },
    { ad: "Sakal", sure: 30 },
    { ad: "Saç + Sakal", sure: 60 },
    { ad: "Cilt Bakımı", sure: 60 },
  ]

  const [salon, setSalon] = useState<any>(null)
  const [loading, setLoading] = useState(true)
const [uygunGunler, setUygunGunler] = useState<any[]>([])
  const [seciliHizmet, setSeciliHizmet] = useState<any>(null)
  const [tarih, setTarih] = useState("")
  const [musteriAd, setMusteriAd] = useState("")
  const [musteriTel, setMusteriTel] = useState("")
  const [doluSaatler, setDoluSaatler] = useState<string[]>([])
  const [seciliSaat, setSeciliSaat] = useState("")
function formatLocalDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

  // 1️⃣ Haftayı üret
  

  // Salon çek
  useEffect(() => {
    if (!slug) return

    async function getSalon() {
      const { data } = await supabase
        .from("salonlar")
        .select("*")
        .eq("slug", slug)
        .single()

      if (data) setSalon(data)
      setLoading(false)
    }

    getSalon()
  }, [slug])
useEffect(() => {
  if (!salon) return

  async function gunleriFiltrele() {
    const bugun = new Date()
    const tumSaatler = saatleriUret()
    const aktifGunler = []

    for (let i = 0; i < 7; i++) {
      const tarihObj = new Date()
      tarihObj.setDate(bugun.getDate() + i)
      const iso = formatLocalDate(tarihObj)


      const { data } = await supabase
        .from("randevular")
        .select("saat")
        .eq("salon_id", salon.id)
        .eq("tarih", iso)

      const dolu = data?.map(r => r.saat.slice(0,5)) || []

      const bosSlotVar = tumSaatler.some(s => !dolu.includes(s))

      if (bosSlotVar) {
        aktifGunler.push({
          label: tarihObj.toLocaleDateString("tr-TR", {
            weekday: "short",
            day: "numeric",
            month: "short",
          }),
          value: iso,
        })
      }
    }

    setUygunGunler(aktifGunler)
  }

  gunleriFiltrele()
}, [salon])

  // Saat üret
function saatleriUret() {
  const saatler = []
  for (let i = 8; i < 21; i++) {
    saatler.push(`${i.toString().padStart(2, "0")}:00`)
    saatler.push(`${i.toString().padStart(2, "0")}:30`)
  }
  return saatler
}


  // Dolu saatleri çek
  useEffect(() => {
    if (!tarih || !salon) return

    async function doluSaatleriGetir() {
      const { data } = await supabase
        .from("randevular")
        .select("saat")
        .eq("salon_id", salon.id)
        .eq("tarih", tarih)

      if (data) {
        setDoluSaatler(
  data.map((r) => {
    const [hour, minute] = r.saat.split(":")
    return `${hour.padStart(2, "0")}:${minute}`
  })
)
console.log("DB dolu saatler:", data)
console.log("State dolu saatler:", doluSaatler)

      }
    }

    doluSaatleriGetir()
  }, [tarih, salon])

  async function randevuKaydet() {
    if (!seciliHizmet || !tarih || !seciliSaat || !musteriAd || !musteriTel) {
      alert("Tüm alanları doldurun")
      return
    }

    await supabase.from("randevular").insert({
      salon_id: salon.id,
      musteri_ad: musteriAd,
      musteri_tel: musteriTel,
      hizmet: seciliHizmet.ad,
      sure: seciliHizmet.sure,
      tarih,
      saat: seciliSaat,
      durum: "Bekliyor",
    })

    alert("Randevunuz oluşturuldu")
    setSeciliSaat("")
    setMusteriAd("")
    setMusteriTel("")
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Yükleniyor...
      </main>
    )
  }

  if (!salon) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Salon bulunamadı
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">

      {/* HERO */}
      <div className="text-center pt-16 pb-10 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          {salon.ad}
        </h1>
        <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4 rounded-full" />
        <p className="text-gray-400 mt-4 text-sm md:text-base">
          Online randevunuzu saniyeler içinde oluşturun
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-xl mx-auto px-4 pb-20">

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">

          <input
            placeholder="Ad Soyad"
            value={musteriAd}
            onChange={(e) => setMusteriAd(e.target.value)}
            className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:border-yellow-500 transition"
          />

          <input
            placeholder="Telefon"
            value={musteriTel}
            onChange={(e) => setMusteriTel(e.target.value)}
            className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:border-yellow-500 transition"
          />

          <select
            onChange={(e) => {
              const h = hizmetler.find((x) => x.ad === e.target.value)
              setSeciliHizmet(h)
            }}
            className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:border-yellow-500"
          >
            <option>Hizmet Seçiniz</option>
            {hizmetler.map((h, i) => (
              <option key={i}>{h.ad}</option>
            ))}
          </select>

          {/* 1 HAFTALIK TARİH SEÇİMİ */}
          <div className="grid grid-cols-3 gap-3">
         {uygunGunler.map((g, i) => (
  <button
    key={i}
    onClick={() => setTarih(g.value)}
    className={`py-3 rounded-xl text-sm font-medium transition ${
      tarih === g.value
        ? "bg-yellow-500 text-black"
        : "bg-white/10 hover:bg-white/20"
    }`}
  >
    {g.label}
  </button>
))}

          </div>

          {/* SAATLER */}
          {tarih && (
            <div className="grid grid-cols-4 gap-3">
              {saatleriUret().map((s, i) => (
                <button
                  key={i}
                  disabled={
  doluSaatler.includes(s) ||
  (tarih === formatLocalDate(new Date())
 &&
   s < new Date().toTimeString().slice(0,5))
}

                  onClick={() => setSeciliSaat(s)}
                  className={`py-3 rounded-xl text-sm font-medium transition ${
                    doluSaatler.includes(s)
                      ? "bg-red-600/60 cursor-not-allowed"
                      : seciliSaat === s
                      ? "bg-yellow-500 text-black"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={randevuKaydet}
            className="w-full mt-6 py-4 rounded-xl bg-yellow-500 text-black font-bold text-lg hover:scale-[1.02] active:scale-95 transition"
          >
            Randevuyu Oluştur
          </button>

        </div>
      </div>
    </main>
  )
}
