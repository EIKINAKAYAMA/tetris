import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// const blocks = [
//   {blue: [2,3,4,16,17,18]},
//   {red: [3,4,17,18]}
// ]

const x = 7;
const y = 7;
const maxNum = x*y

function Square(props) {
  return (
    <td className = {`block-type-${props.name}`}></td>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderSquare(i){
    return <Square name = {this.props.board[i]} />
  }

  //ここでBordのNumにも色をつける。
  render() {
    console.log(this.props.board)
    const tbody = [];

    for(let i=0; i< y; i++){
      const row = [];
      for (let j = 0; j < x; j++){
        let num = i * x + j
        this.props.figure === num
        ? row.push(<td class = {`block-type-${this.props.color}`}></td>)
        : row.push(this.renderSquare(num));
      }
      tbody.push(<tr className = {`table-row`}>{row}</tr>)
    }

    return (
      <table className="board-table">
        <tbody>
          { tbody }
        </tbody>
      </table>
    )
  }
}

class Tetris extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      figure : 3,
      color: "blue",
      histories: [{
        board: Array(maxNum).fill(null)
      }],
    }
  }


  // 落とす関数（y軸をズラす）
  fallblock() {
    const history = this.state.histories;
    const current = history[history.length - 1];
    const board = current.board

    this.setState({
      figure : this.state.figure + x,
    })
    console.log(this.state.figure)
    if(this.state.figure < maxNum && maxNum - 7 < this.state.figure){
      this.fixblock()
    }
  }
  
  fixblock() {
    const history = this.state.histories;
    const current = history[history.length - 1];
    const board = current.board
    
    board[this.state.figure] = this.state.color

    this.setState({
      histories: history.concat([{
        board: board
      }]),
    })

    console.log(this.state.histories)
  }
  
  mainloop(){

    setTimeout(this.fallblock.bind(this), 1000)
  }
  
  startGame(){
    this.mainloop()
  }


  render() {
    const history = this.state.histories;
    const current = history[history.length - 1];
    // 1秒ごとにfallblock関数をする

    this.startGame()

    return(
      <Board
        board = {current.board}
        color ={this.state.color}
        figure = {this.state.figure}
      />
    )
  }
}

ReactDOM.render(
  <Tetris />,
  document.getElementById('root')
)
