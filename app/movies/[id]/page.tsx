import Menu from "@/app/Menu";
import { API_BASE_URL } from "@/lib/config";
import { slugify } from "@/lib/utils";
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
      <div>
        <Menu />
        <h1 style={{ color: "red", textAlign: "center" }}>Movie not found</h1>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <GoHomeButton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Menu />
      <h1 style={{ color: "blue", textAlign: "center" }}>{movie.name}</h1>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <img src={movie.avatar} alt={movie.name} style={{ width: "200px", borderRadius: "10px" }} />
      </div>
      <p style={{ textAlign: "center", fontSize: "18px", marginTop: "20px" }}>
        Created: {new Date(movie.createdAt).toLocaleDateString()}
      </p>
      <p style={{ textAlign: "center", fontSize: "14px", color: "#666" }}>
        Slug: <strong>{id}</strong>
      </p>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <GoHomeButton />
      </div>
    </div>
  );
}