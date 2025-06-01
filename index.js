// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path"
import { fileURLToPath } from "url"
const app = express();
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'dist')))

const API_KEY = "30a414caedad704436c3f5d8ebc9ea6c";

app.get("/taxi-check", async (req, res) => {
  const { regNumber } = req.query;
  if (!regNumber) return res.status(400).json({ error: "No regNumber" });

  const url = `https://service.api-assist.com/parser/taxi_api/?regNumber=${encodeURIComponent(
    regNumber
  )}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
console.log(data)
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Ошибка при запросе к API" });
  }
});

app.get('/{*any}', (req,res)=>{
res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})
app.listen(3001, () => console.log("Прокси запущен на http://localhost:3001"));
