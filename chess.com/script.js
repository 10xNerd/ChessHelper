//chess logic import not working
//import *  as logic from '../cprocess/logic.js'

document.body.style.border = "2px solid red";

var pieces = new Array;
var prev_pieces = new Array;

var highlight_pieces = new Array;

var board = document.getElementById('board-board');
var board_elements = new Array;

var player_color;

function init(){

    console.log("Extension in init()");
    //change based on which specific game played, vs player, bot, or analysis
    //the below code will make you want to kys, read with caution ⚠
    if(typeof(board) == 'undefined' || board == null){
        console.log("board is not class board-board");
        board = document.getElementById("board-analysis-board");
        //If board is vs personality bots
        if(typeof(board) == 'undefined' || board == null){
            board = document.getElementById("board-vs-personalities");
            if(typeof(board) == 'undefined' || board == null){
                board = document.getElementById('board-solo-board');
                if(typeof(board) == 'undefined' || board == null){
                    //WHY SO MANY BOARD TYPES LMAO
                    board = document.getElementById('board-single');
                    if(typeof(board) == 'undefined' || board == null){
                        console.log("Can't find a board!!");
                        return 0;
                    }
                }
            }
        }
    } 

    board_elements = board.getElementsByTagName('div');

    //check which side player is using board-flipped class
    if(typeof(document.getElementsByClassName('board-flipped')[0]) == 'undefined')player_color = 'w'
    else player_color = 'b';

    getPieces();
    logic();
    render();

    console.log("board used: " + board.className);
    console.log("number of elements in board class:" + board_elements.length);
    console.log("number of pieces starting on board: " + pieces.length);
    console.log("player is color:" + player_color)
    

   

    if(board_elements.length == 0 && pieces.length == 0){
        console.log("Init unsuccessful! Reload to try again");
        return 0;
    }
    else{
        console.log("Init successful!");

    }
    
}
function getPieces(){
    //clear array
    pieces = [];
    for(let i = 0; i < board_elements.length; i++){
        let pre = board_elements[i].className;
        //filter out elements
        if(pre.includes("piece")){
            //split pre into an array for characters
            let pre_array = pre.split("");
            //piece br square-88 ---> [b,r,8,8]
            pieces.push([pre_array[6],pre_array[7],pre_array[16],pre_array[17]]);
        }
    }

    

}    

function render(){

    for(let i = 0; i < highlight_pieces.length;i++){
        var highlight = document.createElement('div');
        highlight.className = "highlight square-"+highlight_pieces[i][0] + highlight_pieces[i][1];//+ pieces[i][2] + pieces[i][3];
        highlight.style = "background-color: rgba(" + highlight_pieces[i][2] + ",25%);";
        board.insertBefore(highlight,board_elements[0]);    
    }
}
function clear(){
    //clear all highlighting
    //go backwards to clear ALL at once
    for(let i = board_elements.length - 1; i >= 0;i--){
        if(board_elements[i].className.includes("highlight")){
            board_elements[i].remove();
        }
    }
}
//function from cproccess/logic.js
function logic(){
    highlight_pieces = [];
    for(let i = 0; i < pieces.length; i++){
        if(pieces[i][0] === player_color){
            highlight_pieces.push([pieces[i][2],pieces[i][3], '0,255,0'])
        }
        else if(pieces[i][0] !== player_color){
            highlight_pieces.push([pieces[i][2],pieces[i][3], '255,0,0'])
        }
    }
    
}

window.addEventListener('DOMContentLoaded', init());
setInterval(function main(){

    prev_pieces = [...pieces];
    highlight_pieces = [];
    getPieces();
    //if a move has been made
    if(JSON.stringify(prev_pieces) !== JSON.stringify(pieces)){
        for(let i = 0; i < pieces.length; i++){
            console.log(pieces[i]);
        }
        console.log("A move has been made!!");
        logic();
        clear();
        render();
    }


}, 100);

