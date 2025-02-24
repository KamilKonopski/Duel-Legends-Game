import { AbilitiesType, UltimateType } from "./abilities";

export type HeroType = {
  id: number;
  name: string;
  heroClass: string;
  playstyle: string;
  description: string;
  heroImage: string;
  abilities: AbilitiesType;
  ultimate: UltimateType;
  healthPoints: number;
  mana: number;
  manaRegeneration: number;
};
