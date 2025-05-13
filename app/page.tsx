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
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '',
    q9: '', q10: '', q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = [
      form.nama, form.nik, form.jk, form.alamat, form.usia, form.tinggi, form.berat, form.bcg,
      form.q1, form.q2, form.q3, form.q4, form.q5, form.q6, form.q7, form.q8,
      form.q9, form.q10, form.q11, form.q12, form.q13, form.q14, form.q15, form.q16, form.q17
    ]

    await axios.post('https://sheetdb.io/api/v1/pm1uhyiw5uklc', {
      data: [data]
    })

    alert('Data berhasil dikirim!')
    setForm({
      nama: '', nik: '', jk: '', alamat: '', usia: '', tinggi: '', berat: '', bcg: '',
      q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '',
      q9: '', q10: '', q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: ''
    })
  }

  return (
    <main className="p-6 max-w-3xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6 text-center">Form Kesehatan Anak</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {/* Informasi Anak */}
        <div className="flex flex-col col-span-2 sm:col-span-1">
          <label>Nama</label>
          <input type="text" name="nama" value={form.nama} onChange={handleChange} className="border px-3 py-1 rounded" required />
        </div>
        <div className="flex flex-col">
          <label>NIK</label>
          <input type="text" name="nik" value={form.nik} onChange={handleChange} className="border px-3 py-1 rounded" required />
        </div>
        <div className="flex flex-col">
          <label>Jenis Kelamin</label>
          <select name="jk" value={form.jk} onChange={handleChange} className="border px-3 py-1 rounded" required>
            <option value="">Pilih</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <div className="flex flex-col col-span-2">
          <label>Alamat</label>
          <input type="text" name="alamat" value={form.alamat} onChange={handleChange} className="border px-3 py-1 rounded" required />
        </div>
        <div className="flex flex-col">
          <label>Usia (Bulan)</label>
          <input type="number" name="usia" value={form.usia} onChange={handleChange} className="border px-3 py-1 rounded" required />
        </div>
        <div className="flex flex-col">
          <label>Tinggi</label>
          <input type="number" name="tinggi" value={form.tinggi} onChange={handleChange} className="border px-3 py-1 rounded" required />
        </div>
        <div className="flex flex-col">
          <label>Berat</label>
          <input type="number" name="berat" value={form.berat} onChange={handleChange} className="border px-3 py-1 rounded" required />
        </div>
        <div className="flex flex-col">
          <label>BCG</label>
          <select name="bcg" value={form.bcg} onChange={handleChange} className="border px-3 py-1 rounded" required>
            <option value="">Pilih</option>
            <option value="Ya">Ya</option>
            <option value="Tidak">Tidak</option>
          </select>
        </div>

        {/* Pertanyaan Ya/Tidak */}
        {[...Array(17)].map((_, i) => {
          const q = `q${i + 1}` as keyof typeof form
          return (
            <div key={q} className="flex flex-col">
              <label>Pertanyaan {i + 1}</label>
              <select name={q} value={form[q]} onChange={handleChange} className="border px-3 py-1 rounded" required>
                <option value="">Pilih</option>
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </select>
            </div>
          )
        })}

        <div className="col-span-2">
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Kirim
          </button>
        </div>
      </form>
    </main>
  )
}
