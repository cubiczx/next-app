export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Normaliza caracteres especiales
    .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
    .replace(/[^a-z0-9]+/g, "-") // Reemplaza caracteres no alfanuméricos con guiones
    .replace(/^-+|-+$/g, ""); // Elimina guiones al inicio y final
}
