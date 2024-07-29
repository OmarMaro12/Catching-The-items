let gameContainer;
let basket;
let scoreDisplay;
let startButton;
let score = 0;
let itemInterval;
let basketSpeed = 20;
let itemSpeed = 3;
let itemIntervalTime = 1000; // Time in milliseconds between new items

document.addEventListener("DOMContentLoaded", function () {
  gameContainer = document.getElementById("gameContainer");
  basket = document.getElementById("basket");
  scoreDisplay = document.getElementById("score");
  startButton = document.getElementById("startButton");

  startButton.addEventListener("click", startGame);
  document.addEventListener("keydown", moveBasket);
});

function startGame() {
  resetGame();
  startButton.disabled = true;
  itemInterval = setInterval(createItem, itemIntervalTime);
}

function resetGame() {
  score = 0;
  updateScore();
  basket.style.left = `${
    (gameContainer.clientWidth - basket.clientWidth) / 2
  }px`;
  clearItems();
}

function moveBasket(event) {
  const basketRect = basket.getBoundingClientRect();
  const gameRect = gameContainer.getBoundingClientRect();
  if (event.key === "ArrowLeft" && basketRect.left > gameRect.left) {
    basket.style.left = `${Math.max(
      0,
      basketRect.left - gameRect.left - basketSpeed
    )}px`;
  } else if (event.key === "ArrowRight" && basketRect.right < gameRect.right) {
    basket.style.left = `${Math.min(
      gameRect.width - basket.clientWidth,
      basketRect.left - gameRect.left + basketSpeed
    )}px`;
  }
}

function createItem() {
  const item = document.createElement("div");
  item.classList.add("item");
  item.style.left = `${Math.random() * (gameContainer.clientWidth - 20)}px`;
  item.style.top = "0px";
  gameContainer.appendChild(item);

  moveItem(item);
}

function moveItem(item) {
  const itemInterval = setInterval(() => {
    const itemRect = item.getBoundingClientRect();
    const gameRect = gameContainer.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (itemRect.bottom >= gameRect.bottom) {
      clearInterval(itemInterval);
      endGame();
      return;
    }

    if (
      itemRect.bottom >= basketRect.top &&
      itemRect.right > basketRect.left &&
      itemRect.left < basketRect.right
    ) {
      clearInterval(itemInterval);
      item.remove();
      score++;
      updateScore();
      return;
    }

    item.style.top = `${itemRect.top - gameRect.top + itemSpeed}px`;
  }, 20);
}

function updateScore() {
  scoreDisplay.innerText = `Score: ${score}`;
}

function clearItems() {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => item.remove());
}

function endGame() {
  clearInterval(itemInterval);
  alert("Game Over! Your score: " + score);
  startButton.disabled = false;
}
