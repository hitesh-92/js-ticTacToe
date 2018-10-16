$(document).ready(function(){

  $( "#nine" ).bind( "click", function( event ) {
    console.log(event)
    console.log(event.currentTarget.id)
  });

});//doc ready

class Player {
  constructor(turn, symbol) {
    this.turn = turn;
    this.symbol = symbol,
    this.selected = ['one','two','three'],
    this.won = false
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
      if (res.length == 3) result = true;
    }

  }

}//player class
