"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

function formatLocalDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export default function AdminDashboard({ user }: any) {
  const [randevular, setRandevular] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [gunlukToplam, setGunlukToplam] = useState(0)
  const [salonId, setSalonId] = useState<number | null>(null)

  useEffect(() => {
    if (user?.id) {
      getSalonId()
    }
  }, [user])

  async function getSalonId() {
    const { data } = await supabase
      .from("admin_users")
      .select("salon_id")
      .eq("id", user.id)
      .single()

    if (data?.salon_id) {
      setSalonId(data.salon_id)
      fetchRandevular(data.salon_id)
    } else {
      setLoading(false)
    }
  }

  async function fetchRandevular(id: number) {
    const { data } = await supabase
      .from("randevular")
      .select("*")
      .eq("salon_id", id)
      .order("id", { ascending: false })

    if (data) {
      setRandevular(data)

      const bugun = formatLocalDate(new Date())
      const bugunSayisi = data.filter(r => r.tarih === bugun).length
      setGunlukToplam(bugunSayisi)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        Yükleniyor...
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-10">Admin Panel</h2>

        <nav className="space-y-4 text-sm">
          <div className="text-yellow-500 font-semibold">Randevular</div>
          <div className="text-gray-400 hover:text-white cursor-pointer">Bildirimler</div>
          <div className="text-gray-400 hover:text-white cursor-pointer">İstatistik</div>
          <div className="text-gray-400 hover:text-white cursor-pointer">Ayarlar</div>
        </nav>
      </aside>

      {/* CONTENT */}
      <div className="flex-1 p-8">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Randevular</h1>
            <p className="text-gray-400 text-sm">
              Bugün {gunlukToplam} müşteri
            </p>
          </div>

          <button
            onClick={async () => {
              await supabase.auth.signOut()
              window.location.reload()
            }}
            className="bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 transition"
          >
            Çıkış
          </button>
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">

          {/* HEADER */}
          <div className="grid grid-cols-5 px-6 py-4 border-b border-zinc-800 text-sm text-gray-400 font-semibold">
            <div>Müşteri</div>
            <div>Hizmet</div>
            <div>Tarih</div>
            <div>Durum</div>
            <div className="text-right">İşlem</div>
          </div>

          {/* ROWS */}
          {randevular.length === 0 && (
            <div className="p-6 text-gray-400">
              Henüz randevu yok.
            </div>
          )}

          {randevular.map((r) => (
            <div
              key={r.id}
              className="grid grid-cols-5 px-6 py-5 border-b border-zinc-800 items-center hover:bg-zinc-800/40 transition"
            >
              <div>
                <p className="font-semibold">{r.musteri_ad}</p>
                <p className="text-xs text-gray-400">{r.musteri_tel}</p>
              </div>

              <div className="text-sm">{r.hizmet}</div>

              <div className="text-sm">
                {r.tarih}
                <div className="text-xs text-gray-400">{r.saat}</div>
              </div>

              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  r.durum === "Bekliyor"
                    ? "bg-yellow-500 text-black"
                    : r.durum === "Onaylandı"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}>
                  {r.durum}
                </span>
              </div>

              <div className="text-right">
                <select
                  value={r.durum}
                  onChange={async (e) => {
                    const { error } = await supabase
                      .from("randevular")
                      .update({ durum: e.target.value })
                      .eq("id", r.id)

                    if (!error && salonId) {
                      fetchRandevular(salonId)
                    }
                  }}
                  className="bg-zinc-800 px-3 py-1 rounded-lg text-sm"
                >
                  <option>Bekliyor</option>
                  <option>Onaylandı</option>
                  <option>İptal</option>
                </select>
              </div>
            </div>
          ))}

        </div>

      </div>

    </main>
  )
}

