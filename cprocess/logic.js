
//just highlight all pieces so far
//Doesn't export, finding a workaround
var highlight_pieces = new Array
export function logic(board = new Array, player_color){
    highlight_pieces = [];
    for(let i = 0; i < board.length; i++){
        if(board[i][0] === player_color){
            highlight_pieces.push([board[i][2],board[i][3], '0,255,0'])
        }
        else if(board[i][0] !== player_color){
            highlight_pieces.push([board[i][2],board[i][3], '255,0,0'])
        }
    }
    return highlight_pieces;
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