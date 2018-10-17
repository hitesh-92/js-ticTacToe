$(document).ready(function(){

  $(".container").hide();

  $("#init-btn").click(function(){
    $(this).fadeOut(500);
    $(".container").fadeIn(1000);
    $("#winMessaege").fadeOut()

    //init players
    var player1 = new Player(true, 'X');
    var player2 = new Player(false, 'O');

    //array holds numers
    var numbers = [1,2,3,4,5,6,7,8,9]

    for (num of numbers) {
      $(`#${num}`).removeClass("clickedGreen");
      $(`#${num}`).removeClass("clickedRed");

      $(`#${num}`).click(function(e){

        function removePick(numIndex, arrLength) {
            if (numIndex > -1) numbers.splice(numIndex, 1);
            if (numbers.length < arrLength) return true;
        }

        if(player1.turn){

          $(this).addClass("clickedRed");
          let id = parseInt(e.currentTarget.id);
          let index = numbers.indexOf(id);
          let numArrLen = numbers.length;
          let pick = removePick(index, numArrLen);
          player1.select(id);
          player1.switch();
          player2.switch();
          // console.log(player1.selected);
          player1.checkWin()
          // console.log(player1.won);
          if (player1.won){
            console.log('p1 win');
            $("#winMessaege").html("<i>Player1 has won!</i>")
            $("#winMessaege").fadeIn()
            $(".container").fadeOut()

            $("#init-btn").fadeIn()
            player1.reset()
            player2.reset()
            player1.turn = true;
          }
        } else {

          $(this).addClass("clickedGreen");
          let id = parseInt(e.currentTarget.id);
          let index = numbers.indexOf(id);
          let numArrLen = numbers.length;
          let pick = removePick(index, numArrLen);
          player2.select(id);
          player2.switch();
          player1.switch();
          // console.log(player2.selected);
          player2.checkWin()
          // console.log(player2.won);
          if (player2.won){
            $("#winMessaege").html("<i>Player2 has won!</i>")
            $("#winMessaege").fadeIn()
            console.log('p2 win');
            $(".container").fadeOut()

            $("#init-btn").fadeIn()
            player1.reset()
            player2.reset()
            player1.turn = true;
          }
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
    this.won = false
  }

  switch(){
    this.turn = !this.turn;
  }

  select(number){
    this.selected.push(number);
  }

  reset(){
    this.turn = false;
    this.selected = [];
    this.won = false;
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
    if(result) this.won = true;
  }//checkWin
}//player class
