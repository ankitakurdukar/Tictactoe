var express = require("express");
var app = express();
const path = require('path');
var game = require('./scripts/TicTacToe');
app.listen(3000);
console.log('Express server listening on port 3000');

app.set('views', path.join(__dirname, 'views'));
app.set ( 'view engine', 'pug' );

app.get('/', function (req, res, next) {
    var deckStatus = game.currentStatus();
    res.render('homepage', {player: deckStatus[0], deck: JSON.stringify(deckStatus[1]), bingo: deckStatus[2] });
});

app.get('/checkTurn', function (req, res, next) {
    var column = req.query.column;
    var ballCoordinates = game.playATurn(column);
    var currentStatus = game.currentStatus();
    
    if (ballCoordinates == -1) { // TODO : in pug
        console.log('This column is full.. Try again..!');
        return;
    }

    var player = currentStatus[0];
    
    if (game.checkBingo(ballCoordinates, player)) {
        setTimeout(() => {
            console.log('Player ' + player + ' wins...!');
            game.init();
        }, 10);
    }else{
        game.switchPlayer();
    }
});