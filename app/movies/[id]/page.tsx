import Menu from "@/app/Menu";
import { API_BASE_URL } from "@/lib/config";
import { slugify } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import "./movie-detail.scss";

type Movie = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

// Función para obtener todas las películas
async function getMovies(): Promise<Movie[]> {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }
  return res.json();
}

// Genera metadata dinámico para cada película
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const movies = await getMovies();
  const movie = movies.find(m => slugify(m.name) === id);

  if (!movie) {
    return {
      title: "Movie Not Found",
      description: "The requested movie could not be found.",
    };
  }

  return {
    title: movie.name,
    description: `Watch ${movie.name} - Released ${new Date(movie.createdAt).getFullYear()}. Discover detailed information about this amazing film.`,
    openGraph: {
      title: `${movie.name} | Next.js Movies App`,
      description: `Watch ${movie.name} - Released ${new Date(movie.createdAt).getFullYear()}`,
      images: [
        {
          url: movie.avatar,
          width: 300,
          height: 450,
          alt: movie.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: movie.name,
      description: `Watch ${movie.name} - Released ${new Date(movie.createdAt).getFullYear()}`,
      images: [movie.avatar],
    },
  };
}

// Genera los parámetros estáticos en build time
export async function generateStaticParams() {
  const movies = await getMovies();
  return movies.map((movie) => ({
    id: slugify(movie.name),
  }));
}

export default async function Movies({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Este 'id' ahora es el slug
  const movies = await getMovies();
  const movie = movies.find(m => slugify(m.name) === id);

  if (!movie) {
    return (
      <div className="movie-detail-page">
        <Menu />
        <div className="error-container">
          <h1>Movie not found</h1>
          <p>The movie you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/movies" className="back-button">Back to Movies</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-detail-page">
      <Menu />
      <div className="movie-hero">
        <div className="movie-backdrop">
          <Image
            src={movie.avatar}
            alt={movie.name}
            fill
            className="backdrop-image"
          />
          <div className="backdrop-overlay"></div>
        </div>
        <div className="movie-content">
          <div className="movie-poster-container">
            <Image
              src={movie.avatar}
              alt={movie.name}
              width={300}
              height={450}
              className="movie-poster"
            />
          </div>
          <div className="movie-details">
            <h1 className="movie-title">{movie.name}</h1>
            <div className="movie-meta">
              <span className="release-year">{new Date(movie.createdAt).getFullYear()}</span>
              <span className="separator">•</span>
              <span className="release-date">{new Date(movie.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="movie-actions">
              <Link href="/movies" className="button button-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Movies
              </Link>
              <Link href="/" className="button button-secondary">Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}