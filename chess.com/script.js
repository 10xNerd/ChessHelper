//chess logic import not working
//import *  as logic from '../cprocess/logic.js'

document.body.style.border = "2px solid red";

var pieces = new Array;
var prev_pieces = new Array;

var highlight_pieces = new Array;

var chbrd = document.getElementById('board-board');
var chbrd_elements = new Array;

var player_color;

function init(){

    console.log("Extension in init()");
    //change based on which specific game played, vs player, bot, or analysis
    //the below code will make you want to kys, read with caution ⚠
    if(chbrd == null){
        console.log("board is not class board-board");
        chbrd = document.getElementById("board-analysis-board");
        //If board is vs personality bots
        if(chbrd == null){
            chbrd = document.getElementById("board-vs-personalities");
            if(chbrd == null){
                chbrd = document.getElementById('board-solo-board');
                if(chbrd == null){
                    //WHY SO MANY BOARD TYPES LMAO
                    chbrd = document.getElementById('board-single');
                    if(chbrd == null){
                        console.log("Can't find a board!!");
                        return 0;
                    }
                }
            }
        }
    } 

    chbrd_elements = chbrd.getElementsByTagName('div');

    //check which side player is using board-flipped class
    if(document.getElementsByClassName('board-flipped')[0] == null)player_color = 'w'
    else player_color = 'b';

    getPieces();
    logic();
    render();

    console.log("board used: " + chbrd.className);
    console.log("number of elements in board class:" + chbrd_elements.length);
    console.log("number of pieces starting on board: " + pieces.length);
    console.log("player is color:" + player_color)
    

   

    if(chbrd_elements.length == 0 && pieces.length == 0){
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
    for(let i = 0; i < chbrd_elements.length; i++){
        let pre = chbrd_elements[i].className;
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
        chbrd.insertBefore(highlight,chbrd_elements[0]);    
    }
}
function clear(){
    //clear all highlighting
    //go backwards to clear ALL at once
    for(let i = chbrd_elements.length - 1; i >= 0;i--){
        if(chbrd_elements[i].className.includes("highlight")){
            chbrd_elements[i].remove();
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

