import { HeroType } from "../types/hero";

export const fetchHeroesData = async () => {
  try {
    const response = await fetch("../../../data/heroes.json");
    if (!response.ok) {
      throw new Error("Failed to load heroes data");
    }
    const heroes: HeroType[] = await response.json();
    return heroes;
  } catch (error) {
    console.error("Error fetching hero data:", error);
    return [];
  }
};
