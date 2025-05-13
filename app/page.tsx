'use client'

import { useState } from 'react'
import axios from 'axios'

export default function Page() {
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    jk: '',
    alamat: '',
    usia: '',
    tinggi: '',
    berat: '',
    bcg: '',
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '',
    q10: '', q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      data: [formData]
    }

    try {
      const res = await axios.post('https://sheetdb.io/api/v1/pm1uhyiw5uklc', payload)
      console.log('✅ Berhasil kirim!', res.data)
      alert('Data berhasil dikirim ke Google Sheets ✅')
    } catch (err) {
      console.error('❌ Gagal kirim:', err)
      alert('Gagal mengirim data.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nama" placeholder="Nama" onChange={handleChange} required />
      <input name="nik" placeholder="NIK" onChange={handleChange} required />
      <select name="jk" onChange={handleChange} required>
        <option value="">Jenis Kelamin</option>
        <option value="Laki-laki">Laki-laki</option>
        <option value="Perempuan">Perempuan</option>
      </select>
      <input name="alamat" placeholder="Alamat" onChange={handleChange} required />
      <input name="usia" type="number" placeholder="Usia" onChange={handleChange} required />
      <input name="tinggi" type="number" placeholder="Tinggi (cm)" onChange={handleChange} required />
      <input name="berat" type="number" placeholder="Berat (kg)" onChange={handleChange} required />
      <select name="bcg" onChange={handleChange} required>
        <option value="">Sudah BCG?</option>
        <option value="Ya">Ya</option>
        <option value="Tidak">Tidak</option>
      </select>

      {[...Array(17)].map((_, i) => (
        <select key={i} name={`q${i+1}`} onChange={handleChange} required>
          <option value="">Q{i+1}</option>
          <option value="Ya">Ya</option>
          <option value="Tidak">Tidak</option>
        </select>
      ))}

      <button type="submit">Kirim</button>
    </form>
  )
}
