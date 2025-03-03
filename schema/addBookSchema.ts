import { z } from "zod";

const genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Horror",
  "Biography",
  "History",
  "Self-Help",
  "Business",
  "Other",
] as const;

export const bookSchema = z.object({
  title: z.string().min(1, "Book title is required").max(255, "Title is too long"),
  author: z.string().min(1, "Author name is required").max(255, "Author name is too long"),
  genre: z.enum(genres, { errorMap: () => ({ message: "Invalid genre selected" }) }),
  rating: z.number().min(1, "Rating must be at least 1").max(10, "Rating must be at most 10"),
  userId: z.string().uuid("Invalid user ID"),
});

export type BookSchema = z.infer<typeof bookSchema>;
