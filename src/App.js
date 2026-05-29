import { useState } from "react"
import axios from "axios"

export default function App() {

  const [appType, setAppType] =
    useState("Cashier App")

  const [features, setFeatures] =
    useState("")

  const [result, setResult] =
    useState("Prompt akan muncul di sini...")

  function generatePrompt(){

    const prompt = `
Create a modern ${appType} using Google Apps Script and Google Spreadsheet database.

Features:
${features}

Generate:
- Code.gs
- Index.html
- Style.css
- Script.js

Use:
- Responsive design
- Dark mode UI
- Tailwind CSS
- Professional dashboard
`

    setResult(prompt)

  }

  function copyPrompt(){

    navigator.clipboard.writeText(result)

    alert("Prompt copied!")

  }

  return (

    <div className="min-h-screen bg-zinc-950 text-white flex">

      {/* Sidebar */}
      <aside className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 hidden md:block">

        <h1 className="text-3xl font-bold text-cyan-400 mb-8">
          ProjectPromt
        </h1>

        <div className="space-y-3">

          <button className="w-full bg-zinc-800 p-4 rounded-2xl text-left">
            Dashboard
          </button>

          <button className="w-full hover:bg-zinc-800 p-4 rounded-2xl text-left">
            Prompt Generator
          </button>

          <button className="w-full hover:bg-zinc-800 p-4 rounded-2xl text-left">
            Apps Assistant
          </button>

        </div>

      </aside>

      {/* Main */}
      <main className="flex-1 p-6">

        <div className="mb-8">

          <h2 className="text-4xl font-bold mb-3">
            Google Apps Script AI Builder
          </h2>

          <p className="text-zinc-400">
            Generate professional prompts automatically.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h3 className="text-2xl font-bold mb-6">
              Prompt Generator
            </h3>

            <div className="space-y-5">

              <div>

                <label className="block mb-2">
                  App Type
                </label>

                <select
                  value={appType}
                  onChange={(e)=>setAppType(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4"
                >

                  <option>Cashier App</option>
                  <option>Attendance App</option>
                  <option>Inventory App</option>
                  <option>School Dashboard</option>

                </select>

              </div>

              <div>

                <label className="block mb-2">
                  Features
                </label>

                <textarea
                  rows="6"
                  value={features}
                  onChange={(e)=>setFeatures(e.target.value)}
                  placeholder="Login system, dashboard analytics, export PDF..."
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4"
                ></textarea>

              </div>

              <button
                onClick={generatePrompt}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-2xl"
              >

                Generate Prompt

              </button>

            </div>

          </div>

          {/* Result */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <div className="flex justify-between items-center mb-5">

              <h3 className="text-2xl font-bold">
                AI Prompt Result
              </h3>

              <button
                onClick={copyPrompt}
                className="bg-zinc-800 px-4 py-2 rounded-xl"
              >

                Copy

              </button>

            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 min-h-[350px] text-zinc-300 whitespace-pre-wrap">

              {result}

            </div>

          </div>

        </div>

      </main>

    </div>

  )

}
