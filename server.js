// Simple static server for Hostinger "Entry file" deployments.
// Serves Nuxt static output in ./dist with SPA fallback to 200.html.

const http = require('http')
const fs = require('fs')
const path = require('path')

const DIST_DIR = path.join(__dirname, 'dist')
const PORT = Number(process.env.PORT || 3000)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json; charset=utf-8'
}

function safePath(urlPath) {
  const clean = (urlPath || '/').split('?')[0].split('#')[0]
  const decoded = decodeURIComponent(clean)
  const joined = path.join(DIST_DIR, decoded)
  if (!joined.startsWith(DIST_DIR)) {
    return null
  }
  return joined
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, buf) => {
    if (err) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end('Not found')
      return
    }
    const ext = path.extname(filePath).toLowerCase()
    res.statusCode = 200
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream')
    res.setHeader('Cache-Control', ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable')
    res.end(buf)
  })
}

const server = http.createServer((req, res) => {
  const p = safePath(req.url)
  if (!p) {
    res.statusCode = 400
    res.end('Bad request')
    return
  }

  // Directory => index.html
  let filePath = p
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html')
    }
  } catch (e) {
    // ignore
  }

  // If file exists, serve it; otherwise SPA fallback to 200.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    sendFile(res, filePath)
    return
  }

  const fallback = path.join(DIST_DIR, '200.html')
  if (fs.existsSync(fallback)) {
    sendFile(res, fallback)
    return
  }

  // Last resort
  sendFile(res, path.join(DIST_DIR, 'index.html'))
})

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Serving ${DIST_DIR} on port ${PORT}`)
})

