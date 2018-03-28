import { Map } from "immutable";

const initialState = {
  board: Map(),
  turn: "X"
};

const MOVE = "move";
//                                                         [1,0]
export const move = (turn, position) => ({ type: MOVE, turn, position });

//                     board, firstcoord, [ coord, coord, coord ]
export const streak = (board, firstCoords, ...coords) => {
  const player = board.getIn(firstCoords);
  if (player === "_") return false;
  for (let i = 0; i < coords.length; i++) {
    const currPosition = coords[i];
    if (board.getIn(currPosition) !== player) {
      return false;
    }
  }
  return player;
};

export const winner = board => {
  const row1 = streak(board, [0, 0], [0, 1], [0, 2]);
  if (row1) return row1;

  const row2 = streak(board, [1, 0], [1, 1], [1, 2]);
  if (row2) return row2;

  const row3 = streak(board, [2, 0], [2, 1], [2, 2]);
  if (row3) return row3;

  const col1 = streak(board, [0, 0], [1, 0], [2, 0]);
  if (col1) return col1;

  const col2 = streak(board, [0, 1], [1, 1], [2, 1]);
  if (col2) return col2;

  const col3 = streak(board, [0, 2], [1, 2], [2, 2]);
  if (col3) return col3;

  const diagDown = streak(board, [0, 0], [1, 1], [2, 2]);
  if (diagDown) return diagDown;

  const diagUp = streak(board, [2, 0], [1, 1], [0, 2]);
  if (diagUp) return diagUp;
};

//Alternates turn from X and O and returns X or O
const turnReducer = (turn = "X", action) => {
  if (action.type === MOVE) {
    if (turn === "X") {
      turn = "O";
    } else {
      turn = "X";
    }
  }
  return turn;
};

const boardReducer = (board = Map(), action) => {
  if (action.type === MOVE) board = board.setIn(action.position, action.turn);
  return board;
};

const bad = (state, action) => {
  if (action.type === MOVE) {
    const newPosition = action.position;
    console.log(newPosition);
    console.log(state.board);
    const currentChar = state.board.getIn(newPosition);
    console.log(currentChar);
    if (currentChar !== "_") {
      return "This position is already taken or invalid.";
    }
  }
  return null;
};

const combinedReducer = (state = initialState, action) => {
  const error = bad(state, action);
  if (error) {
    console.log(error);
    return state /* Object.assign({}, state, error) */;
  }
  const nextBoard = boardReducer(state.board, action);
  const winnerState = winner(nextBoard);
  return {
    board: nextBoard,
    turn: turnReducer(state.turn, action),
    winner: winnerState
  };
};

export default combinedReducer;

// export function reducer(state = { board: Map(), turn: "X" }, action) {
//   // TODO
//   if (action.type === MOVE && action.turn === "X") {
//     //set turn to O and write position to board
//     return {
//       board: state.board.setIn(action.position, action.turn),
//       turn: "O"
//     };
//   } else if (action.type === MOVE && action.turn === "O") {
//     //set turn to X and write position to board
//     return {
//       board: state.board.setIn(action.position, action.turn),
//       turn: "X"
//     };
//   }
//   return state;
// }
