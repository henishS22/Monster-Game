let monsterHealthBar= document.getElementById('monster-health');
let playerHealthBar = document.getElementById('player-health');
let bonus = document.getElementById('bonus-life');

const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');
const logBtn = document.getElementById('log-btn');

function healthProgress(maxLife)
{
    monsterHealthBar.max = maxLife;
    monsterHealthBar.value = maxLife;
    playerHealthBar.max = maxLife;
    playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage)
{
    const dealDamage = Math.random()*damage;
    monsterHealthBar.value = monsterHealthBar.value - dealDamage;
    return dealDamage;
}

function dealPlayerDamage(damage)
{
    const dealPlayerDamage = Math.random()*damage;
    playerHealthBar.value = playerHealthBar.value - dealPlayerDamage;
    return dealPlayerDamage;
}

function resetGame(value)
{
    monsterHealthBar.value = value;
    playerHealthBar.value = value;
}