import { Ability, AbilityType } from "./Ability";

export type UltimateType = {
  name: string;
  description?: string;
  type: "attack" | "defence" | "effect";
  value: number;
  manaCost: number;
  duration?: number;
};

export type HeroConfig = {
  id: number;
  name: string;
  heroClass: string;
  playstyle: string;
  description: string;
  heroImage: string;
  abilities: AbilityType[];
  ultimate: UltimateType;
  healthPoints: number;
  mana: number;
  manaRegeneration: number;
};

export class Hero {
  public hp: number;
  public maxHp: number;
  public mana: number;
  public maxMana: number;
  public manaRegen: number;
  public abilities: Ability[];
  public ultimate: UltimateType;
  public blockMultiplier = 0; // fraction [0..0.9]
  public stunned = 0; // number of turns stunned
  public poisoned = 0; // number of turns poisoned
  public attackBuff = 0; // additive multiplier e.g. 0.25 for +25%
  public immortalTurns = 0; // for ultimate shields

  constructor(public cfg: HeroConfig) {
    this.maxHp = cfg.healthPoints;
    this.hp = cfg.healthPoints;
    this.maxMana = cfg.mana;
    this.mana = cfg.mana;
    this.manaRegen = cfg.manaRegeneration;
    this.abilities = cfg.abilities.map((a) => new Ability(a));
    this.ultimate = cfg.ultimate;
  }

  regen() {
    this.mana = Math.min(this.maxMana, this.mana + this.manaRegen);
  }

  takeDamage(amount: number) {
    if (this.immortalTurns > 0) {
      return 0;
    }
    // reduce by block
    const reduced = amount * (1 - this.blockMultiplier);
    const final = Math.max(0, Math.round(reduced * (1 + this.attackBuff * -1))); // negative buff reduces? keep simple
    this.hp = Math.max(0, Math.round(this.hp - final));
    return final;
  }

  applyBlock(multiplier: number, _duration = 1) {
    this.blockMultiplier = Math.min(0.9, multiplier);
    // immortal handled separately by immortalTurns if value ~1
  }

  healPercent(pct: number) {
    const heal = Math.round(this.maxHp * pct);
    this.hp = Math.min(this.maxHp, this.hp + heal);
    return heal;
  }

  isAlive() {
    return this.hp > 0;
  }
}
