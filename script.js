const grid = document.querySelector(".main_content_game");
const winMessage = document.querySelector(".message");
var tentativas = 0;

const nums = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  if (disabledCards.length == 18){
    winMessage.style.display = "flex";
    winMessage.innerHTML = `
    <div class="winGame">
        <h1>BUUH!!</h1>
        <p>Parabéns, você terminou esse jogo da memória em ${tentativas} tentativas. Experimente fazer em menos tentativas ou jogue em outra dificuldade.</p>
        <button onclick="window.location='index.html'">JOGAR NOVAMENTE</button>
      </div>
      `
  }
}

const checkCards = () => {
  tentativas = tentativas+1;
  const firstNum = firstCard.getAttribute("data-num");
  const secondNum = secondCard.getAttribute("data-num");

  if (firstNum == secondNum) {
      firstCard.firstChild.classList.add("disabled-card");
      secondCard.firstChild.classList.add("disabled-card");
      firstCard = "";
      secondCard = "";

      checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");
      firstCard = "";
      secondCard = "";
    }, 600);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard == "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard == "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (num) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url("./img/${num}.png")`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-num", num);

  return card;
};

const loadGame = () => {
  const duplicateArray = [...nums, ...nums];

  const shuffledArray = duplicateArray.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((num) => {
    const card = createCard(num);
    grid.appendChild(card);
  });
};

loadGame();
