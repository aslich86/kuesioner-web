'use client'
import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [form, setForm] = useState({
    nama: '',
    nik: '',
    jk: '',
    alamat: '',
    usia: '',
    tinggi: '',
    berat: '',
    bcg: '',
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '',
    q10: '', q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: '', q18: '',
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await axios.post('https://sheetdb.io/api/v1/pm1uhyiw5uklc', {
        data: [form]
      })
      alert('Data berhasil dikirim!')
      setForm({
        nama: '', nik: '', jk: '', alamat: '', usia: '', tinggi: '', berat: '', bcg: '',
        q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '',
        q10: '', q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: '', q18: '',
      })
    } catch (err) {
      alert('Terjadi kesalahan saat mengirim data.')
    }
  }

  const pertanyaan = [
    "Batuk lebih dari 2 minggu",
    "Demam",
    "Berkeringat malam hari tanpa aktivitas",
    "Sesak napas",
    "Nyeri dada",
    "Ada benjolan di leher / bawah rahang / bawah telinga / ketiak",
    "Batuk berdarah",
    "Nafsu makan turun (hilang nafsu makan berhari-hari)",
    "Mudah lelah (sering kecapean tanpa aktivitas berarti)",
    "Berat badan turun drastis berhari-hari",
    "Anggota serumah ada yang kena sakit TBC",
    "Pernah berada satu ruangan dengan pasien TBC (rumah/sekolah/kamar/panti)",
    "Pernah tinggal serumah minimal 1 malam atau sering tinggal serumah pada siang hari",
    "Pernah berobat TBC tuntas",
    "Pernah berobat TBC tapi tidak tuntas",
    "Orang dengan HIV",
    "Kurang gizi",
  ]

  return (
    <main className="p-4 max-w-2xl mx-auto text-sm">
      <h1 className="text-2xl font-bold mb-4 text-center">Form Skrining TBC Balita Stunting</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
  <label>Nama</label>
  <input type="text" name="nama" value={form.nama} onChange={handleChange} className="border px-2 py-1 rounded" required />
</div>
<div className="flex flex-col">
  <label>NIK</label>
  <input type="text" name="nik" value={form.nik} onChange={handleChange} className="border px-2 py-1 rounded" required />
</div>
<div className="flex flex-col">
  <label>Jenis Kelamin</label>
  <input type="text" name="jk" value={form.jk} onChange={handleChange} className="border px-2 py-1 rounded" required />
</div>
<div className="flex flex-col">
  <label>Alamat</label>
  <input type="text" name="alamat" value={form.alamat} onChange={handleChange} className="border px-2 py-1 rounded" required />
</div>
<div className="flex flex-col">
  <label>Usia (Bulan)</label>
  <input type="text" name="usia" value={form.usia} onChange={handleChange} className="border px-2 py-1 rounded" required />
</div>
<div className="flex flex-col">
  <label>Tinggi</label>
  <input type="text" name="tinggi" value={form.tinggi} onChange={handleChange} className="border px-2 py-1 rounded" required />
</div>
<div className="flex flex-col">
  <label>Berat</label>
  <input type="text" name="berat" value={form.berat} onChange={handleChange} className="border px-2 py-1 rounded" required />
</div>
<div className="flex flex-col">
  <label>BCG</label>
  <input type="text" name="bcg" value={form.bcg} onChange={handleChange} className="border px-2 py-1 rounded" required />
</div>


        <h2 className="text-lg font-semibold mt-6">Pertanyaan Gejala & Riwayat</h2>
        {pertanyaan.map((q, i) => (
          <div key={i} className="flex flex-col">
            <label>{i + 1}. {q}</label>
            <select name={`q${i + 1}`} value={(form as any)[`q${i + 1}`]} onChange={handleChange} className="border px-2 py-1 rounded" required>
              <option value="">Pilih</option>
              <option value="Ya">Ya</option>
              <option value="Tidak">Tidak</option>
            </select>
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
          Kirim
        </button>
      </form>
    </main>
  )
}
