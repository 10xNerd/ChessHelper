
//just highlight all pieces so far
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