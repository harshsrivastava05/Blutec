import { pups } from "./pups";
import galleries from "./galleries.json";
export type GalleryItem = { kind: string; src: string; poster?: string };
const galleryMap: Record<string, GalleryItem[]> = galleries;
export type Puppy = {
  slug: string;
  name: string;
  breed: string;
  sex: string;
  age: string;
  origin: "imported" | "local";
  status: "available" | "gone";
  image: string;
  gallery: GalleryItem[];
  video?: string;
};
export const available: Puppy[] = pups.map((p, i) => ({
  slug: p[4],
  name: p[0],
  breed: p[1] || p[0],
  sex: p[2],
  age: p[3],
  origin: "imported",
  status: "available",
  image:
    galleryMap[p[4]]?.find((x) => x.kind === "image")?.src ||
    `/media/pup-${i + 1}.webp`,
  gallery: galleryMap[p[4]] || [],
  video: galleryMap[p[4]]?.find((x) => x.kind === "video")?.src,
}));
const archive = [
  ["Ace", "Pomeranian", "boy", "pomeranian-ace-boy", 0],
  ["Leo", "Poodle", "boy", "poodle-leo-male", 0],
  ["Mia", "Maltipoo", "girl", "maltipoo-mia-girl", 1],
  ["Sadie", "Maltipoo", "girl", "maltipoo-sadie-girl", 0],
  ["Pomeranian", "Pomeranian", "boy", "blue-marle-pomeranian", 0],
  ["Ollie", "Pomsky", "boy", "pomsky-ollie-boy", 0],
  ["Bruno", "Maltipoo", "boy", "maltipoo-bruno-boy", 1],
  ["Buddy", "Maltese", "boy", "maltese-buddy-male", 1],
  ["Charlie", "Maltese", "boy", "maltese-charlie-male", 0],
  ["Daisy", "Pomeranian", "girl", "pomeranian-daisy-girl", 1],
  ["Bella", "Pomeranian", "girl", "pomeranian-bella-female", 0],
  ["Teddy", "Poodle", "boy", "poodle-teddy-male", 0],
  ["Molly", "Poodle", "girl", "poodle-molly-female", 1],
  ["Coco", "Pomsky", "girl", "pomski-coco-girl", 0],
  ["Rosie", "Pomsky", "girl", "pomsky-rosie-girl", 1],
  ["Leo", "Pomeranian", "boy", "pomeranian-leo-boy", 1],
  ["Molly", "Poodle", "girl", "poodle-molly-girl", 0],
  ["Rocky", "Poodle", "boy", "poodle-rocky-boy", 0],
  ["Sophie", "Maltipoo", "girl", "maltipoo-sophie-girl", 1],
  ["Lola", "Maltipoo", "girl", "maltipoo-lola-girl", 1],
  ["Rex", "Pomeranian", "boy", "pomeranian-rex-boy", 0],
  ["Finn", "Pomsky", "boy", "pomsky-finn-male", 0],
  ["Zoe", "Maltipoo", "girl", "maltipoo-zoe-girl", 0],
  ["Mimi", "Pomeranian", "girl", "pomeranian-mimi-girl", 1],
  ["Bailey", "Bichon", "boy", "bichon-bailey-boy", 1],
  ["Maltipoo", "Maltipoo", "girl", "puppy", 0],
  ["Poodle", "Poodle", "girl", "maltipo", 1],
] as const;
export const gone: Puppy[] = archive.map(
  ([name, breed, sex, slug, local], i) => ({
    name,
    breed,
    sex,
    slug,
    age: "3 months",
    origin: local ? "local" : "imported",
    status: "gone",
    image:
      galleryMap[slug]?.find((x) => x.kind === "image")?.src ||
      `/media/home-${i + 1}.webp`,
    gallery: galleryMap[slug] || [],
  }),
);
export const allPuppies = [...available, ...gone];
