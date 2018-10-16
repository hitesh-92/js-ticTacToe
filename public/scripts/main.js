$(document).ready(function(){
  // let res = startGame();
  player1 = new Player(true, 'X');
  player2 = new Player(false, 'O');

  var numbers = [1,2,3,4,5,6,7,8,9]

  for (num of numbers) {


    $(`#${num}`).click(function(e){
      function removePick(numIndex, arrLength) {
          if (numIndex > -1) numbers.splice(numIndex, 1);
          if (numbers.length < arrLength) return true;
      }


      // if(player1.turn){

        $(this).addClass("clickedRed");
        // let id = parseInt(e.currentTarget.id);
        let index = numbers.indexOf(parseInt(e.currentTarget.id));
        let numArrLen = numbers.length;
        let pick = removePick(index, numArrLen);

      // } else {

      // }


    }) // .click

  }


});//doc ready

//init game
function startGame(){
  console.log('1. init');

  p1 = new Player(true, 'X');
  p2 = new Player(false, 'O');

  let playing = true;
  while(playing){
    console.log('2. playing');
    let numbers = [1,2,3,4,5,6,7,8,9];
    let id;

    //remove number from array
    function removePick(numIndex, arrLength) {
        if (numIndex-1 > -1) numbers.splice(numIndex-1, 1);
        if (numbers.length < arrLength) return true;
    }

    //click on an available square

    for (num of numbers) {
      let divID = '#'+num;

      $(divID).click(function(e){
          let id = e.currentTarget.id;
          let pick = removePick(numbers.indexOf(id), numbers.length);
      })

    }




    console.log('5. end of while loops');



    //add pick, checkWin &|&| switch : return
    if(p1.turn){
      console.log('6. p1 calc');
      p1.select(id);
      p1.checkWin();
      if(p1.checkWin) return true;
      p1.switch()
    } else {
      console.log('6. p2 calc');
      p2.select(id);
      p2.checkWin();
      if(p2.checkWin) return false;
      p2.switch();
    }


    playing = false;


  }//while (playing)
}//startGame




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
