import { Engine } from "./Engine";
import { Hero } from "../entities/Hero";
import { SimpleAI } from "../ai/SimpleAI";

export class Game {
  engine: Engine;
  turn: "player" | "enemy" = "player";
  constructor(public player: Hero, public enemy: Hero) {
    this.engine = new Engine(player, enemy);
  }

  playerAction(action: any) {
    if (this.turn !== "player") return;
    if (!this.player.isAlive() || !this.enemy.isAlive()) return;
    // check stunned
    if (this.player.stunned > 0) {
      this.engine.addLog(
        `${this.player.cfg.name} jest ogłuszony i traci turę.`
      );
      this.player.stunned = Math.max(0, this.player.stunned - 1);
      this.turn = "enemy";
      // enemy moves next without waiting
      return;
    }

    let res;
    if (action.type === "ability")
      res = this.engine.applyAbility(this.player, this.enemy, action.abilityId);
    else if (action.type === "attack")
      res = this.engine.basicAttack(this.player, this.enemy);
    else if (action.type === "ultimate")
      res = this.engine.useUltimate(this.player, this.enemy);

    // apply end-turn effects for enemy (e.g. poison lingering)
    this.engine.endTurnEffects(this.enemy);
    this.turn = "enemy";
    this.checkEnd();
    return res;
  }

  enemyStep() {
    if (this.turn !== "enemy") return;
    if (!this.player.isAlive() || !this.enemy.isAlive()) return;

    if (this.enemy.stunned > 0) {
      this.engine.addLog(`${this.enemy.cfg.name} jest ogłuszony i traci turę.`);
      this.enemy.stunned = Math.max(0, this.enemy.stunned - 1);
      this.turn = "player";
      return;
    }

    const decision = SimpleAI.decide(this.enemy, this.player);
    let res;
    if (decision.type === "ability")
      res = this.engine.applyAbility(
        this.enemy,
        this.player,
        decision.abilityId!
      );
    else if (decision.type === "attack")
      res = this.engine.basicAttack(this.enemy, this.player);
    else if (decision.type === "ultimate")
      res = this.engine.useUltimate(this.enemy, this.player);

    // end-turn effects for player
    this.engine.endTurnEffects(this.player);
    this.turn = "player";
    this.checkEnd();
    return res;
  }

  checkEnd() {
    if (!this.player.isAlive() || !this.enemy.isAlive()) {
      const winner = this.player.isAlive()
        ? this.player.cfg.name
        : this.enemy.cfg.name;
      this.engine.addLog(`Koniec gry. Zwycięzca: ${winner}`);
    }
  }
}
