let TicTacToe = function(){
	let currentPlayer='X';
	let deck =  new Array(8); 
	let counter = [] ;
	let totalCount = 0 ;
	let bingo = false ;

	function init() {
		// body...
		deck=new Array(8);
		currentPlayer = 'X' ;
		bingo = false ;
		for (let i = 7; i >= 0; i--) {
			deck[i] = new Array(8);
			for (let j = 7 ; j >= 0; j--) {
				deck[i][j]='-';
			}
			counter[i]=0;
		}
	};

	function print() {
		// body...
		console.log(deck);
		console.log(currentPlayer);
		console.log(counter);
	};

	function currentStatus(){
		return [currentPlayer, deck, bingo];
	}

	function switchPlayer() {
		// body...
		if(currentPlayer === 'X')
			currentPlayer = '0' ;
		else
			currentPlayer = 'X' ;
	};

	function playATurn ( column ) {
		// body...
		if ( counter[column] < 8 ){
			var row = 7 - counter[column];
			deck[row][column] = currentPlayer;
			counter[column]++;
			totalCount++;
			return row + '' + column;
		}
		else	
			return -1;
	};

	function checkBingo ( coords , player )
	{
		var row = Number(coords[0]);
		var column = Number(coords[1]);
		// console.log(row, column, deck[row]);
		if( totalCount < 6 )
			return false ;
		// console.log("Inside checkBingo row " +row+ " column "+column);

		if( row < 5 && deck[row+1][column] === player ){
			verticalStatus = checkVertical(row,column,player);
			if(verticalStatus){
				bingo = true;
				return true ;
			}
		}
		if( ( column > 0 && deck[row][column-1] === player ) || ( column < 7 && deck[row][column+1] === player ) ){
			horizontalStatus = checkHorizontal(row,column,player);
			if(horizontalStatus){
				bingo = true;
				return true ;
			}
		} 
		diagonalStatus = checkDiagonal(row,column,player);
		bingo = diagonalStatus;
		return diagonalStatus;
	}

	function checkHorizontal( row ,  column ,  player ){
		var firstElement = column - 3 < 0 ? 0 : column - 3 ;
		var lastElement = column + 3 > 7 ? 7 : column + 3 ;
		for (var i = firstElement ; i <= lastElement-3; i++) {
			//console.log("\n"+deck[row][i] +":::"+ deck[row][i+1] +":::"+ deck[row][i+2] +":::"+ deck[row][i+3]);
			if ( deck[row][i] == player && deck[row][i+1] == player && deck[row][i+2] == player && deck[row][i+3] == player ){
				return true;
			}
		}
		return false;
	}

	function checkVertical( row ,  column ,  player ){
		if ( deck[row][column] == player && deck[row+1][column] == player && deck[row+2][column] == player && deck[row+3][column] == player ){
			return true;
		}
		return false;
	}

	function checkDiagonal( row ,  column ,  player ) {
		// console.log("checkDiagonal for " + player);
		var bottom = row + 3 > 7 ? 7 : row + 3;
		var top = row - 3 < 0 ? 0 : row - 3; 
		var left = column - 3 < 0 ? 0 : column - 3 ;
		var right = column + 3 > 7 ? 7 : column + 3 ;

		var topLeft = new Array(2);
		var topRight = new Array(2);
		var bottomLeft = new Array(2);
		var bottomRight = new Array(2);

		var diff1 = row - top;
		var diff2 = column - left; 
		var diff3 = bottom - row ;
		var diff4 = right - column ;

		if ( diff1 < diff2 ){
			topLeft = [top,column - diff1] ;
		}else{
			topLeft = [row - diff2,left] ;
		}
		
		if ( diff1 < diff4 ){
			topRight = [top,column + diff1] ;
		}else{
			topRight = [row - diff4,right] ;
		}

		if ( diff3 < diff2 ){
			bottomLeft = [bottom,column - diff3] ;
		}else{
			bottomLeft = [row + diff2,left] ;
		}

		if ( diff3 < diff4 ){
			bottomRight = [bottom,column + diff3] ;
		}else{
			bottomRight = [row + diff4,right] ;
		}

		return ( checkDiagonal1(topLeft,bottomRight,player) || checkDiagonal2(topRight,bottomLeft,player) );
	};

	function checkDiagonal1(start,end,player){
		var startX=start[0];
		var startY=start[1];
		var endX=end[0];
		var endY=end[1];

		for (var i = startX , j = startY; i <= endX-3 && j <= endY-3; i++,j++) {
			var pilotX=i;
			var pilotY=j;
			if ( deck[pilotX][pilotY] == player && deck[pilotX+1][pilotY+1] == player && deck[pilotX+2][pilotY+2] == player && deck[pilotX+3][pilotY+3] == player ){
				return true;
			}
		}

		return false ;
	};

	function checkDiagonal2(start,end,player){
		var startX=start[0];
		var startY=start[1];
		var endX=end[0];
		var endY=end[1];

		for (var i = startX , j = startY; i <= endX-3 && j >= endY+3; i++,j--) {
			var pilotX=i;
			var pilotY=j;
			if ( deck[pilotX][pilotY] == player && deck[pilotX+1][pilotY-1] == player && deck[pilotX+2][pilotY-2] == player && deck[pilotX+3][pilotY-3] == player ){
				return true ;
			}
		}
		return false ;
	};

	init();

	return {
		init : init,
		playATurn : playATurn,
		checkBingo : checkBingo,
		currentStatus : currentStatus,
		switchPlayer : switchPlayer
	}
};

module.exports = TicTacToe();