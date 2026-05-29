import { useState } from "react"
import axios from "axios"

export default function App() {

  const API_KEY = "AIzaSyA5994zyW1mUhQTtIUGXvFGkq-NxCHfnPU"

  const [appType, setAppType] = useState("Aplikasi Kasir")
  const [features, setFeatures] = useState("")
  const [result, setResult] = useState("Hasil prompt akan muncul di sini...")

  async function generatePrompt() {

    setResult("Generating AI response...")

    try {

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `
Create a complete professional app development prompt with:

- UI/UX modern
- Responsive mobile design
- Color palette
- Features explanation
- Database structure
- Authentication system
- Dashboard layout
- Technology recommendation
- Step by step development

App Type:
${appType}

Features:
${features}
                  `
                }
              ]
            }
          ]
        }
      )

      const aiText =
        response.data.candidates[0].content.parts[0].text

      setResult(aiText)

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

    <div style={{
      background: "#0f172a",
      minHeight: "100vh",
      padding: "20px",
      color: "white",
      fontFamily: "sans-serif"
    }}>

      <h1 style={{
        fontSize: "32px",
        fontWeight: "bold",
        marginBottom: "20px"
      }}>
        ProjectPromt AI
      </h1>

      <input
        value={appType}
        onChange={(e) => setAppType(e.target.value)}
        placeholder="Jenis aplikasi"
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          border: "none",
          marginBottom: "15px"
        }}
      />

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
        {result === "Generating AI response..."
          ? "Tunggu..."
          : "Generate Prompt"}
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
