import *  as logic from '../cprocess/logic.js'

document.body.style.border = "2px solid blue";


var pieces = new Array;
var prev_pieces = new Array;

var highlight_pieces = new Array;

var board = document.getElementById('board-board');
var board_elements = new Array;

var player_color

function init(){
    let board_flipped = document.getElementsByClassName('board-flipped')[0]

    console.log("Extension in init()");
    //change based on whether analysis board used
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
    player_color = 'b'
    if(typeof(board_flipped) == 'undefined' || board_flipped == null)player_color = 'w'

    console.log("board used: " + board.className);
    console.log("number of elements in board class:" + board_elements.length);
    console.log("player is playing as:" + player_color)
    getPieces();

    if(board_elements.length == 0 && pieces.length == 0){
        console.log("Init unsuccessful! Reload to try again");
        return 0;
    }
    else{
        console.log("Init successful!");

    }
    
}
function getPieces(){
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
// function update(){
//     //note: for greater efficency, make an array of all locations to check and check at same time
//     for(let i = 0; i < pieces.length; i++){
//         switch(pieces[i][1]){
//             case 'p':
//                 for(let j = 0; j < pieces.length; j++){
//                 //check if pawn can attack
//                 if(1 == 1){
//                     //if same side
//                     if(pieces[j][0] == player_color){
//                         highlight_pieces.push([pieces[j][2],pieces[j][3],'rgb(255,0,0)']);
//                         // var highlight = document.createElement('div');
//                         // highlight.className = "highlight square-"+pieces[j][2] + pieces[j][3];//+ pieces[i][2] + pieces[i][3];
//                         // highlight.style = "background-color: rgb(0, 255, 0); opacity: 0.1;"
//                         // board.insertBefore(highlight,board_elements[0]);  
//                     }
//                     //if not
//                     else{
//                         highlight_pieces.push([pieces[j][2],pieces[j][3],'rgb(0,0,255)']);
//                         // var highlight = document.createElement('div');
//                         // highlight.className = "highlight square-"+pieces[j][2] + pieces[j][3];//+ pieces[i][2] + pieces[i][3];
//                         // highlight.style = "background-color: rgb(255, 0, 0); opacity: 0.5;"
//                         // board.insertBefore(highlight,board_elements[0]);  
//                     }
//                 }
//                 }
//                 break;

//         }

//     }
// }
function render(){
for(let i = 0; i < highlight_pieces.length;i++){
    var highlight = document.createElement('div');
    highlight.className = "highlight square-"+highlight_pieces[i][0] + highlight_pieces[i][1];//+ pieces[i][2] + pieces[i][3];
    highlight.style = "background-color: rgba(0, 128, 0,10%);";
    board.insertBefore(highlight,board_elements[0]);    
}
}
function clear(){
    let to_clear  = new Array
    for(let i = board_elements.length - 1; i >= 0;i--){
        if(board_elements[i].className.includes("highlight")){
            board_elements[i].remove();
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
        update();
        clear();
        render();
    }


}, 100);
