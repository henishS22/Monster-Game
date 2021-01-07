const PLAYER_ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 11;
const STRONG_ATTACK_VALUE = PLAYER_ATTACK_VALUE * 2;
const HEALING_VALUE = 5;

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let maxLife = prompt('Enter the max life for player and monster','100');

let battleLog = [];

if(isNaN(parseInt(maxLife)) || maxLife <=0){
    maxLife = 100;
}

let newMonsterAttackValue = MONSTER_ATTACK_VALUE;
//let maxLife = 100;
let strongAttackCount = 1;
let monsterHealth = maxLife;
let playerHealth = maxLife;
let hasBonusLife = true;

adjustHealthBars(maxLife);

const writeToLog = (evt, val, mnstHlth,plyrHlth)=>{
    let logEntry = {
        event: evt,
        value: val,
        finalMonsterHealth: mnstHlth,
        finalPlayerHealth: plyrHlth
    };
    if(evt === LOG_EVENT_PLAYER_ATTACK){
        logEntry.target = 'MONSTER';
    }else if(evt === LOG_EVENT_PLAYER_ATTACK){
        logEntry.target = 'MONSTER';
    }else if(evt === LOG_EVENT_MONSTER_ATTACK){
        logEntry.target = 'PLAYER';
    }else if(evt === LOG_EVENT_PLAYER_HEAL){
        logEntry.target = 'PLAYER';
    }else if(evt === LOG_EVENT_GAME_OVER){
        logEntry = {
            event: evt,
            value: val,
            finalMonsterHealth: mnstHlth,
            finalPlayerHealth: plyrHlth
        };
    }        
    battleLog.push(logEntry);
}

const reset = () => {
    playerHealth = maxLife;
    monsterHealth = maxLife;
    hasBonusLife = true;
    bonusLifeEl.hidden = false;
    strongAttackCount = 1;
    resetGame(maxLife);
}

const damage = (player_attack_value, monster_attack_value) => {
    let bonusHealth = playerHealth;
    const monsterDamage = dealMonsterDamage(player_attack_value);
    const playerDamage = dealPlayerDamage(monster_attack_value);
    monsterHealth -= monsterDamage;
    playerHealth -= playerDamage;
    if (monsterHealthBar.value === 0 && playerHealthBar.value === 0) {
        alert(`You've won but at what cost!`);
    } else if (playerHealthBar.value === 0 && monsterHealthBar.value > 0) {
        if (hasBonusLife) {
            setPlayerHealth(bonusHealth);
            hasBonusLife = false;
            bonusLifeEl.value = hasBonusLife;
            removeBonusLife();
            alert(`You've been given another chance..... USE IT WISELY!!`)
        } else {
            alert('You are dead!!');
        }
    } else if (monsterHealthBar.value === 0 && playerHealthBar.value > 0) {
        alert('You won!!');
    }
    if (!hasBonusLife && playerHealthBar.value === 0 || monsterHealthBar.value === 0 ) {
        reset();
    }
}

const onAttack = () => {
    if (strongAttackCount > 1) {
        strongAttackCount = 1;
        strongAttackBtn.hidden = 0;
        newMonsterAttackValue += 2;
    }
    damage(PLAYER_ATTACK_VALUE, newMonsterAttackValue);
}

const onStrongAttack = () => {
    if (strongAttackCount <= 2) {
        strongAttackBtn.hidden = 0;
        damage(STRONG_ATTACK_VALUE, newMonsterAttackValue);
        strongAttackCount++;
        if (strongAttackCount > 2) {
            strongAttackBtn.hidden = 1;
        }
    } else {
        strongAttackBtn.hidden = 1;
        strongAttackCount = 1;
    }
}

const onHealing = () => {
    if (playerHealthBar.value < maxLife - HEALING_VALUE && playerHealthBar.value > 0) {
        increasePlayerHealth(HEALING_VALUE);
    } else {
        alert('Cannot heal right now');
    }
    damage(0, newMonsterAttackValue);
}

const onShowLog = () => {
    alert('Showing Log!');
}

attackBtn.addEventListener('click', onAttack);
strongAttackBtn.addEventListener('click', onStrongAttack);
healBtn.addEventListener('click', onHealing);
logBtn.addEventListener('click', onShowLog);