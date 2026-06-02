import { useState } from "react"
import axios from "axios"

export default function App() {

const [apiKey, setApiKey] = useState(
localStorage.getItem("groq_api_key") || ""
)

const [appType, setAppType] = useState("")
const [technology, setTechnology] = useState("")
const [features, setFeatures] = useState("")
const [detailLevel, setDetailLevel] = useState("Standar")
const [projectName, setProjectName] = useState("")
const [result, setResult] = useState("Hasil prompt akan muncul di sini...")

function saveApiKey() {
localStorage.setItem("groq_api_key", apiKey)
alert("API Key berhasil disimpan")
}

async function generatePrompt() {

  if (!apiKey) {
    alert("Masukkan API Key Groq terlebih dahulu")
    return
  }

  setResult("Generating AI response...")

  try {

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
Anda adalah Senior Software Architect dan UI/UX Designer.

Buat spesifikasi aplikasi profesional.

Nama Project:
${projectName}

Jenis Aplikasi:
${appType}

Teknologi:
${technology}

Tingkat Detail:
${detailLevel}

Fitur:
${features}

Buat output dengan format berikut:

# Nama Project

# Deskripsi Project

# Target Pengguna

# UI/UX Design
- Warna utama
- Warna sekunder
- Typography
- Layout

# Struktur Database
Buat tabel lengkap.

# Struktur Folder Project

# Sistem Autentikasi

# Dashboard Admin

# Daftar Fitur Lengkap

# API Endpoint

# Roadmap Development

# Deployment

# Rekomendasi Pengembangan Selanjutnya

Tuliskan sangat detail dan profesional.
`

          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    )

    setResult(
      response.data.choices[0].message.content
    )

  } catch (error) {

    console.log(error)

    setResult(
      JSON.stringify(
        error.response?.data || error.message,
        null,
        2
      )
    )
  }
}


return (
<div
style={{
background: "#0f172a",
minHeight: "100vh",
padding: "20px",
color: "white",
fontFamily: "sans-serif"
}}
>

  <h1
    style={{
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "20px"
    }}
  >
    ProjectPromt AI
  </h1>

<input
  value={projectName}
  onChange={(e) => setProjectName(e.target.value)}
  placeholder="Nama Project"
  style={{
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    marginBottom: "15px"
  }}
/>

  <input
    type="password"
    placeholder="Masukkan API Key Groq"
    value={apiKey}
    onChange={(e) => setApiKey(e.target.value)}
    style={{
      width: "100%",
      padding: "15px",
      borderRadius: "10px",
      border: "none",
      marginBottom: "10px"
    }}
  />

  <button
    onClick={saveApiKey}
    style={{
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      marginBottom: "20px",
      background: "#16a34a",
      color: "white",
      fontWeight: "bold"
    }}
  >
    Simpan API Key
  </button>

  <select
    value={appType}
    onChange={(e) => setAppType(e.target.value)}
    style={{
      width: "100%",
      padding: "15px",
      borderRadius: "10px",
      border: "none",
      marginBottom: "15px"
    }}
  >
    <option value="">Pilih Jenis Aplikasi</option>
    <option value="Website Company Profile">Website Company Profile</option>
    <option value="E-Commerce">E-Commerce</option>
    <option value="Aplikasi Kasir">Aplikasi Kasir</option>
    <option value="Aplikasi Sekolah">Aplikasi Sekolah</option>
    <option value="Aplikasi Rumah Sakit">Aplikasi Rumah Sakit</option>
    <option value="Aplikasi Chat">Aplikasi Chat</option>
    <option value="Aplikasi AI">Aplikasi AI</option>
    <option value="Game Mobile">Game Mobile</option>
  </select>

  <select
  value={technology}
  onChange={(e) => setTechnology(e.target.value)}
  style={{
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    marginBottom: "15px"
  }}
>
  <option value="">Pilih Teknologi</option>
  <option value="React + Firebase">React + Firebase</option>
  <option value="React + Node.js">React + Node.js</option>
  <option value="React + Laravel">React + Laravel</option>
  <option value="Next.js">Next.js</option>
  <option value="Flutter">Flutter</option>
  <option value="React Native">React Native</option>
</select>

<select
  value={detailLevel}
  onChange={(e) => setDetailLevel(e.target.value)}
  style={{
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    marginBottom: "15px"
  }}
>
  <option value="Standar">Standar</option>
  <option value="Detail">Detail</option>
  <option value="Sangat Detail">Sangat Detail</option>
</select>

<select
  value={featureTemplate}
  onChange={(e) => {
    const value = e.target.value
    setFeatureTemplate(value)

    if (value === "Kasir") {
      setFeatures(
`Login
Manajemen Produk
Manajemen Stok
Transaksi Penjualan
Laporan Harian
Laporan Bulanan`
      )
    }

    if (value === "Ecommerce") {
      setFeatures(
`Login
Katalog Produk
Keranjang Belanja
Checkout
Pembayaran
Tracking Pesanan`
      )
    }

    if (value === "Chat") {
      setFeatures(
`Login
Realtime Chat
Kirim Gambar
Grup Chat
Notifikasi
Status Online`
      )
    }
  }}
  style={{
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    marginBottom: "15px"
  }}
>
  <option value="">Template Fitur</option>
  <option value="Kasir">Kasir</option>
  <option value="Ecommerce">E-Commerce</option>
  <option value="Chat">Chat App</option>
</select>

  <textarea
    value={features}
    onChange={(e) => setFeatures(e.target.value)}
    placeholder="Masukkan fitur aplikasi..."
    rows="8"
    style={{
      width: "100%",
      padding: "15px",
      borderRadius: "10px",
      border: "none",
      marginBottom: "15px"
    }}
  />

  <button
    onClick={generatePrompt}
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "15px",
      borderRadius: "10px",
      width: "100%",
      fontSize: "18px",
      fontWeight: "bold"
    }}
  >
    Generate Prompt
  </button>
<button
  onClick={clearForm}
  style={{
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "15px",
    borderRadius: "10px",
    width: "100%",
    marginTop: "10px"
  }}
>
  Reset Form
</button>

  <div
    style={{
      marginTop: "20px",
      background: "#1e293b",
      padding: "15px",
      borderRadius: "10px",
      whiteSpace: "pre-wrap"
    }}
  >
    {result}

    <button
      onClick={() => navigator.clipboard.writeText(result)}
      style={{
        marginTop: "15px",
        background: "#16a34a",
        color: "white",
        border: "none",
        padding: "12px",
        borderRadius: "10px",
        width: "100%",
        fontWeight: "bold"
      }}
    >
      Salin Prompt
    </button>

  </div>

</div>

)
}
