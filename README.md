# Next.js Movies App 🎬

Aplicación moderna de películas con diseño tipo streaming service, utilizando Next.js 16 App Router, rutas dinámicas con slugs, y exportación estática para deployment optimizado.

## 📋 Descripción

Esta aplicación es un catálogo de películas con diseño moderno inspirado en plataformas de streaming:

- **Página principal**: Hero section animado con gradientes y efectos visuales
- **Catálogo de películas**: Grid responsive con cards animadas y efectos hover
- **Rutas dinámicas**: URLs amigables con slugs generados automáticamente
- **Detalle de película**: Página individual con backdrop blur y metadata
- **Página de contacto**: Formulario moderno con información de contacto
- **Exportación estática**: Build optimizado para deployment en Netlify/Vercel
- **Diseño responsive**: Adaptado a móviles, tablets y escritorio
- **Tema oscuro**: Paleta de colores moderna con gradientes purple/blue

## 🛠️ Tecnologías

- Next.js 16.1.6 (App Router)
- React 19.2.3
- TypeScript 5
- Sass (SCSS Modules)
- Tailwind CSS 4
- MockAPI (API externa)
- ESLint + Next.js config

## 🚀 Cómo Ejecutar

### Prerequisitos

- Node.js (v20 o superior)
- npm o yarn

### Instalación

1. Navega al directorio del proyecto:

```bash
cd "next-app"
```

2. Instala las dependencias:

```bash
npm install
```

3. (Opcional) Configura tu propia API en `lib/config.ts`:

```ts
export const API_BASE_URL = "tu_api_url_aquí";
```

### Ejecución en Desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000).

### Build para Producción

```bash
npm run build
```

El sitio estático se generará en la carpeta `out/`.

### Preview de Producción Local

**Recomendado**: Antes de hacer deploy, verifica que el build funciona correctamente en local:

```bash
npm run build && npm start
```

Esto te permite:

- ✅ Detectar errores de build antes de hacer commit
- ✅ Verificar que todas las rutas se generan correctamente
- ✅ Probar la versión optimizada de producción
- ✅ Confirmar que las rutas dinámicas funcionan con `generateStaticParams`

## 📚 Conceptos Demostrados

### 1. **Next.js App Router**

Arquitectura moderna con enrutamiento basado en carpetas:

```tsx
app/
  page.tsx              → /
  movies/
    page.tsx            → /movies
    [id]/
      page.tsx          → /movies/:id
  contact/
    page.tsx            → /contact
```

### 2. **Server Components Async**

Componentes del servidor con fetch de datos asíncrono:

```tsx
export default async function Movies() {
  const movies = await getMovies(); // Fetch en el servidor

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <Link href={`/movies/${slugify(movie.name)}`}>
          {movie.name}
        </Link>
      ))}
    </div>
  );
}
```

### 3. **generateStaticParams para Static Export**

Pre-generación de rutas dinámicas en build time:

```tsx
export async function generateStaticParams() {
  const movies = await getMovies();
  return movies.map((movie) => ({
    id: slugify(movie.name),
  }));
}
```

### 4. **Custom Slugify Utility**

Función personalizada para URLs amigables:

```tsx
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
```

### 5. **Next.js Image Optimization**

Componente optimizado con configuración para static export:

```tsx
<Image
  src={movie.avatar}
  alt={movie.name}
  width={300}
  height={450}
  className="poster-image"
/>
```

Configuración en `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
};
```

### 6. **SCSS Modules con Diseño Moderno**

Estilos modulares con Sass y efectos avanzados:

```scss
.movie-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

    .overlay {
      opacity: 1;
    }
  }
}
```

### 7. **TypeScript Strict Mode**

Tipado completo para mayor seguridad:

```tsx
type Movie = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

async function getMovies(): Promise<Movie[]> {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}
```

## 📁 Estructura del Proyecto

