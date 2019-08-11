let door1 = document.body.getElementsByClassName("door1");
let door2 = document.body.getElementsByClassName("door2");
let door3 = document.body.getElementsByClassName("door3");
let door__all = [door1,door2,door3];
let tried;
var win1 = 0;
var index;
var table = document.body.getElementsByClassName("excel");
let result = document.body.getElementsByClassName("result");
let field = document.createElement("div");
result[0].appendChild(field);
field.classList.add("field");


for (let a = 1; a < 65; a++) {
  let excel = document.createElement("div");
  field.appendChild(excel);
  excel.classList.add("excel");
}


function start() {
  let index1 = Math.round(Math.random()*2);
  if (index == index1){
    start();
  } else {
    door__all[index1][0].classList.add("cash");
    console.log(index1)
    index = index1;
  }
  door__all[index][0].classList.add("cash");
}

function play(n){
  if (tried == true) {
    if (door__all[n][0].classList.contains("cash")) {
      door__all[n][0].classList.add("money");
      alert('Вы выиграли!!! Через 7 секунд игра обновится. Ничего не нажимайте!!!');
      setTimeout(all__win, 2000);
    } else {
      alert('Вы проиграли. Через две секунды игра обновится. Ничего не нажимайте!!!');
      all__loss();
    }
  } else {
    door__all[n][0].classList.add("click");
    tried = confirm("Ведущий: Я открою вам одну дверь, после этого вы можете изменить свой выбор!(Если вы хотите изменить свой выбор: нажмите ОК, если нет, нажмите: ОТМЕНА");
    if (tried == false) {
      if (door__all[n][0].classList.contains("cash")) {
        door__all[n][0].classList.add("money");
        alert('Вы выиграли!!! Через 7 секунд игра обновится. Ничего не нажимайте!!!');
        setTimeout(all__win, 2000);
      } else {
        alert('Вы проиграли. Через две секунды игра обновится. Ничего не нажимайте!!!');
        all__loss();
      }
    } else {
      for (let i = 0; i <= 2; i++) {
        if ((!door__all[i][0].classList.contains("click")) && (!door__all[i][0].classList.contains("cash"))) {
          door__all[i][0].style.background = "transparent";
          break;
        }
      }
      door__all[n][0].classList.remove("click");
    }
  }
}

function clearing() {
  for (let i = 0; i <= 2; i++){
    door__all[i][0].classList.remove("cash");
    door__all[i][0].classList.remove("click");
    door__all[i][0].classList.remove("money");
    door__all[i][0].removeAttribute("Style");
    tried = false;
  }
  setTimeout(start, 50);
}

function all__win() {
  win();
  clearing();
}

function all__loss() {
  loss();
  clearing();
}


function win() {
  if (win1 >= 64) {
    for (let i = 0; i < 64; i++){
      table[i].removeAttribute("Style");
    }
    win1 = 0;
  } else {
  table[win1].style.backgroundColor = "#2acf21";
  win1++;
  }
}

function loss() {
  if (win1 >= 64) {
    for (let i = 0; i < 64; i++){
      table[i].removeAttribute("Style");
    }
    win1 = 0;
  } else {
  table[win1].style.backgroundColor = "#eb0712";
  win1++;
  }
}

start();
