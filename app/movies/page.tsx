import Menu from "../Menu";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/config";

type Movie = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

// Función que simula un fetch a una API
async function getMoviesSimulated(): Promise<Movie[]> {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 100));

  return [
    { id: "joker", name: "Joker", avatar: "https://example.com/joker.jpg", createdAt: "2024-01-01" },
    { id: "inception", name: "Inception", avatar: "https://example.com/inception.jpg", createdAt: "2024-01-02" },
    { id: "interstellar", name: "Interstellar", avatar: "https://example.com/interstellar.jpg", createdAt: "2024-01-03" },
  ];
}

// Función que hace fetch real de las películas
async function getMovies(): Promise<Movie[]> {
  const res = await fetch(API_BASE_URL);

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  return res.json();
}

export default async function Movies() {
  // Obtener datos de forma asíncrona (simulado)
  // const movies = await getMoviesSimulated();
  // Obtener datos de forma asíncrona (real)
  const movies = await getMovies();

  return (
    <div>
      <Menu />
      <h1 style={{ color: "blue", textAlign: "center" }}>Movies Page</h1>
      <ul>
        {movies.map((movie: Movie) => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`} style={{ margin: "0 10px" }}>
              {movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}