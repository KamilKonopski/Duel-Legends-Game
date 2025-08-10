import { Hero } from "../entities/Hero";

export class SimpleAI {
  // Returns an action object: { type: 'attack'|'ability'|'ultimate', abilityId? }
  static decide(self: Hero, enemy: Hero) {
    const hpRatio = self.hp / self.maxHp;
    const enemyHpRatio = enemy.hp / enemy.maxHp;

    // 1. If can cast ultimate and it is impactful -> use it (if enemy low HP or we are high HP for attack ult)
    if (self.mana >= self.ultimate.manaCost) {
      if (self.ultimate.type === "attack" && enemyHpRatio < 0.6)
        return { type: "ultimate" };
      if (self.ultimate.type === "defence" && hpRatio < 0.5)
        return { type: "ultimate" };
      if (self.ultimate.type === "effect" && hpRatio > 0.5)
        return { type: "ultimate" };
    }

    // 2. If low HP -> try defend (defence ability available)
    if (hpRatio < 0.35) {
      const defend = self.abilities.find(
        (a) => a.data.type === "defence" && self.mana >= a.data.manaCost
      );
      if (defend) return { type: "ability", abilityId: defend.data.id };
    }

    // 3. If enemy is fragile -> attack
    if (enemyHpRatio < 0.25) {
      const attack = self.abilities.find(
        (a) => a.data.type === "attack" && self.mana >= a.data.manaCost
      );
      if (attack) return { type: "ability", abilityId: attack.data.id };
    }

    // 4. Normal flow: pick strongest affordable attack, else attack basic
    const attacks = self.abilities.filter(
      (a) => a.data.type === "attack" && self.mana >= a.data.manaCost
    );
    if (attacks.length > 0) {
      // deterministic choice: highest value attack
      attacks.sort((a, b) => b.data.value - a.data.value);
      return { type: "ability", abilityId: attacks[0].data.id };
    }

    // 5. If can't afford attack, check small defence or effect
    const any = self.abilities.find((a) => self.mana >= a.data.manaCost);
    if (any) return { type: "ability", abilityId: any.data.id };

    // fallback: basic attack
    return { type: "attack" };
  }
}
