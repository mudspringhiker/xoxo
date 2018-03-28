import {Map} from 'immutable'

const initialState = {
  board: Map(),
  turn: "X"
}

const MOVE = 'move'
//                                                         [1,0]
export const move =(turn, position) => ({ type: MOVE, turn, position })

export default function reducer(state = { board: Map(), turn: "X" }, action) {
  // TODO
  if (action.type === MOVE && action.turn === 'X') {
    //set turn to O and write position to board
    return { board: state.board.setIn(action.position, action.turn), turn: 'O' }

  } else if (action.type === MOVE && action.turn === 'O') {
    //set turn to X and write position to board
    return { board: state.board.setIn(action.position, action.turn), turn: 'X'}

  }
  return state
}