import { HEROES } from "../data/heroes";
import { Hero } from "../entities/Hero";
import { Game } from "../game/Game";
import { GameEndModal } from "./GameEndModal";

function clamp(n: number, a = 0, b = 100) {
  return Math.max(a, Math.min(b, n));
}

export class Renderer {
  root: HTMLElement;
  game?: Game;

  constructor(root: HTMLElement, game?: Game) {
    this.root = root;
    this.game = game;
    this.renderHeroSelect();
  }

  renderHeroSelect() {
    this.root.innerHTML = `
      <div class="max-w-5xl w-full mx-auto">
        <header class="mb-6 text-center">
          <h1 class="text-4xl font-bold">Duel Legends</h1>
          <p class="text-sm opacity-80 mt-1">Wybierz bohatera i stocz pojedynek z komputerem</p>
        </header>

        <section id="heroes-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></section>

        <div class="mt-8 text-center">
          <button id="shuffleBtn" class="btn btn-standard">Losuj przeciwnika</button>
        </div>
      </div>
    `;

    const grid = this.root.querySelector("#heroes-grid")!;
    grid.innerHTML = HEROES.map(
      (h) => `
      <article class="hero-card card p-0 shadow-md" data-id="${h.id}">
        <img class="hero-splash" src="${h.heroImage}" alt="${h.name}" />
        <div class="p-3">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold">${h.name}</h3>
            <span class="text-xs opacity-80">${h.heroClass}</span>
          </div>
          <p class="text-sm mt-2 opacity-80">${h.playstyle}</p>
          <p class="text-xs mt-2 opacity-70">${h.description}</p>
          <div class="mt-3 flex gap-2">
            <button class="btn btn-attack select-btn">Wybierz</button>
            <button class="btn btn-standard preview-btn">Podgląd</button>
          </div>
        </div>
      </article>
    `
    ).join("");

    // click handlers
    this.root.querySelectorAll(".select-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const card = btn.closest(".hero-card") as HTMLElement;
        const id = Number(card.dataset.id);

        const playerCfg = HEROES.find((h) => h.id === id);
        if (!playerCfg) {
          console.error(`Nie znaleziono bohatera o id=${id}`);
          return;
        }

        const enemyCfg = HEROES.find((h) => h.id !== id);
        if (!enemyCfg) {
          console.error("Brak dostępnych przeciwników!");
          return;
        }

        this.game = new Game(new Hero(playerCfg), new Hero(enemyCfg));
      });
    });

    // shuffle button -> random enemy preview
    const shuffle = this.root.querySelector("#shuffleBtn") as HTMLButtonElement;
    shuffle.addEventListener("click", () => {
      if (!this.game?.player) {
        alert("Najpierw wybierz swojego bohatera!");
        return;
      }

      const playerId = this.game.player.cfg.id;
      const availableOpponents = HEROES.filter((h) => h.id !== playerId);
      const enemyCfg =
        availableOpponents[
          Math.floor(Math.random() * availableOpponents.length)
        ];

      this.game.enemy = new Hero(enemyCfg);
      this.renderBattle();
    });
  }

  renderBattle() {
    if (!this.game) return;
    const { player, enemy } = this.game;

    this.game.onGameEnd = (result) => {
      new GameEndModal(result, () => {
        this.renderHeroSelect();
      });
    };

    // calculate bar widths
    const playerHpPct = clamp(
      Math.round((player.hp / player.maxHp) * 100),
      0,
      100
    );
    const playerManaPct = clamp(
      Math.round((player.mana / player.maxMana) * 100),
      0,
      100
    );
    const enemyHpPct = clamp(
      Math.round((enemy.hp / enemy.maxHp) * 100),
      0,
      100
    );
    const enemyManaPct = clamp(
      Math.round((enemy.mana / enemy.maxMana) * 100),
      0,
      100
    );

    this.root.innerHTML = `
      <div class="max-w-6xl w-full mx-auto">
        <div class="flex items-center justify-between mb-4">
          <button id="backBtn" class="btn btn-standard">Wróć do wyboru</button>
          <div class="text-center">
            <h2 class="text-2xl font-semibold">Duel</h2>
            <p class="text-sm opacity-80">Twoja tura: <strong>${
              this.game.turn === "player" ? "TAK" : "NIE"
            }</strong></p>
          </div>
          <div></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="card">
            <div class="flex items-center gap-4">
              <img src="${
                player.cfg.heroImage
              }" class="w-20 h-20 object-cover rounded-md" />
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">${player.cfg.name} (Ty)</h3>
                  <div class="text-sm opacity-80">${player.hp}/${
      player.maxHp
    } HP</div>
                </div>
                <div class="mt-2">
                  <div class="stat-label">HP</div>
                  <div class="stat-bar"><div id="player-hp" class="stat-fill hp-fill" style="width:${playerHpPct}%"></div></div>
                  <div class="mt-2 stat-label">Mana</div>
                  <div class="stat-bar"><div id="player-mana" class="stat-fill mana-fill" style="width:${playerManaPct}%"></div></div>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <div id="player-actions" class="flex flex-wrap gap-2"></div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center gap-4">
              <img src="${
                enemy.cfg.heroImage
              }" class="w-20 h-20 object-cover rounded-md" />
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">${
                    enemy.cfg.name
                  } (Przeciwnik)</h3>
                  <div class="text-sm opacity-80">${enemy.hp}/${
      enemy.maxHp
    } HP</div>
                </div>
                <div class="mt-2">
                  <div class="stat-label">HP</div>
                  <div class="stat-bar"><div id="enemy-hp" class="stat-fill hp-fill" style="width:${enemyHpPct}%"></div></div>
                  <div class="mt-2 stat-label">Mana</div>
                  <div class="stat-bar"><div id="enemy-mana" class="stat-fill mana-fill" style="width:${enemyManaPct}%"></div></div>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <div class="text-xs opacity-80">Statusy:</div>
              <div id="enemy-status" class="mt-2 text-sm"></div>
            </div>
          </div>
        </div>

        <div class="mt-6 card">
          <h4 class="font-semibold">Historia</h4>
          <div id="log" class="mt-2 max-h-52 overflow-y-auto"></div>
        </div>
      </div>
    `;

    // back button
    this.root
      .querySelector("#backBtn")!
      .addEventListener("click", () => this.renderHeroSelect());

    this.mountActions();
    this.updateLog();
    this.updateStatuses();
  }

  mountActions() {
    if (!this.game) return;
    const container = this.root.querySelector("#player-actions") as HTMLElement;
    container.innerHTML = "";

    // Attack button
    const atk = document.createElement("button");
    atk.className = "btn btn-attack";
    atk.textContent = "Atak";
    atk.onclick = () => this._playerTurn({ type: "attack" });
    container.appendChild(atk);

    // Abilities
    this.game.player.abilities.forEach((a) => {
      const b = document.createElement("button");
      b.className = "btn btn-ability";
      b.textContent = `${a.data.name} (${a.data.manaCost})`;
      b.title = a.data.description || "";
      b.onclick = () =>
        this._playerTurn({ type: "ability", abilityId: a.data.id });
      container.appendChild(b);
    });

    // Ultimate
    const ult = document.createElement("button");
    ult.className = "btn btn-defend";
    ult.textContent = `Ultimate (${this.game.player.ultimate.manaCost})`;
    ult.onclick = () => this._playerTurn({ type: "ultimate" });
    container.appendChild(ult);
  }

  private _playerTurn(action: any) {
    if (!this.game) return;
    // block UI if not player's turn
    if (this.game.turn !== "player") return;
    // perform action
    this.game.playerAction(action);
    // animate hit by briefly flashing target bar
    this.triggerHitAnimation();
    this.renderBattle();
    // let enemy respond after short delay
    setTimeout(() => {
      this.game?.enemyStep();
      this.triggerHitAnimation(true);
      this.renderBattle();
    }, 650);
  }

  private triggerHitAnimation(isEnemy = false) {
    // add small class to target HP container to pulse
    const el = this.root.querySelector(
      isEnemy ? "#player-hp" : "#enemy-hp"
    ) as HTMLElement;
    if (!el) return;
    el.classList.add("hit-flash");
    setTimeout(() => el.classList.remove("hit-flash"), 260);
  }

  updateLog() {
    if (!this.game) return;
    const logEl = this.root.querySelector("#log")!;
    logEl.innerHTML = this.game.engine.log
      .slice()
      .reverse()
      .slice(0, 10)
      .map((l) => `<div class="log-entry">${l}</div>`)
      .join("");
  }

  updateStatuses() {
    if (!this.game) return;
    const st = this.root.querySelector("#enemy-status")!;
    const enemy = this.game.enemy;
    const arr = [];
    if (enemy.poisoned > 0) arr.push(`Poison: ${enemy.poisoned}t`);
    if (enemy.stunned > 0) arr.push(`Stun: ${enemy.stunned}t`);
    if (enemy.blockMultiplier > 0)
      arr.push(`Block: ${Math.round(enemy.blockMultiplier * 100)}%`);
    st.innerHTML = arr.length ? arr.join(" • ") : "Brak";
  }
}
