import { Hero } from "../entities/Hero";

export type ActionResult = { text: string; damage?: number };

export class Engine {
  player: Hero;
  enemy: Hero;
  log: string[] = [];

  constructor(player: Hero, enemy: Hero) {
    this.player = player;
    this.enemy = enemy;
    this.log = [];
  }

  addLog(line: string) {
    this.log.push(line);
    if (this.log.length > 120) this.log.shift();
  }

  applyAbility(user: Hero, target: Hero, abilityId: number): ActionResult {
    const ability = user.abilities.find((a) => a.data.id === abilityId);
    if (!ability) return { text: "Brak umiejętności" };
    if (user.mana < ability.data.manaCost)
      return { text: `${user.cfg.name} nie ma wystarczająco many` };

    user.mana -= ability.data.manaCost;

    if (ability.data.type === "attack") {
      let base = ability.data.value;
      // apply user attack buff
      base = Math.round(base * (1 + (user.attackBuff || 0)));
      const dmg = target.takeDamage(base);
      this.addLog(
        `${user.cfg.name} użył ${ability.data.name} i zadał ${dmg} obrażeń.`
      );
      return { text: `Used ${ability.data.name}`, damage: dmg };
    }

    if (ability.data.type === "defence") {
      // defence value interpreted: if value >=1 -> full block for next attack; else fraction
      if (ability.data.value >= 1) {
        user.immortalTurns = 1;
        this.addLog(
          `${user.cfg.name} użył ${ability.data.name} i zablokował kolejny atak.`
        );
      } else {
        user.applyBlock(ability.data.value);
        this.addLog(
          `${user.cfg.name} przygotował obronę (${Math.round(
            ability.data.value * 100
          )}% redukcji).`
        );
      }
      return { text: `Defence used` };
    }

    if (ability.data.type === "effect") {
      // interpret common effects via name: poison, stun, buff
      const lname = ability.data.name.toLowerCase();
      if (
        lname.includes("poison") ||
        lname.includes("poisoned") ||
        lname.includes("poison")
      ) {
        target.poisoned = Math.max(target.poisoned, 3);
        this.addLog(`${user.cfg.name} zatruł ${target.cfg.name} na 3 tury.`);
        return { text: "Poison applied" };
      }
      if (
        lname.includes("stun") ||
        ability.data.name.toLowerCase().includes("stun")
      ) {
        target.stunned = Math.max(target.stunned, 1);
        this.addLog(`${target.cfg.name} został ogłuszony na 1 turę.`);
        return { text: "Stun applied" };
      }
      if (lname.includes("critical") || lname.includes("double")) {
        // chance -> deterministic: 50% simulated by checking parity of mana (deterministic, non-random)
        const chance = user.mana % 2 === 0;
        if (chance) {
          const dmg = target.takeDamage(ability.data.value);
          this.addLog(
            `Krytyczne trafienie! ${user.cfg.name} zadał ${dmg} obrażeń.`
          );
          return { text: "Critical hit", damage: dmg };
        } else {
          const dmg = target.takeDamage(Math.round(ability.data.value / 2));
          this.addLog(
            `${user.cfg.name} użył ${ability.data.name} i zadał ${dmg} obrażeń.`
          );
          return { text: "Partial effect", damage: dmg };
        }
      }
      // default effect: small damage + poison
      target.poisoned = Math.max(target.poisoned, 2);
      this.addLog(
        `${user.cfg.name} użył ${ability.data.name}. Efekt magiczny!`
      );
      return { text: "Effect used" };
    }

    return { text: "Brak efektu" };
  }

  basicAttack(user: Hero, target: Hero): ActionResult {
    const base = 80;
    const finalBase = Math.round(base * (1 + (user.attackBuff || 0)));
    const dmg = target.takeDamage(finalBase);
    this.addLog(`${user.cfg.name} wykonał atak i zadał ${dmg} obrażeń.`);
    return { text: "Basic attack", damage: dmg };
  }

  useUltimate(user: Hero, target: Hero): ActionResult {
    if (user.mana < user.ultimate.manaCost)
      return { text: `${user.cfg.name} nie ma many na ultimate` };
    user.mana -= user.ultimate.manaCost;

    const ult = user.ultimate;
    if (ult.type === "defence") {
      // if value ~0 means immune (Divine Protection)
      if (ult.value === 0) {
        const dur = ult.duration ?? 1;
        user.immortalTurns = dur;
        this.addLog(
          `${user.cfg.name} aktywował ${ult.name} — bez obrażeń przez ${dur} tur(y).`
        );
        return { text: "Ultimate defence" };
      } else {
        user.applyBlock(ult.value);
        this.addLog(
          `${user.cfg.name} aktywował ${ult.name} — block ${ult.value}`
        );
        return { text: "Ultimate defence block" };
      }
    }

    if (ult.type === "attack") {
      const dmg = target.takeDamage(ult.value);
      this.addLog(`${user.cfg.name} użył ${ult.name} i zadał ${dmg} obrażeń.`);
      return { text: "Ultimate attack", damage: dmg };
    }

    if (ult.type === "effect") {
      // e.g. Blood Frenzy: strong attack buff but HP drain each turn
      if (
        ult.name.toLowerCase().includes("frenzy") ||
        ult.name.toLowerCase().includes("blood")
      ) {
        user.attackBuff += 0.5;
        user.poisoned = Math.max(user.poisoned, 0); // not poison but we will drain manually
        // set a custom field by reusing immortalTurns as duration holder for effect; here use duration
        user.immortalTurns = ult.duration ?? 3; // reusing field to track remaining effect turns
        this.addLog(
          `${user.cfg.name} wszedł w ${ult.name}: zwiększenie ataku na ${
            ult.duration ?? 3
          } tur(y), ale traci HP co turę.`
        );
        return { text: "Ultimate effect applied" };
      }
      this.addLog(`${user.cfg.name} użył ${ult.name}.`);
      return { text: "Ultimate effect" };
    }

    return { text: "Ultimate used" };
  }

  endTurnEffects(hero: Hero) {
    // poison damage
    if (hero.poisoned > 0) {
      const pDmg = 30;
      hero.hp = Math.max(0, hero.hp - pDmg);
      this.addLog(`${hero.cfg.name} otrzymuje ${pDmg} obrażeń od trucizny.`);
      hero.poisoned -= 1;
    }

    // immortalTurns used for immunity OR for temporary ultimate-effect-turns (we reuse but must be careful)
    if (hero.immortalTurns > 0) {
      // if ultimate was defence, this prevents damage and we decrement
      hero.immortalTurns = Math.max(0, hero.immortalTurns - 1);
      if (hero.immortalTurns === 0 && hero.attackBuff > 0) {
        // if it was a frenzy that used immortalTurns for duration, we roll back buff
        hero.attackBuff = Math.max(0, hero.attackBuff - 0.5);
        this.addLog(
          `${hero.cfg.name} zakończył efekt ultimate (buff wygaśnięty).`
        );
      }
    }

    // reset block if it was used this turn — simple model: block wears off at end of being used (we reset small)
    if (hero.blockMultiplier > 0.0001) {
      // reduce gradually
      hero.blockMultiplier = Math.max(0, hero.blockMultiplier - 0.9);
    }

    // stun/decrements handled elsewhere (stunned > 0)
    if (hero.stunned > 0) hero.stunned = Math.max(0, hero.stunned - 1);

    // mana regen
    hero.regen();

    // HP floor check
    if (hero.hp < 0) hero.hp = 0;
  }
}
