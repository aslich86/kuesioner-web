"use server"

import { z } from "zod"

const formSchema = z.object({
  nama: z.string().min(2, { message: "Nama harus diisi minimal 2 karakter" }),
  nik: z
    .string()
    .length(16, { message: "NIK harus terdiri dari 16 digit" })
    .regex(/^\d+$/, { message: "NIK hanya boleh berisi angka" }),
  pertanyaan1: z.enum(["ya", "tidak"]),
  pertanyaan2: z.enum(["ya", "tidak"]),
  pertanyaan3: z.enum(["ya", "tidak"]),
  pertanyaan4: z.enum(["ya", "tidak"]),
  pertanyaan5: z.enum(["ya", "tidak"]),
  pertanyaan6: z.enum(["ya", "tidak"]),
  pertanyaan7: z.enum(["ya", "tidak"]),
  pertanyaan8: z.enum(["ya", "tidak"]),
})

export type FormData = z.infer<typeof formSchema>

export async function submitKuesioner(data: FormData) {
  // Validasi data
  const validatedData = formSchema.parse(data)

  // Di sini Anda bisa menambahkan kode untuk menyimpan data ke database
  // Contoh: await db.insert(validatedData)

  console.log("Data kuesioner diterima:", validatedData)

  return { success: true, message: "Kuesioner berhasil dikirim" }
}
