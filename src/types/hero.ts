export type HeroType = {
  id: number;
  name: string;
  heroClass: string;
  playstyle: string;
  description: string;
  abilities: { id: number; name: string; description: string }[];
  ultimate: { name: string; description: string }[];
};
