//player click
function playerClick(player, number){
  const id = '#'+number;
  let playerClass;

  if (player == 0){
    playerClass = "clickedRed";
  } else {
    playerClass = "clickedGreen";
  }

  $(id).click(function(){
    $(this).addClass(playerClass);
  })
}
// playerClick(1,'two');


$(document).ready(function(){
  // $("#one").click(playerClick(1, 'one'));
});

class Player {
  constructor(turn) {
    this.turn = turn,
    this.selected = [],
    this.won = false
    //add symbol 0=o 1=x
  }

  switch(){
    this.turn = !this.turn;
  }
}

let player1 = new Player(true);
let player2 = new Player(false);

console.log(player1.turn);
