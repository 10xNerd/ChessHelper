document.body.style.border = "2px solid green";

//note: using inspect element makes it not work fsr, look into that

var pieces = new Array;
let first = true;

var board;
var board_elements;



function getPieces(){
   
    console.log("Extension has entered getPieces()");
    //read raw HTML
    board = document.getElementById("board-board");
    //change based on whether analysis board used
    if(typeof(board) == 'undefined' || board == null){
        board = document.getElementById("board-analysis-board")
    } 
    //IF board is bot
    if(typeof(board) == 'undefined' || board == null){
        board = document.getElementById("board-vs-personalities")
    } 
    board_elements = board.getElementsByTagName('div');

    console.log( "number of elements in board are:" + board_elements.length);
    for(let i = 0; i < board_elements.length; i++){
        let pre = board_elements[i].className;
        //filter out elements
        if(pre.includes("piece")){
            //filter out Chess.com boiler for easy use
            pre = pre.replace("piece ",'').replace("square-",'');
            //split pre into an array for characters
            let pre_array = pre.split("");
            pieces.push([pre_array[0],pre_array[1],pre_array[3],pre_array[4]]);
        }
    }
    
    
    
}
function update(){
    
    console.log("Extension has entered update()");

    // for(let i = 0; i < pieces.length; i++){
    //     //if piece = rook
    //     console.log(pieces[i][1]);
    //     if(pieces[i][1] == "r"){
    //         console.log("rook found!");
    //         var highlight = document.createElement('div');
    //         highlight.className = "highlight square-11" ;//+ pieces[i][2] + pieces[i][3];
    //         highlight.style = "background-color: rgb(25, 25, 0); opacity: 0.5;"

    //         console.log("highlight:"+ highlight.innerHTML);
    //         board.insertBefore(highlight,board_elements[0]);
    
    //     }
    //     continue;
    // }
    //

    for(let i = 0; i < pieces.length; i++){
        //if piece = rook
        if(pieces[i][1] == 'p'){
            console.log(pieces[i]);
            var highlight = document.createElement('div');
                        highlight.className = "highlight square-"+pieces[i][2] + pieces[i][3];//+ pieces[i][2] + pieces[i][3];
                        highlight.style = "background-color: rgb(0, 255, 0); opacity: 0.5;"
                        board.insertBefore(highlight,board_elements[0]);  
                      }
            // for(let j = 0; j < pieces.length; j++){
            //     //Check if pawn can kill
            //     if(pieces[j][3] == pieces[i][3] && (pieces[j][2] == pieces[i][2] + 1 || pieces[j][2] == pieces[i][2] - 1)){
            //         //if same side
            //         if(pieces[j][0] == pieces[i][0]){
            //             var highlight = document.createElement('div');
            //             highlight.className = "highlight square-"+pieces[j][2] + pieces[j][3] ;//+ pieces[i][2] + pieces[i][3];
            //             highlight.style = "background-color: rgb(255, 0, 0); opacity: 0.5;"
            //             board.insertBefore(highlight,board_elements[0]);
            //         }
            //         //if not
            //         else{
            //             var highlight = document.createElement('div');
            //             highlight.className = "highlight square-"+pieces[j][2] + pieces[j][3];//+ pieces[i][2] + pieces[i][3];
            //             highlight.style = "background-color: rgb(0, 255, 0); opacity: 0.5;"
            //             board.insertBefore(highlight,board_elements[0]);  
            //           }
            //     }
            // }
        
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function main(){
    
    sleep(1000);
    getPieces();
    update();
    
    
    
}
window.onload = main();
