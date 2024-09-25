import { clsx, type ClassValue } from "clsx";
import { Post } from "db";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hrefFromPost(post: Post) {
  const date = new Date(post.post_date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return `/${year}/${String(month).padStart(2, "0")}/${post.post_name}`;
}
