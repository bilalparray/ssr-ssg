```markdown
# Angular SSR + SSG

This project uses **Angular Universal** for **Server-Side Rendering (SSR)** and **Static Site Generation (SSG)**. It serves **prerendered static pages** whenever available and falls back to **server-side rendering** for dynamic routes.

---

## 🚀 Features

- **SSG (Static Site Generation):** Prebuilds specific pages as static HTML files.
- **SSR (Server-Side Rendering):** Dynamically generates pages on request for dynamic routes.
- **Hybrid Mode:** Uses prerendered pages first and SSR as a fallback.
- **Optimized for SEO & Performance.**

---

## 📂 Project Structure
```

/dist/ssr-ssg/
├── browser/ # Contains prerendered static files (SSG output)
├── server/ # Contains compiled server files (SSR engine)

````
- **Prerendered pages (SSG) are stored in `/browser/`.**
- **SSR fallback is handled by `/server/`.**

---

## ⚙️ How It Works
1. When a user requests a page:
   - If a **prerendered HTML file exists**, it is served directly from `/browser/` (**SSG**).
   - If no static file exists, the request is processed by Angular SSR (**SSR fallback**).

2. **Predefined prerendered routes:**
   Configured in **`serverRoutes.ts`**:
   ```typescript
   import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

   export const serverRoutes: ServerRoute[] = [
     { path: 'home', renderMode: RenderMode.Prerender },
     { path: 'about', renderMode: RenderMode.Prerender },
     { path: 'contact', renderMode: RenderMode.Prerender },
     { path: 'profile', renderMode: RenderMode.Server }, // SSR (dynamic content)
     {
       path: 'post/:id',
       renderMode: RenderMode.Prerender,
       fallback: PrerenderFallback.Client,
       async getPrerenderParams() {
         const ids = ['1', '2', '3'];
         return ids.map((id) => ({ id }));
       },
     },
     { path: '**', renderMode: RenderMode.Server },
   ];
````

The prerendered routes are:

- `/home`
- `/about`
- `/contact`
- `/post/1`
- `/post/2`
- `/post/3`

All other routes (like `/profile` and unmatched routes) use SSR.

---

## 🛠 Installation

```sh
npm install
```

---

## 🔨 Building the Project

1. **Build for SSR + SSG**
   ```sh
   npm run build
   ```

---

## 🚀 Running the Server

Start the SSR server:

```sh
npm run server
```

- The server runs on **`http://localhost:4000/`**.
- It **serves static pages first** and falls back to SSR if needed.

---

## ✅ How to Verify Prerendered Pages

### 1. Check View Source

- Open **`http://localhost:4000/home`** in your browser.
- Right-click → **View Page Source**.
- If you see full HTML (not just `<app-root></app-root>`), it's prerendered.

### 2. Check Network Requests

- Open **DevTools** (`F12` → **Network** tab).
- Reload the page.
- If it's served from a **static file**, it's SSG.

### 3. Use Curl

```sh
curl -i http://localhost:4000/home
```

- If you get a full HTML response, it's prerendered.

---

## 🎯 Troubleshooting

| Issue                           | Solution                                                   |
| ------------------------------- | ---------------------------------------------------------- |
| **Prerendered pages not found** | Run `npm run build` again.                                 |
| **SSR fallback not working**    | Check `server.ts` and ensure `dist/ssr-ssg/server` exists. |
| **SSG not working**             | Verify `serverRoutes.ts` for `RenderMode.Prerender`.       |

---

## 📌 Conclusion

This setup optimizes Angular for **better performance and SEO** using **SSG and SSR**. It serves **prerendered static pages first** and dynamically generates other pages when needed.

- **SSG = Faster load times & SEO-friendly pages.**
- **SSR = Dynamic content & personalized pages.**

---

🚀 **Now your Angular app is hybrid-powered!** 🚀
