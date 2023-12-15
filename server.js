import express from 'express'
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}.`)
})
