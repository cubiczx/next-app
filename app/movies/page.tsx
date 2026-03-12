import Menu from "../Menu";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/config";
import { slugify } from "@/lib/utils";
import Image from "next/image";
import "./movies.scss";

type Movie = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

// Función que hace fetch real de las películas
async function getMovies(): Promise<Movie[]> {
  const res = await fetch(API_BASE_URL);

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  return res.json();
}

export default async function Movies() {
  const movies = await getMovies();

  return (
    <div className="movies-page">
      <Menu />
      <div className="container">
        <div className="header">
          <h1>Discover Movies</h1>
          <p>Explore our collection of amazing films</p>
        </div>
        <div className="movies-grid">
          {movies.map((movie: Movie) => (
            <Link key={movie.id} href={`/movies/${slugify(movie.name)}`} className="movie-card">
              <div className="movie-poster">
                <Image
                  src={movie.avatar}
                  alt={movie.name}
                  width={300}
                  height={450}
                  className="poster-image"
                />
                <div className="overlay">
                  <span className="view-details">View Details</span>
                </div>
              </div>
              <div className="movie-info">
                <h3>{movie.name}</h3>
                <p className="release-date">
                  {new Date(movie.createdAt).getFullYear()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}