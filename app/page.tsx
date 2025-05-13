'use client'

import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    jk: '',
    alamat: '',
    usia: '',
    tinggi: '',
    berat: '',
    bcg: '',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
    q11: '',
    q12: '',
    q13: '',
    q14: '',
    q15: '',
    q16: '',
    q17: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('https://sheetdb.io/api/v1/pm1uhyiw5uklc', {
        data: [formData],
      })
      alert('Data berhasil dikirim!')
      setFormData({
        nama: '', nik: '', jk: '', alamat: '', usia: '', tinggi: '', berat: '', bcg: '',
        q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '',
        q9: '', q10: '', q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: ''
      })
    } catch (error) {
      console.error(error)
      alert('Gagal mengirim data.')
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Form Kesehatan Anak</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ['Nama', 'nama'],
            ['NIK', 'nik'],
            ['Jenis Kelamin', 'jk'],
            ['Alamat', 'alamat'],
            ['Usia', 'usia'],
            ['Tinggi (cm)', 'tinggi'],
            ['Berat (kg)', 'berat'],
            ['Imunisasi BCG', 'bcg'],
          ].map(([label, name]) => (
            <div key={name}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type="text"
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
          ))}

          <hr className="my-4" />

          <h2 className="text-xl font-semibold text-gray-700">Pertanyaan Kesehatan (Ya/Tidak)</h2>
          {Array.from({ length: 17 }).map((_, i) => {
            const name = `q${i + 1}`
            return (
              <div key={name}>
                <label className="block font-medium mb-1">Pertanyaan {i + 1}</label>
                <select
                  name={name}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  required
                >
                  <option value="">Pilih...</option>
                  <option value="Ya">Ya</option>
                  <option value="Tidak">Tidak</option>
                </select>
              </div>
            )
          })}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  )
}
