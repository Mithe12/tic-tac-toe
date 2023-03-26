import Cell from "./Cell";
import React from 'react';

const intialPayload = {
  cells: ["","","","","","","","",""],
  prevPlayer: "O",
  winner: null,
}

function reducer(state, action){

  switch (action.type){
    case 'update':
      return {
        ...state,
        prevPlayer: state.prevPlayer ==='X' ? 'O': 'X',
        cells: state.cells.map((c,i) => {
          if(action.id==i){
            return state.prevPlayer ==='X' ? 'O': 'X'
          } else {
            return c
          }
        })
      }
    case 'winner':
      return {
        ...state,
        winner: action.winner
      }
    default:
      throw new Error("Not Supported")
  }

}

function App() {

  const [state, dispatch] = React.useReducer(reducer,intialPayload);
  const updateCell = (id) => dispatch({type:'update',id})
  
  const checkScore =() => {
    const winningCombo = [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],]

    winningCombo.forEach(element => {
      let xWins = element.every(cell => state.cells[cell] === "X")
      if(xWins){
        dispatch({type: 'winner', winner: 'X'})
        return
      }
    });

    winningCombo.forEach(element => {
      let xWins = element.every(cell => state.cells[cell] === "O")
      if(xWins){
        dispatch({type: 'winner', winner: 'O'})
        return
      }
    });
  }
  React.useEffect(() => {
    checkScore()
  })


  return (
    <div className="app">
      <div className="gameboard">
        {state.cells.map((cell,index) =>(
          <Cell key= {index} value= {cell} id ={index} updateCell={updateCell} disable={state.winner === null? false : true}/>
        ))}
      </div>
      <p>{`Player : "${state.prevPlayer}" turn `}</p>
      Winner is {state.winner}
    </div>
  );
}

export default App;
