$(document).ready(function(){

  $(".container").hide();

  $("#init-btn").click(function(){

    $(this).fadeOut(500);
    $(".container").fadeIn(1000);
    $("#winMessaege").fadeOut()

    //init players
    var player1 = new Player(true, 'X');
    var player2 = new Player(false, 'O');

    console.log('* INIT *',player1,player2);

    //array holds numers
    var numbers = [1,2,3,4,5,6,7,8,9]
    console.log('init',numbers);

    for (num of numbers) {
      $(`#${num}`).removeClass("clickedGreen");
      $(`#${num}`).removeClass("clickedRed");

      $(`#${num}`).click(function(e){

        function removePick(numIndex, arrLength, mainArray) {
            if (numIndex > -1) mainArray.splice(numIndex, 1);
            if (mainArray.length < arrLength) return mainArray;
        }


        if(player1.turn){ //  * PLAYER 1 *

          $(this).addClass("clickedRed");
          // let id = parseInt(e.currentTarget.id);

          let picked = player1.removeNumber(e.currentTarget.id, true);
          if(picked) player2.removeNumber(id, false);



          //check for tie ( only needed for player1 ) CHECK AFTER checkWin
          // if(this.player1.numbers.length == 0){
          //   player1.reset()
          //   player2.reset()
          //   player1.turn = true;
          //   $("#winMessaege").html("<i>TIE!</i>")
          //   $("#winMessaege").fadeIn()
          //   $(".container").fadeOut()
          //   $("#init-btn").fadeIn()
          // }

          let check = player1.checkWin();
          // console.log(player1.won);

          // if (player1.won){
          //   console.log('p1 win');
          //   $("#winMessaege").html("<i>Player1 has won!</i>")
          //   $("#winMessaege").fadeIn()
          //   $(".container").fadeOut()
          //
          //   $("#init-btn").fadeIn()
          //   player1.reset()
          //   player2.reset()
          //   player1.turn = true;
          // }


          // console.log('p1',numbers);

          //switch players
          player1.switch(); player2.switch();
        } else { // * PLAYER 2 *

          $(this).addClass("clickedGreen");
          let id = parseInt(e.currentTarget.id);      console.log('p2 id:', id);

          let picked = player2.removeNumber(e.currentTarget.id, true);
          if(picked) player1.removeNumber;

          player2.switch();
          player1.switch();

          // TIE CHECK
          // if(numbers.length == 0){
          //   player1.reset()
          //   player2.reset()
          //   player1.turn = true;
          //   $("#winMessaege").html("<i>TIE!</i>")
          //   $("#winMessaege").fadeIn()
          //   $(".container").fadeOut()
          //   $("#init-btn").fadeIn()
          // }

          // console.log(player2.selected);

          let check = player2.checkWin();

          // if (player2.won){
          //   $("#winMessaege").html("<i>Player2 has won!</i>")
          //   $("#winMessaege").fadeIn()
          //   console.log('p2 win');
          //   $(".container").fadeOut()
          //
          //   $("#init-btn").fadeIn()
          //   player1.reset()
          //   player2.reset()
          //   player1.turn = true;
          // }

          //switch players
          player1.switch(); player2.switch();
        }

      }) // .click
    } //for num
  });
});//doc ready


class Player {
  constructor(turn, symbol) {
    this.turn = turn;
    this.symbol = symbol,
    this.selected = [],
    // this.won = false,
    this.numbers = [1,2,3,4,5,6,7,8,9]
  }

  switch(){
    this.turn = !this.turn;
  }

  reset(){
    this.turn = false;
    this.selected = [];
    this.numbers = [1,2,3,4,5,6,7,8,9];
    // this.won = false;
  }

  getLength(){
    return this.numbers.length;
  }

  removeNumber(number, isPlayer){
    const num = parseInt(number);

    function removePick(num) {
      let initNumbersLength = this.numbers.length;
      let index = this.numbers.indexOf(num);

      if (index > -1) this.numbers.splice(index, 1);
      if (this.numbers.length < initArrLength) return true;
      return false;
    }

    if(!isPlayer){
      let pick = removePick(num)
      return pick;
    }

    if( typeof(index) == 'number' ){

      let pick = removePick(num);
      if (pick){
        this.selected.push(num);
        return true;
      }

    } else {

      return false;

    }






  }

  checkWin(){
    let result = false;

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
          result = true;
        }
      }
    }

    // change this.won status
    // if(result) this.won = true;
    return result;
  }//checkWin
}//player class
