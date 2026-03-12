import Menu from "@/app/Menu";
import { API_BASE_URL } from "@/lib/config";
import GoHomeButton from "./GoHomeButton";

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

// Genera los parámetros estáticos en build time
export async function generateStaticParams() {
  const movies = await getMovies();
  return movies.map((movie) => ({
    id: movie.id,
  }));
}

export default async function Movies({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <Menu />
      <h1 style={{ color: "blue", textAlign: "center" }}>Movies Dynamic Page</h1>
      <p style={{ textAlign: "center", fontSize: "24px", marginTop: "20px" }}>
        Movie ID: <strong>{id}</strong>
      </p>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <GoHomeButton />
      </div>
    </div>
  );
}