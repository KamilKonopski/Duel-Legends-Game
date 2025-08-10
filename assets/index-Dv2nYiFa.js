var p=Object.defineProperty;var y=(o,t,e)=>t in o?p(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var r=(o,t,e)=>y(o,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();const c=[{id:1,name:"Sir Leon",heroClass:"Knight",playstyle:"Balanced, good defense and attack",description:"Sir Leon is a noble knight who has sworn to protect the innocent and uphold justice.",heroImage:"/assets/heroes-splash-art/knight.jpg",abilities:[{id:1,name:"Sword Strike",description:"Standard attack",type:"attack",value:120,manaCost:20},{id:2,name:"Shield Block",description:"Reduces incoming damage next turn",type:"defence",value:.4,manaCost:40},{id:3,name:"Critical Slash",description:"50% chance to deal double damage",type:"effect",value:240,manaCost:60}],ultimate:{name:"Divine Protection",description:"No damage for 2 turns",type:"defence",value:0,manaCost:100,duration:2},healthPoints:1200,mana:500,manaRegeneration:20},{id:2,name:"Eldrin",heroClass:"Mage",playstyle:"Strong magic attacks, weak defense",description:"Eldrin is a master of the arcane arts, a powerful sorcerer.",heroImage:"/assets/heroes-splash-art/mage.jpg",abilities:[{id:1,name:"Fireball",description:"High fire damage",type:"attack",value:180,manaCost:80},{id:2,name:"Magic Shield",description:"Blocks the next incoming attack",type:"defence",value:1,manaCost:60},{id:3,name:"Ice Bolt",description:"Freezes the enemy for 1 turn",type:"attack",value:90,manaCost:40}],ultimate:{name:"Elemental Storm",description:"Random elemental effect",type:"attack",value:250,manaCost:150},healthPoints:1e3,mana:600,manaRegeneration:40},{id:3,name:"Shadow",heroClass:"Rogue",playstyle:"Fast attacks, evasion",description:"Shadow is a master of stealth and agility.",heroImage:"/assets/heroes-splash-art/rogue.jpg",abilities:[{id:1,name:"Double Slash",description:"Attacks twice in one turn",type:"attack",value:160,manaCost:40},{id:2,name:"Evasion",description:"50% chance to avoid an attack",type:"defence",value:.5,manaCost:20},{id:3,name:"Poisoned Dagger",description:"Deals damage over 3 turns",type:"attack",value:120,manaCost:50}],ultimate:{name:"Assassin's Shadow",description:"Attacks twice and evades next attack",type:"attack",value:160,manaCost:80},healthPoints:1100,mana:450,manaRegeneration:30},{id:4,name:"Auriel",heroClass:"Paladin",playstyle:"Balanced, healing & defense",description:"Auriel is a holy warrior, devoted to protecting allies.",heroImage:"/assets/heroes-splash-art/paladin.jpg",abilities:[{id:1,name:"Holy Strike",description:"Melee attack + magical damage",type:"attack",value:120,manaCost:40},{id:2,name:"Blessing",description:"Heals herself for 15% of HP",type:"defence",value:.15,manaCost:30},{id:3,name:"Sacred Blow",description:"30% chance to stun the enemy",type:"effect",value:100,manaCost:60}],ultimate:{name:"Last Hope",description:"If HP <20% restore 50% HP",type:"defence",value:.5,manaCost:100},healthPoints:1250,mana:500,manaRegeneration:25},{id:5,name:"Ragnar",heroClass:"Berserker",playstyle:"Aggressive: strong attacks, low defense",description:"Ragnar is a fierce berserker who lives for battle.",heroImage:"/assets/heroes-splash-art/berserker.jpg",abilities:[{id:1,name:"Axe Fury",description:"Powerful attack that lowers defense",type:"attack",value:200,manaCost:60},{id:2,name:"Fearless",description:"Cannot be stunned for 1 turn",type:"defence",value:0,manaCost:40},{id:3,name:"Warrior's Roar",description:"Increase attack for 2 turns",type:"effect",value:.25,manaCost:50}],ultimate:{name:"Blood Frenzy",description:"3 turns: attacks stronger but loses HP each turn",type:"effect",value:240,manaCost:120,duration:3},healthPoints:1300,mana:400,manaRegeneration:20}];class f{constructor(t){this.data=t}}class u{constructor(t){r(this,"hp");r(this,"maxHp");r(this,"mana");r(this,"maxMana");r(this,"manaRegen");r(this,"abilities");r(this,"ultimate");r(this,"blockMultiplier",0);r(this,"stunned",0);r(this,"poisoned",0);r(this,"attackBuff",0);r(this,"immortalTurns",0);this.cfg=t,this.maxHp=t.healthPoints,this.hp=t.healthPoints,this.maxMana=t.mana,this.mana=t.mana,this.manaRegen=t.manaRegeneration,this.abilities=t.abilities.map(e=>new f(e)),this.ultimate=t.ultimate}regen(){this.mana=Math.min(this.maxMana,this.mana+this.manaRegen)}takeDamage(t){if(this.immortalTurns>0)return 0;const e=t*(1-this.blockMultiplier),a=Math.max(0,Math.round(e*(1+this.attackBuff*-1)));return this.hp=Math.max(0,Math.round(this.hp-a)),a}applyBlock(t,e=1){this.blockMultiplier=Math.min(.9,t)}healPercent(t){const e=Math.round(this.maxHp*t);return this.hp=Math.min(this.maxHp,this.hp+e),e}isAlive(){return this.hp>0}}class g{constructor(t,e){r(this,"player");r(this,"enemy");r(this,"log",[]);this.player=t,this.enemy=e,this.log=[]}addLog(t){this.log.push(t),this.log.length>120&&this.log.shift()}applyAbility(t,e,a){const i=t.abilities.find(n=>n.data.id===a);if(!i)return{text:"Brak umiejętności"};if(t.mana<i.data.manaCost)return{text:`${t.cfg.name} nie ma wystarczająco many`};if(t.mana-=i.data.manaCost,i.data.type==="attack"){let n=i.data.value;n=Math.round(n*(1+(t.attackBuff||0)));const l=e.takeDamage(n);return this.addLog(`${t.cfg.name} użył ${i.data.name} i zadał ${l} obrażeń.`),{text:`Used ${i.data.name}`,damage:l}}if(i.data.type==="defence")return i.data.value>=1?(t.immortalTurns=1,this.addLog(`${t.cfg.name} użył ${i.data.name} i zablokował kolejny atak.`)):(t.applyBlock(i.data.value),this.addLog(`${t.cfg.name} przygotował obronę (${Math.round(i.data.value*100)}% redukcji).`)),{text:"Defence used"};if(i.data.type==="effect"){const n=i.data.name.toLowerCase();if(n.includes("poison")||n.includes("poisoned")||n.includes("poison"))return e.poisoned=Math.max(e.poisoned,3),this.addLog(`${t.cfg.name} zatruł ${e.cfg.name} na 3 tury.`),{text:"Poison applied"};if(n.includes("stun")||i.data.name.toLowerCase().includes("stun"))return e.stunned=Math.max(e.stunned,1),this.addLog(`${e.cfg.name} został ogłuszony na 1 turę.`),{text:"Stun applied"};if(n.includes("critical")||n.includes("double"))if(t.mana%2===0){const s=e.takeDamage(i.data.value);return this.addLog(`Krytyczne trafienie! ${t.cfg.name} zadał ${s} obrażeń.`),{text:"Critical hit",damage:s}}else{const s=e.takeDamage(Math.round(i.data.value/2));return this.addLog(`${t.cfg.name} użył ${i.data.name} i zadał ${s} obrażeń.`),{text:"Partial effect",damage:s}}return e.poisoned=Math.max(e.poisoned,2),this.addLog(`${t.cfg.name} użył ${i.data.name}. Efekt magiczny!`),{text:"Effect used"}}return{text:"Brak efektu"}}basicAttack(t,e){const i=Math.round(80*(1+(t.attackBuff||0))),n=e.takeDamage(i);return this.addLog(`${t.cfg.name} wykonał atak i zadał ${n} obrażeń.`),{text:"Basic attack",damage:n}}useUltimate(t,e){if(t.mana<t.ultimate.manaCost)return{text:`${t.cfg.name} nie ma many na ultimate`};t.mana-=t.ultimate.manaCost;const a=t.ultimate;if(a.type==="defence")if(a.value===0){const i=a.duration??1;return t.immortalTurns=i,this.addLog(`${t.cfg.name} aktywował ${a.name} — bez obrażeń przez ${i} tur(y).`),{text:"Ultimate defence"}}else return t.applyBlock(a.value),this.addLog(`${t.cfg.name} aktywował ${a.name} — block ${a.value}`),{text:"Ultimate defence block"};if(a.type==="attack"){const i=e.takeDamage(a.value);return this.addLog(`${t.cfg.name} użył ${a.name} i zadał ${i} obrażeń.`),{text:"Ultimate attack",damage:i}}return a.type==="effect"?a.name.toLowerCase().includes("frenzy")||a.name.toLowerCase().includes("blood")?(t.attackBuff+=.5,t.poisoned=Math.max(t.poisoned,0),t.immortalTurns=a.duration??3,this.addLog(`${t.cfg.name} wszedł w ${a.name}: zwiększenie ataku na ${a.duration??3} tur(y), ale traci HP co turę.`),{text:"Ultimate effect applied"}):(this.addLog(`${t.cfg.name} użył ${a.name}.`),{text:"Ultimate effect"}):{text:"Ultimate used"}}endTurnEffects(t){t.poisoned>0&&(t.hp=Math.max(0,t.hp-30),this.addLog(`${t.cfg.name} otrzymuje 30 obrażeń od trucizny.`),t.poisoned-=1),t.immortalTurns>0&&(t.immortalTurns=Math.max(0,t.immortalTurns-1),t.immortalTurns===0&&t.attackBuff>0&&(t.attackBuff=Math.max(0,t.attackBuff-.5),this.addLog(`${t.cfg.name} zakończył efekt ultimate (buff wygaśnięty).`))),t.blockMultiplier>1e-4&&(t.blockMultiplier=Math.max(0,t.blockMultiplier-.9)),t.stunned>0&&(t.stunned=Math.max(0,t.stunned-1)),t.regen(),t.hp<0&&(t.hp=0)}}class v{static decide(t,e){const a=t.hp/t.maxHp,i=e.hp/e.maxHp;if(t.mana>=t.ultimate.manaCost){if(t.ultimate.type==="attack"&&i<.6)return{type:"ultimate"};if(t.ultimate.type==="defence"&&a<.5)return{type:"ultimate"};if(t.ultimate.type==="effect"&&a>.5)return{type:"ultimate"}}if(a<.35){const s=t.abilities.find(d=>d.data.type==="defence"&&t.mana>=d.data.manaCost);if(s)return{type:"ability",abilityId:s.data.id}}if(i<.25){const s=t.abilities.find(d=>d.data.type==="attack"&&t.mana>=d.data.manaCost);if(s)return{type:"ability",abilityId:s.data.id}}const n=t.abilities.filter(s=>s.data.type==="attack"&&t.mana>=s.data.manaCost);if(n.length>0)return n.sort((s,d)=>d.data.value-s.data.value),{type:"ability",abilityId:n[0].data.id};const l=t.abilities.find(s=>t.mana>=s.data.manaCost);return l?{type:"ability",abilityId:l.data.id}:{type:"attack"}}}class b{constructor(t,e){r(this,"engine");r(this,"turn","player");this.player=t,this.enemy=e,this.engine=new g(t,e)}playerAction(t){if(this.turn!=="player"||!this.player.isAlive()||!this.enemy.isAlive())return;if(this.player.stunned>0){this.engine.addLog(`${this.player.cfg.name} jest ogłuszony i traci turę.`),this.player.stunned=Math.max(0,this.player.stunned-1),this.turn="enemy";return}let e;return t.type==="ability"?e=this.engine.applyAbility(this.player,this.enemy,t.abilityId):t.type==="attack"?e=this.engine.basicAttack(this.player,this.enemy):t.type==="ultimate"&&(e=this.engine.useUltimate(this.player,this.enemy)),this.engine.endTurnEffects(this.enemy),this.turn="enemy",this.checkEnd(),e}enemyStep(){if(this.turn!=="enemy"||!this.player.isAlive()||!this.enemy.isAlive())return;if(this.enemy.stunned>0){this.engine.addLog(`${this.enemy.cfg.name} jest ogłuszony i traci turę.`),this.enemy.stunned=Math.max(0,this.enemy.stunned-1),this.turn="player";return}const t=v.decide(this.enemy,this.player);let e;return t.type==="ability"?e=this.engine.applyAbility(this.enemy,this.player,t.abilityId):t.type==="attack"?e=this.engine.basicAttack(this.enemy,this.player):t.type==="ultimate"&&(e=this.engine.useUltimate(this.enemy,this.player)),this.engine.endTurnEffects(this.player),this.turn="player",this.checkEnd(),e}checkEnd(){if(!this.player.isAlive()||!this.enemy.isAlive()){const t=this.player.isAlive()?this.player.cfg.name:this.enemy.cfg.name;this.engine.addLog(`Koniec gry. Zwycięzca: ${t}`)}}}function m(o,t=0,e=100){return Math.max(t,Math.min(e,o))}class k{constructor(t,e){r(this,"root");r(this,"game");this.root=t,this.game=e,this.renderHeroSelect()}renderHeroSelect(){this.root.innerHTML=`
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
    `;const t=this.root.querySelector("#heroes-grid");t.innerHTML=c.map(a=>`
      <article class="hero-card card p-0 shadow-md" data-id="${a.id}">
        <img class="hero-splash" src="${a.heroImage}" alt="${a.name}" />
        <div class="p-3">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold">${a.name}</h3>
            <span class="text-xs opacity-80">${a.heroClass}</span>
          </div>
          <p class="text-sm mt-2 opacity-80">${a.playstyle}</p>
          <p class="text-xs mt-2 opacity-70">${a.description}</p>
          <div class="mt-3 flex gap-2">
            <button class="btn btn-attack select-btn">Wybierz</button>
            <button class="btn btn-standard preview-btn">Podgląd</button>
          </div>
        </div>
      </article>
    `).join(""),this.root.querySelectorAll(".hero-card").forEach(a=>{a.addEventListener("click",()=>{const i=Number(a.dataset.id),n=c.find(s=>s.id===i),l=c.find(s=>s.id!==i);this.game=new b(new u(n),new u(l)),this.renderBattle()})}),this.root.querySelector("#shuffleBtn").addEventListener("click",()=>{const a=Math.floor(Math.random()*c.length);alert(`Losowy przeciwnik: ${c[a].name}`)})}renderBattle(){if(!this.game)return;const{player:t,enemy:e}=this.game,a=m(Math.round(t.hp/t.maxHp*100),0,100),i=m(Math.round(t.mana/t.maxMana*100),0,100),n=m(Math.round(e.hp/e.maxHp*100),0,100),l=m(Math.round(e.mana/e.maxMana*100),0,100);this.root.innerHTML=`
      <div class="max-w-6xl w-full mx-auto">
        <div class="flex items-center justify-between mb-4">
          <button id="backBtn" class="btn btn-standard">Wróć do wyboru</button>
          <div class="text-center">
            <h2 class="text-2xl font-semibold">Duel</h2>
            <p class="text-sm opacity-80">Twoja tura: <strong>${this.game.turn==="player"?"TAK":"NIE"}</strong></p>
          </div>
          <div></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="card">
            <div class="flex items-center gap-4">
              <img src="${t.cfg.heroImage}" class="w-20 h-20 object-cover rounded-md" />
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">${t.cfg.name} (Ty)</h3>
                  <div class="text-sm opacity-80">${t.hp}/${t.maxHp} HP</div>
                </div>
                <div class="mt-2">
                  <div class="stat-label">HP</div>
                  <div class="stat-bar"><div id="player-hp" class="stat-fill hp-fill" style="width:${a}%"></div></div>
                  <div class="mt-2 stat-label">Mana</div>
                  <div class="stat-bar"><div id="player-mana" class="stat-fill mana-fill" style="width:${i}%"></div></div>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <div id="player-actions" class="flex flex-wrap gap-2"></div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center gap-4">
              <img src="${e.cfg.heroImage}" class="w-20 h-20 object-cover rounded-md" />
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">${e.cfg.name} (Przeciwnik)</h3>
                  <div class="text-sm opacity-80">${e.hp}/${e.maxHp} HP</div>
                </div>
                <div class="mt-2">
                  <div class="stat-label">HP</div>
                  <div class="stat-bar"><div id="enemy-hp" class="stat-fill hp-fill" style="width:${n}%"></div></div>
                  <div class="mt-2 stat-label">Mana</div>
                  <div class="stat-bar"><div id="enemy-mana" class="stat-fill mana-fill" style="width:${l}%"></div></div>
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
    `,this.root.querySelector("#backBtn").addEventListener("click",()=>this.renderHeroSelect()),this.mountActions(),this.updateLog(),this.updateStatuses()}mountActions(){if(!this.game)return;const t=this.root.querySelector("#player-actions");t.innerHTML="";const e=document.createElement("button");e.className="btn btn-attack",e.textContent="Atak",e.onclick=()=>this._playerTurn({type:"attack"}),t.appendChild(e),this.game.player.abilities.forEach(i=>{const n=document.createElement("button");n.className="btn btn-ability",n.textContent=`${i.data.name} (${i.data.manaCost})`,n.title=i.data.description||"",n.onclick=()=>this._playerTurn({type:"ability",abilityId:i.data.id}),t.appendChild(n)});const a=document.createElement("button");a.className="btn btn-defend",a.textContent=`Ultimate (${this.game.player.ultimate.manaCost})`,a.onclick=()=>this._playerTurn({type:"ultimate"}),t.appendChild(a)}_playerTurn(t){this.game&&this.game.turn==="player"&&(this.game.playerAction(t),this.triggerHitAnimation(),this.renderBattle(),setTimeout(()=>{var e;(e=this.game)==null||e.enemyStep(),this.triggerHitAnimation(!0),this.renderBattle()},650))}triggerHitAnimation(t=!1){const e=this.root.querySelector(t?"#player-hp":"#enemy-hp");e&&(e.classList.add("hit-flash"),setTimeout(()=>e.classList.remove("hit-flash"),260))}updateLog(){if(!this.game)return;const t=this.root.querySelector("#log");t.innerHTML=this.game.engine.log.slice().reverse().slice(0,10).map(e=>`<div class="log-entry">${e}</div>`).join("")}updateStatuses(){if(!this.game)return;const t=this.root.querySelector("#enemy-status"),e=this.game.enemy,a=[];e.poisoned>0&&a.push(`Poison: ${e.poisoned}t`),e.stunned>0&&a.push(`Stun: ${e.stunned}t`),e.blockMultiplier>0&&a.push(`Block: ${Math.round(e.blockMultiplier*100)}%`),t.innerHTML=a.length?a.join(" • "):"Brak"}}const h=document.getElementById("app");if(!h)throw new Error("Element #app not found");new k(h).renderHeroSelect();
