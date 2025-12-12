# Remota Sonora — Landing (Vite + React + Tailwind)

## Requisitos
- Node.js 18 o superior
- npm

## Comandos
```bash
npm install
npm run dev    # abre en http://localhost:5173
npm run build  # genera dist/ para producción
```

## Deploy en Vercel
1. Sube este folder a un repo en GitHub.
2. En Vercel: Add New → Project → Import from GitHub → selecciona el repo.
3. Build Command: `npm run build` (default de Vite)
4. Output: `dist` (default de Vite)
5. Luego en Settings → Domains, agrega `remotasonora.com`.

## DNS (Porkbun)
- A @ → 76.76.21.21
- CNAME www → cname.vercel-dns.com

