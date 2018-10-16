$(document).ready(function(){
  // let res = startGame();
  var player1 = new Player(true, 'X');
  var player2 = new Player(false, 'O');

  var numbers = [1,2,3,4,5,6,7,8,9]


  for (num of numbers) {


    $(`#${num}`).click(function(e){

      function removePick(numIndex, arrLength) {
          if (numIndex > -1) numbers.splice(numIndex, 1);
          if (numbers.length < arrLength) return true;
      }


      if(player1.turn){

        $(this).addClass("clickedRed");
        player1.turn = false;
        player2.turn = true;
        let index = numbers.indexOf(parseInt(e.currentTarget.id));
        let numArrLen = numbers.length;
        let pick = removePick(index, numArrLen);

      } else {

        $(this).addClass("clickedGreen");
        player1.turn = true;
        player2.turn = false;
        let index = numbers.indexOf(parseInt(e.currentTarget.id));
        let numArrLen = numbers.length;
        let pick = removePick(index, numArrLen);
      }



    }) // .click

  }


});//doc ready



class Player {
  constructor(turn, symbol) {
    this.turn = turn;
    this.symbol = symbol,
    this.selected = [],
    this.won = false
  }

  //add num and switch
  select(number){
    this.selected.push(number);
    this.turn = !this.turn
  }

  checkWin(){
    let result = false;

    //winning sequences
    const winnings = [ [1,2,3], [4,5,6], [7,8,9], [7,4,1], [8,5,2], [9,6,3], [7,5,3], [1,5,9] ];

    for (var seq = 0; seq < winnings.length; seq++) {
      // winnings[seq]
      let res = [];
      for (var each = 0; each < seq.length; e++) {
        // winnings[seq][each]
        for (var i = 0; i < this.selected; i++) {
          if(this.selected[i] == winnings[seq][each]) res.push(true)
        }
      }
      if(res.length==3) result = true;
    }


    // change this.won status
    if(result = true){
      this.won = true;
    }
  }//checkWin
}//player class
