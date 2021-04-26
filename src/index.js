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
    const tbody = [];

    for(let i=0; i< y; i++){
      const row = [];
      for (let j = 0; j < x; j++){
        let num = i * x + j
        this.props.figure === num
        ? row.push(<td className = {`block-type-${this.props.color}`}></td>)
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
      currentBlock: { //今のブロック
        figure: null,  //スタート座標
        color: null,   //色
      },
      nextBlock: {    //次落ちる予定のブロック
        figure: null,
        color: null,
      },
      histories: [{　　//履歴
        board: Array(maxNum).fill(null)
      }],
    }
  }


  // 落とす関数（y軸をズラす）
  fallblock() {
    const history = this.state.histories;
    const current = history[history.length - 1];
    const board = current.board
    const figure = this.state.currentBlock.figure
    
    //最下層、又は下に色がある時、Fix
    if((figure < maxNum && maxNum - 7 < figure)　|| (board[figure + x] !== null)){
      console.log(figure)
      this.fixblock()
      console.log(figure)
      this.setState({
        currentBlock: {
          figure: null,
          color: "next",
        }
      })
    }else {
      this.setState({
        currentBlock: {
          figure : figure + x,
          color : this.state.currentBlock.color,
        },
      })
    }
  }
  
  fixblock() {
    const history = this.state.histories;
    const current = history[history.length - 1];
    const board = current.board
    const figure = this.state.currentBlock.figure
    const color = this.state.currentBlock.color
    
    console.log(figure)
    console.log(color)
    board[figure] = color

    console.log(board)

    this.setState({
      histories: history.concat([{
        board: board
      }]),
    })
  }
  
  mainloop(){
    if(this.state.currentBlock.color === null){
      this.setState({
        currentBlock: {
          figure: 3 -x,   //スタート位置はマイナスから
          color: "blue",
        },
        nextBlock: {
          figure: 2- x,   //スタート位置はマイナスから
          color: "green",
        },
      })
    }else if(this.state.currentBlock.color === "next"){
      this.setState({
        currentBlock: this.state.nextBlock,
      })

    }
    this.fallblock()
    
    setTimeout(this.mainloop.bind(this), 500)
  }
  
  startGame(){
    this.mainloop()
  }

  componentDidMount() {
    this.startGame();
  }



  render() {
    const history = this.state.histories;
    const current = history[history.length - 1];
    // 1秒ごとにfallblock関数をする

    return(
      <Board
        board = {current.board}
        color ={this.state.currentBlock.color}
        figure = {this.state.currentBlock.figure}
      />
    )
  }
}

ReactDOM.render(
  <Tetris />,
  document.getElementById('root')
)
