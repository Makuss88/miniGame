const answerBox = document.getElementById('answer-box-hidden');
const answerBox2 = document.getElementById('answer-box-unhidden');
const answerBtn = document.getElementById('answer-btn');
const red = document.getElementById('red');
const yel = document.getElementById('yel');
const grn = document.getElementById('grn');
const blu = document.getElementById('blu');

const g00 = document.getElementById('g00');
const g01 = document.getElementById('g01');
const g02 = document.getElementById('g02');
const g03 = document.getElementById('g03');
const g10 = document.getElementById('g10');
const g11 = document.getElementById('g11');
const g12 = document.getElementById('g12');
const g13 = document.getElementById('g13');
const g20 = document.getElementById('g20');
const g21 = document.getElementById('g21');
const g22 = document.getElementById('g22');
const g23 = document.getElementById('g23');
const g30 = document.getElementById('g30');
const g31 = document.getElementById('g31');
const g32 = document.getElementById('g32');
const g33 = document.getElementById('g33');
const g40 = document.getElementById('g40');
const g41 = document.getElementById('g41');
const g42 = document.getElementById('g42');
const g43 = document.getElementById('g43');
const g50 = document.getElementById('g50');
const g51 = document.getElementById('g51');
const g52 = document.getElementById('g52');
const g53 = document.getElementById('g53');
const g60 = document.getElementById('g60');
const g61 = document.getElementById('g61');
const g62 = document.getElementById('g62');
const g63 = document.getElementById('g63');
const g70 = document.getElementById('g70');
const g71 = document.getElementById('g71');
const g72 = document.getElementById('g72');
const g73 = document.getElementById('g73');
const g80 = document.getElementById('g80');
const g81 = document.getElementById('g81');
const g82 = document.getElementById('g82');
const g83 = document.getElementById('g83');
const g90 = document.getElementById('g90');
const g91 = document.getElementById('g91');
const g92 = document.getElementById('g92');
const g93 = document.getElementById('g93');

const hiddenRows = document.querySelectorAll('.game-pegs')
const answerPegs = document.querySelectorAll('.game-answer-peg')

const answerPeg = document.querySelectorAll('.answerPeg');

const mixingColors = [];
let answerBefore = ['sienna', 'sienna', 'sienna', 'sienna'];

let answer = [];
let textPlayer = [];
let winnerFlag = false;

const choiceBtn = document.getElementById('choice');
const pegs = document.getElementsByClassName('game-pegs');

// **** losowanie do gry
const ans0 = document.getElementById('answer0');
const ans1 = document.getElementById('answer1');
const ans2 = document.getElementById('answer2');
const ans3 = document.getElementById('answer3');
const answ = [ans0, ans1, ans2, ans3];

let mixingFlag = true;


// **mixing color at start game
const mixing = () => {
  const colors = ['red', 'yellow', 'green', 'blue']
  answ.map((i) => { i.style.backgroundColor = colors[Math.ceil(Math.random() * colors.length) - 1] })
};


// **** dodawania po linijce, kotra linijka jest czynna
let counter = 0;
const count = () => {
  // mapuj to
  for (let i = 0; i < 10; i++) {
    if (pegs[i].classList[1] == counter) {
      pegs[i].style.borderColor = 'yellow';
      pegs[i].style.borderStyle = 'solid';
      pegs[i].style.borderWidth = '2px';
    } else {
      pegs[i].style.borderColor = 'black';
      pegs[i].style.borderWidth = '1px';
    }
  };
  counter++;
};

// *** ukrywanie klapki nad odpowiedza
const change = () => {
  if (answerBox.classList[1] == 'hidden') {
    answerBox.classList.remove('hidden')
    answerBox2.classList.add('hidden')
  } else {
    answerBox.classList.add('hidden')
    answerBox2.classList.remove('hidden')
  }
};

const hiddenRow = () => {
  hiddenRows[9 - counter].classList.remove('hidden');
  if (winnerFlag) {
    answerPeg[0].classList.remove('hidden')
    alert('WINNER!')
  }
};

//*** wybor koloru do gry
let choice;

red.onclick = () => {
  choice = 'red';
  choiceBtn.style.backgroundColor = choice;
  choiceBtn.innerHTML = 'RED'
};

yel.onclick = () => {
  choice = 'yellow';
  choiceBtn.style.backgroundColor = choice;
  choiceBtn.innerHTML = 'YEL'
};

grn.onclick = () => {
  choice = 'green'
  choiceBtn.style.backgroundColor = choice;
  choiceBtn.innerHTML = 'GRE'
};

blu.onclick = () => {
  choice = 'blue'
  choiceBtn.style.backgroundColor = choice;
  choiceBtn.innerHTML = 'BLU'
};

