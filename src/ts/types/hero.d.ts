export type HeroType = {
  id: number;
  name: string;
  heroClass: string;
  playstyle: string;
  description: string;
  heroImage: string;
  abilities: {
    id: number;
    name: string;
    description: string;
    type: string;
    value: number;
    manaCost: number;
  }[];
  ultimate: {
    name: string;
    description: string;
    type: string;
    value: number;
    manaCost: number;
  };
  healthPoints: number;
  mana: number;
  manaRegeneration: number;
};
