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
  const row2 = streak(board, [1, 0], [1, 1], [1, 2]);
  const row3 = streak(board, [2, 0], [2, 1], [2, 2]);
  const col1 = streak(board, [0, 0], [1, 0], [2, 0]);
  const col2 = streak(board, [0, 1], [1, 1], [2, 1]);
  const col3 = streak(board, [0, 2], [1, 2], [2, 2]);

  const diagDown = streak(board, [0, 0], [1, 1], [2, 2]);
  const diagUp = streak(board, [2, 0], [1, 1], [0, 2]);
};

export default function reducer(state = { board: Map(), turn: "X" }, action) {
  // TODO
  if (action.type === MOVE && action.turn === "X") {
    //set turn to O and write position to board
    return {
      board: state.board.setIn(action.position, action.turn),
      turn: "O"
    };
  } else if (action.type === MOVE && action.turn === "O") {
    //set turn to X and write position to board
    return {
      board: state.board.setIn(action.position, action.turn),
      turn: "X"
    };
  }
  return state;
}
