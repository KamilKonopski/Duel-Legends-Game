export type AbilityType = {
  id: number;
  name: string;
  description?: string;
  type: "attack" | "defence" | "effect";
  value: number;
  manaCost: number;
};

export class Ability {
  constructor(public data: AbilityType) {}
}
