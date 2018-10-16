$(document).ready(function(){


let arr = [1,2,3,4,5,6,7,8,9]

function removePick(numIndex, arrLength) {
    if (numIndex-1 > -1) arr.splice(numIndex-1, 1);
    if (arr.length < arrLength) return true;
}



$("#9").click(function(e){
  let id = e.currentTarget.id;
  console.log(id);
  $(this).addClass("clickedRed");
  let pick = removePick(id, arr.length);
  console.log(arr, pick)
});
//
// $("#2").click(function(e){
//   let id = e.currentTarget.id;
//   console.log(id);
//   $(this).addClass("clickedRed");
//   let pick = removePick(id, arr.length);
//   console.log(arr, pick)
// });

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

    //click on an available square
    // while(true){
    //
    //   console.log('3. pick square');
    //
    //   let result;
    //
    //   //check to see if the sqaure with is free. remove from array if true
    //   // function removePick(numIndex, arrLength) {
    //   //     if (numIndex > -1) numbers.splice(numIndex, 1);
    //   //     if (numbers.length < arrLength) return true;
    //   // }
    //
    //   $("*").click(function(e){
    //     console.log('3[a] Click a square');
    //     let numebrsLength = numbers.length;
    //     let index = numbers.indexOf(e.currentTarget.id);
    //     result = removePick(index, numbersLength);
    //     console.log('3[b]. removePick:', result);
    //   });
    //
    //   if(result){
    //     id = e.currentTarget.id;
    //     console.log('4. square picked');
    //     break;
    //   }
    // }//while true


    // $("*").click(function(e){
    //
    // });



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

  select(number){
    this.selected.push(number)
  }

  switch(){
    this.turn =! this.turn
  }

  checkWin(){
    let result = false;

    //winning sequences
    const winnings = [ [1,2,3], [4,5,6], [7,8,9], [7,4,1], [8,5,2], [9,6,3], [7,5,3], [1,5,9] ];

    //loop over sequences, loop into each sequence and check
    for (seq of winnings) {
      //hold true if match, will be reset each loop
      let res = [];

      for (each of seq){
      	if(each == selected[0] || each == selected[1] || each == selected[2]){
      		res.push(true)
      	}
      }

      //at end of sequence loop check if 3 match
      if (res.length == 3) result = true;
    }

    // change this.won status
    if(result = true){
      this.won = true;
    }
  }//checkWin
}//player class