g00.onclick = () => g00.style.backgroundColor = choice;
g01.onclick = () => g01.style.backgroundColor = choice;
g02.onclick = () => g02.style.backgroundColor = choice;
g03.onclick = () => g03.style.backgroundColor = choice;
g10.onclick = () => g10.style.backgroundColor = choice;
g11.onclick = () => g11.style.backgroundColor = choice;
g12.onclick = () => g12.style.backgroundColor = choice;
g13.onclick = () => g13.style.backgroundColor = choice;
g20.onclick = () => g20.style.backgroundColor = choice;
g21.onclick = () => g21.style.backgroundColor = choice;
g22.onclick = () => g22.style.backgroundColor = choice;
g23.onclick = () => g23.style.backgroundColor = choice;
g30.onclick = () => g30.style.backgroundColor = choice;
g31.onclick = () => g31.style.backgroundColor = choice;
g32.onclick = () => g32.style.backgroundColor = choice;
g33.onclick = () => g33.style.backgroundColor = choice;
g40.onclick = () => g40.style.backgroundColor = choice;
g41.onclick = () => g41.style.backgroundColor = choice;
g42.onclick = () => g42.style.backgroundColor = choice;
g43.onclick = () => g43.style.backgroundColor = choice;
g50.onclick = () => g50.style.backgroundColor = choice;
g51.onclick = () => g51.style.backgroundColor = choice;
g52.onclick = () => g52.style.backgroundColor = choice;
g53.onclick = () => g53.style.backgroundColor = choice;
g60.onclick = () => g60.style.backgroundColor = choice;
g61.onclick = () => g61.style.backgroundColor = choice;
g62.onclick = () => g62.style.backgroundColor = choice;
g63.onclick = () => g63.style.backgroundColor = choice;
g70.onclick = () => g70.style.backgroundColor = choice;
g71.onclick = () => g71.style.backgroundColor = choice;
g72.onclick = () => g72.style.backgroundColor = choice;
g73.onclick = () => g73.style.backgroundColor = choice;
g80.onclick = () => g80.style.backgroundColor = choice;
g81.onclick = () => g81.style.backgroundColor = choice;
g82.onclick = () => g82.style.backgroundColor = choice;
g83.onclick = () => g83.style.backgroundColor = choice;
g90.onclick = () => g90.style.backgroundColor = choice;
g91.onclick = () => g91.style.backgroundColor = choice;
g92.onclick = () => g92.style.backgroundColor = choice;
g93.onclick = () => g93.style.backgroundColor = choice;

const changePegs = () => {

  answer = [ans0.style.backgroundColor, ans1.style.backgroundColor, ans2.style.backgroundColor, ans3.style.backgroundColor];

  switch (counter - 1) {
    case 0:
      textPlayer = [g00.style.backgroundColor, g01.style.backgroundColor, g02.style.backgroundColor, g03.style.backgroundColor];
      break;
    case 1:
      textPlayer = [g10.style.backgroundColor, g11.style.backgroundColor, g12.style.backgroundColor, g13.style.backgroundColor];
      break;
    case 2:
      textPlayer = [g20.style.backgroundColor, g21.style.backgroundColor, g22.style.backgroundColor, g23.style.backgroundColor];
      break;
    case 3:
      textPlayer = [g30.style.backgroundColor, g31.style.backgroundColor, g32.style.backgroundColor, g33.style.backgroundColor];
      break;
    case 4:
      textPlayer = [g40.style.backgroundColor, g41.style.backgroundColor, g42.style.backgroundColor, g43.style.backgroundColor];
      break;
    case 5:
      textPlayer = [g50.style.backgroundColor, g51.style.backgroundColor, g52.style.backgroundColor, g53.style.backgroundColor];
      break;
    case 6:
      textPlayer = [g60.style.backgroundColor, g61.style.backgroundColor, g62.style.backgroundColor, g63.style.backgroundColor];
      break;
    case 7:
      textPlayer = [g70.style.backgroundColor, g71.style.backgroundColor, g72.style.backgroundColor, g73.style.backgroundColor];
      break;
    case 8:
      textPlayer = [g80.style.backgroundColor, g81.style.backgroundColor, g82.style.backgroundColor, g83.style.backgroundColor];
      break;
    case 9:
      textPlayer = [g90.style.backgroundColor, g91.style.backgroundColor, g92.style.backgroundColor, g93.style.backgroundColor];
      break;
  }

  if (JSON.stringify(answer) === JSON.stringify(textPlayer)) {
    winnerFlag = true;
  }
};

const abc = () => {
  for (let i = 0; i < 4; i++) { answerPegs[4 * (11 - counter) + i].style.backgroundColor = answerBefore[i] }
}
const changePegsAnswer = () => {
  switch (counter) {
    case 0:
      abc();
      break;
    case 1:
      abc();
      break;
    case 2:
      abc();
      break;
    case 3:
      abc();
      break;
    case 4:
      abc();
      break;
    case 5:
      abc();
      break;
    case 6:
      abc();
      break;
    case 7:
      abc();
      break;
    case 8:
      abc();
      break;
    case 9:
      abc();
      break;
  }
};

const showPegs = () => {
  let pegBlack = 0;
  let pegWhite = 0;
  let answerModify = answer.slice();
  let playerModify = textPlayer.slice();
  answerBefore = ['sienna', 'sienna', 'sienna', 'sienna'];
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === textPlayer[i]) {
      pegBlack++;
      answerModify.splice(i, 1, '+');
      playerModify.splice(i, 1, '-');
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (answerModify[i] === playerModify[j]) {
        pegWhite++;
        playerModify.splice(j, 1, '*')
        break;
      }
    }
  }

  for (let i = 0; i < 4; i++) {
    if (pegBlack > 0) {
      answerBefore.splice(i, 1, 'black')
      pegBlack--;
      continue;
    }
    if (pegWhite > 0) {
      answerBefore.splice(i, 1, 'white')
      pegWhite--;
      continue;
    }
  }
}

answerBtn.onclick = () => {
  if (counter > 9) {
    alert('dupka! przegrane!');
    answerPeg[0].classList.remove('hidden');
  }
  changePegs();
  hiddenRow();
  if (mixingFlag) {
    mixing();
    mixingFlag = false;
  }
  count();
  showPegs();
  changePegsAnswer();
};