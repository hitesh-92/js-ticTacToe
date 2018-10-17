$(document).ready(function(){

  $(".container").hide();

  $("#init-btn").click(function(){

    $(this).fadeOut(500);
    $(".container").fadeIn(1000);
    $("#message").fadeOut()

    //init players
    var player1 = new Player(true, 'X');
    var player2 = new Player(false, 'O');

    // console.log('* INIT *',player1,player2);

    for (var num = 1; num <= 9; num++) {
      $(`#${num}`).removeClass("clickedGreen");
      $(`#${num}`).removeClass("clickedRed");

      $(`#${num}`).click(function(e){

        if(player1.turn){ //  * PLAYER 1 *

          let message = true;

          //removeNumber deletes pick from array
          let picked = player1.removeNumber(e.currentTarget.id, true);

          //if successful deletes from player2's array + color square
          if(picked) {
            player2.removeNumber(id, false);
            $(this).addClass("clickedRed");
          }

          //length of array, if 9 all moves made
          let count = player1.getLength();

          //tie and win message. message no longer true, will end game
          if(count == 9 && player1.won == false){
            message = "Tie Break! No Winner This Time!"
          } else if (player1.won) {
            message = "Player1 Has Won!!";
            // console.log(message);
          }

          //end game
          if(!message){
            $("#message").text(message).fadeIn();
            $(".container").fadeOut();
            $("#init-btn").fadeIn();
            player1.reset(true); player2.reset();
          }

          //switch players, continue game
          player1.switch(); player2.switch();

          console.log('player1', '| picked',picked, '| count',count);


        } else { // * PLAYER 2 *

          let message = true;
          $(this).addClass("clickedGreen");
          let picked = player2.removeNumber(e.currentTarget.id, true);
          if(picked) player1.removeNumber(id, false);
          let check = player2.checkWin();
          let count = player2.getLength();
          if(count == 9 && !check){
            message = "Tie Break! No Winner This Time!"
          } else if (check) {
            message = "Player1 Has Won!!"
          }
          if(!message){
            $("#message").text(message).fadeIn();
            $(".container").fadeOut();
            $("#init-btn").fadeIn();
            player1.reset(true); player2.reset();
          }
          player1.switch(); player2.switch();

        }// end player2
      }) // .click
    } //for num
  });
});//doc ready


class Player {
  constructor(turn, symbol) {
    this.turn = turn;
    this.symbol = symbol,
    this.selected = [],
    this.won = false,
    this.numbers = [1,2,3,4,5,6,7,8,9]
  }

  switch(){
    this.turn = !this.turn;
  }

  reset(player1){
    this.turn = false;
    if(player1) this.turn = true;
    this.selected = [];
    this.numbers = [1,2,3,4,5,6,7,8,9];
    this.won = false;
  }

  getLength(){
    return this.numbers.length;
  }

  removeNumber(id, isPlayer){

    let num = parseInt(id);
    let run = false;

    if(!isPlayer) run = true;

    if(!run){
      //run loop to check if id number is in array
      for (var i = 0; i < this.numbers.length; i++){
        if (i == num) {
          run = true;
        } else {
          return false;
        }
      }
    }

    //if found remove+add to selected. if not return false
    if(run){
      let index = this.numbers.indexOf(num);
      this.numbers.splice(index,1);
      this.selected.push(num)
      return true;
    } else {
      return false;
    }

  }

  checkWin(){
    // let result = false;

    //winning sequences
    const winSequences = [ [1,2,3], [4,5,6], [7,8,9], [7,4,1], [8,5,2], [9,6,3], [7,5,3], [1,5,9] ];

    //loop through winSequences
    for (var seq = 0; seq < winSequences.length; seq++) {
      let count = 0;

      //loop through individual sequence
      for (var each = 0; each < winSequences[seq].length; each++) {

        //loop through player picks, this.seleted
        for( var pick = 0; pick < this.selected.length; pick++ ){
          //if pick and each match increment count
          if(this.selected[pick] == winSequences[seq][each]){
            count++;
          }
        }

        //check if 3 matches made
        if (count == 3){
          // result = true;
          this.won = true;
        }
      }
    }

    // change this.won status
    // if(result) this.won = true;
  }//checkWin
}//player class
