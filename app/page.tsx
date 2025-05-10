'use client';
import { useState } from 'react';

const pertanyaan = [
  "Batuk lebih dari 2 minggu",
  "Demam",
  "Berkeringat malam hari tanpa aktivitas",
  "Sesak nafas",
  "Nyeri dada",
  "Ada benjolan di leher/bawah rahang/telinga/ketiak",
  "Batuk berdarah",
  "Nafsu makan turun",
  "Mudah lelah tanpa aktivitas berarti",
  "Berat badan turun drastis",
  "Anggota serumah ada yang sakit TBC",
  "Pernah berada satu ruangan dengan pasien TBC",
  "Pernah tinggal serumah minimal 1 malam dengan pasien TBC",
  "Pernah berobat TBC tuntas",
  "Pernah berobat TBC tapi tidak tuntas",
  "Orang dengan HIV",
  "Kurang gizi",
];

export default function Page() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => (data[key] = value));

    try {
      const res = await fetch("https://v1.nocodeapi.com/aslich/google_sheets/WYByJdrdoHpxNnrU?tabId=Sheet1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            [
              data.nama,
              data.nik,
              data.jk,
              data.alamat,
              data.usia,
              data.tinggi,
              data.berat,
              data.bcg,
              ...Array.from({ length: 17 }, (_, i) => data[`q${i + 1}`]),
            ],
          ],
        }),
      });

      if (res.ok) {
        setStatus("✅ Terima kasih, jawaban Anda telah kami terima.");
        form.reset();
      } else {
        setStatus("❌ Gagal mengirim data (status: " + res.status + ")");
      }
    } catch (error) {
      setStatus("❌ Gagal mengirim: " + (error as Error).message);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Form Skrining TB Balita</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Identitas Responden</h2>
          <div className="grid grid-cols-1 gap-4">
            <input name="nama" placeholder="Nama / Inisial" className="w-full border border-gray-300 rounded px-4 py-2" required />
            <input name="nik" placeholder="NIK" className="w-full border border-gray-300 rounded px-4 py-2" required />
            <div>
              <label className="block mb-1 font-medium">Jenis Kelamin:</label>
              <div className="flex gap-6">
                <label><input type="radio" name="jk" value="Laki-laki" required /> Laki-laki</label>
                <label><input type="radio" name="jk" value="Perempuan" required /> Perempuan</label>
              </div>
            </div>
            <textarea name="alamat" placeholder="Alamat (desa, kecamatan, kabupaten)" className="w-full border border-gray-300 rounded px-4 py-2" required />
            <input type="number" name="usia" placeholder="Usia (bulan)" className="w-full border border-gray-300 rounded px-4 py-2" required />
            <input type="number" name="tinggi" placeholder="Tinggi Badan (cm)" className="w-full border border-gray-300 rounded px-4 py-2" required />
            <input type="number" name="berat" placeholder="Berat Badan (kg)" className="w-full border border-gray-300 rounded px-4 py-2" required />
            <div>
              <label className="block mb-1 font-medium">Vaksin BCG:</label>
              <div className="flex gap-6">
                <label><input type="radio" name="bcg" value="Ya" required /> Ya</label>
                <label><input type="radio" name="bcg" value="Tidak" required /> Tidak</label>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">Keluhan yang Dirasakan</h2>
          <div className="space-y-4">
            {pertanyaan.map((text, i) => (
              <div key={i}>
                <label className="block mb-1">{i + 1}. {text}</label>
                <div className="flex gap-6">
                  <label><input type="radio" name={`q${i + 1}`} value="Ya" required /> Ya</label>
                  <label><input type="radio" name={`q${i + 1}`} value="Tidak" required /> Tidak</label>
                </div>
              </div>
            ))}
          </div>
        </section>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
        >
          Kirim Jawaban
        </button>

        {status && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
            {status}
          </div>
        )}
      </form>
    </main>
  );
}