```text
next-app/
├── app/
│   ├── contact/
│   │   ├── page.tsx
│   │   └── contact.scss
│   ├── movies/
│   │   ├── page.tsx
│   │   ├── movies.scss
│   │   └── [id]/
│   │       ├── page.tsx
│   │       ├── movie-detail.scss
│   │       └── GoHomeButton.tsx
│   ├── globals.css
│   ├── home.scss
│   ├── layout.tsx
│   ├── Menu.tsx
│   ├── Menu.scss
│   └── page.tsx
├── lib/
│   ├── config.ts              # API configuration
│   └── utils.ts               # Slugify utility
├── public/
│   ├── next.svg
│   └── vercel.svg
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## 🎯 Características Principales

### Diseño Moderno

- ✅ Tema oscuro con gradientes purple/blue/red
- ✅ Glassmorphism (backdrop-filter blur)
- ✅ Animaciones suaves y transiciones
- ✅ Efectos hover sofisticados
- ✅ Tipografía moderna y legible

### Rutas y Navegación

- ✅ App Router de Next.js 13+
- ✅ Rutas dinámicas con parámetros
- ✅ URLs amigables con slugs (SEO optimizado)
- ✅ Navegación programática con useRouter
- ✅ Client y Server Components combinados

### Optimización y Performance

- ✅ Static Site Generation (SSG)
- ✅ Optimización automática de imágenes
- ✅ Code splitting automático
- ✅ Lazy loading de imágenes
- ✅ Pre-renderizado de rutas dinámicas

### Responsive Design

- ✅ Mobile-first approach
- ✅ Breakpoints para tablet y desktop
- ✅ Grid adaptativo con CSS Grid
- ✅ Imágenes responsivas

## 🎨 Páginas Implementadas

### 1. Home (`/`)

- Hero section con animación
- Gradiente de fondo animado
- CTA button con efectos
- Navegación a películas

### 2. Movies (`/movies`)

- Grid de películas con cards
- Efectos hover con zoom
- Overlay con "View Details"
- Links a páginas individuales

### 3. Movie Detail (`/movies/[id]`)

- Backdrop blur con la imagen
- Poster de la película
- Metadata (año, fecha)
- Botones de navegación

### 4. Contact (`/contact`)

- Información de contacto
- Formulario funcional
- Cards con iconos SVG
- Links a email y GitHub

## 🔧 Configuración

### API Mock

El proyecto utiliza [MockAPI.io](https://mockapi.io), un servicio gratuito de API REST mock que permite generar endpoints rápidamente sin necesidad de backend. Es perfecto para prototipos y aprendizaje.

**Configuración actual**: El proyecto ya está configurado con una instancia de MockAPI funcional. Solo necesitas seguir estos pasos si quieres usar tu propia API:

Para configurar tu propia API:

1. **Crear cuenta en MockAPI**: Ve a [mockapi.io](https://mockapi.io)

2. **Crear recurso `movies`** con estos campos:
   - `id` (string)
   - `name` (string)
   - `avatar` (string - URL de imagen)
   - `createdAt` (date)

3. **Actualizar configuración** en `lib/config.ts`:

```ts
export const API_BASE_URL = "https://[tu-proyecto].mockapi.io/movies";
```

### Deployment en Netlify

1. Conecta tu repositorio de GitHub
2. Configura el build:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
3. Deploy automático en cada push a `main`

### Variables de Entorno

Si necesitas usar variables de entorno, crea `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://tu-api.mockapi.io/movies
```

## 🌐 Demo

**Aplicación en producción**: [https://next-app-cubiczx.netlify.app/](https://next-app-cubiczx.netlify.app/)

Desplegada automáticamente en Netlify con deploy continuo desde GitHub.

## 🤝 Contribuciones

Este es un proyecto educativo. Siéntete libre de hacer fork y experimentar con Next.js App Router.

## 📝 Licencia

MIT

## 👨‍💻 Autor

**Xavier Palacín Ayuso**
Email: [cubiczx@hotmail.com](mailto:cubiczx@hotmail.com)
GitHub: [@cubiczx](https://github.com/cubiczx)

Proyecto creado como parte del curso de React en Udemy, demostrando las capacidades modernas de Next.js 16 con App Router.

---

## 📖 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [TypeScript with Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
