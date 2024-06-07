const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// PLAYER

const character = new Image();
character.src = './assets/Player.png';

const characterSize = 50;
const initialCharacterX = canvas.width / 2 - characterSize / 2;
const initialCharacterY = canvas.height / 2 - characterSize / 2;
let characterX = initialCharacterX;
let characterY = initialCharacterY;
let characterHealth = 100;

character.onload = () => {
    draw();
};

// ENEMY

const monster = new Image();
monster.src = './assets/Monster.png';

const monsterSize = 50;
let monsterX = characterX + characterSize + 10;
let monsterY = characterY + characterSize / 2 - monsterSize / 2;

monster.onload = () => {
    draw();
};

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacter();
    drawMonster();
}

function drawCharacter() {
    // Draw health bar
    context.fillStyle = 'red';
    context.fillRect(characterX, characterY - 20, characterSize, 10);
    context.fillStyle = 'green';
    context.fillRect(characterX, characterY - 20, characterSize * (characterHealth / 100), 10);

    // Draw character
    context.drawImage(character, characterX, characterY, characterSize, characterSize);
}

function drawMonster() {
    context.drawImage(monster, monsterX, monsterY, monsterSize, monsterSize);
}

document.addEventListener('keydown', (event) => {
    const step = 10;
    let newCharacterX = characterX;
    let newCharacterY = characterY;

    switch (event.key) {
        case 'ArrowUp':
            newCharacterY = characterY - step;
            break;
        case 'ArrowDown':
            newCharacterY = characterY + step;
            break;
        case 'ArrowLeft':
            newCharacterX = characterX - step;
            break;
        case 'ArrowRight':
            newCharacterX = characterX + step;
            break;
    }

    if (!isCollision(newCharacterX, newCharacterY)) {
        characterX = newCharacterX;
        characterY = newCharacterY;
    } else {
        reduceHealth();
    }

    draw();
});

function isCollision(newX, newY) {
    return (
        newX < monsterX + monsterSize &&
        newX + characterSize > monsterX &&
        newY < monsterY + monsterSize &&
        newY + characterSize > monsterY
    );
}

function reduceHealth() {
    characterHealth -= 10;
    if (characterHealth <= 0) {
        resetPlayer();
    }
}

function resetPlayer() {
    characterHealth = 100;
    characterX = initialCharacterX;
    characterY = initialCharacterY;
    draw();
}

function checkCollision() {
    if (isCollision(characterX, characterY)) {
        reduceHealth();
    }
}
