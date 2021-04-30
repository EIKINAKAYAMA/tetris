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
    console.log(this.props.figures)

    for(let i=0; i< y; i++){
      const row = [];
      for (let j = 0; j < x; j++){
        let num = i * x + j
        this.props.figures.includes(num)
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
        figures: [],  //スタート座標
        color: null,   //色
      },
      nextBlock: {    //次落ちる予定のブロック
        figures: [],
        color: null,
      },
      histories: [{　　//履歴
        board: Array(maxNum).fill(null)
      }],
    }
    //キー操作が行われた時
    window.onkeydown = (e) => {
      if (this.state.currentBlock == null) {
        return;
      }

      if (e.key ==="ArrowLeft") {
        this.moveLeft();
      }else if (e.key === "ArrowUp") {
        console.log("rotate")
        // this.rotate();
      }else if (e.key === "ArrowRight") {
        this.moveRight();
      }else if (e.key === "ArrowDown") {
        this.fallblock();
      }
    }
  }

  //左に動かす
  moveLeft(){
    const history = this.state.histories;
    const current = history[history.length - 1];
    const board = current.board;
    const figures = this.state.currentBlock.figures.slice(0);

    //左が壁の場合は、return
    if(figures.find(f => f % x === 0) ){
      return;
    }

    // 既に色がついているブロックがある場合は固定。
    if(figures.find(f => board[f - 1] !== null)){
      return;
    }else{
      //通常時は左にズラすのみ。
      this.setState({
        currentBlock: {
          figures : figures.map(m => m = m - 1),
          color : this.state.currentBlock.color,
        }
      })
    }
  }

  //右に動かす
  moveRight(){
    const history = this.state.histories;
    const current = history[history.length - 1];
    const board = current.board;
    const figures = this.state.currentBlock.figures.slice(0);

    //左が壁の場合は、return
    if(figures.find(f => f % x === x - 1) ){
      return;
    }

    // 既に色がついているブロックがある場合は固定。
    if(figures.find(f => board[f + 1] !== null)){
      return;
    }else{
      //通常時は左にズラすのみ。
      this.setState({
        currentBlock: {
          figures : figures.map(m => m = m + 1),
          color : this.state.currentBlock.color,
        }
      })
    }
  }


  // 落とす関数（y軸をズラす）
  fallblock() {
    const history = this.state.histories;
    const current = history[history.length - 1];
    const board = current.board;

    //状態として保持していないCurrentBlockの現座標
    const figures = this.state.currentBlock.figures.slice(0);

    //任意のブロック配列に対して、ブロックにおける最下層のFix判定用配列を作成。
    const filteredBottomFigure = figures.filter(f => figures.find(figure => figure === f + x))
    const JudgeBottomFigure = figures.filter(f => filteredBottomFigure.indexOf(f) === -1)

    // 配列の値のいずれかが、最下層、又は下に色がある時、Fix
    if( JudgeBottomFigure.find(f => maxNum < f + x) || JudgeBottomFigure.find(f => board[f + x] !== null)){
      this.fixblock()
      this.setState({
        currentBlock: {
          figures: [],
          color: "next",
        }
      })
    }else {
      this.setState({
        currentBlock: {
          figures : figures.map((figure) => {
            return figure = figure + x
          }),
          color : this.state.currentBlock.color,
        },
      })
    }
  }
  
  fixblock() {
    const history = this.state.histories;
    const current = history[history.length - 1];
    const board = current.board
    const figures = this.state.currentBlock.figures
    const color = this.state.currentBlock.color

    figures.forEach(f => board[f] = color)

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
          figures: [3, 3 + x, 3 + 2*x,],   //左右移動ロジックを考慮し、スタート位置は必ず０より大きく
          color: "blue",
        },
        nextBlock: {
          figures: [2, 3, 2 + x],   //左右移動ロジックを考慮し、スタート位置は必ず０より大きく
          color: "green",
        },
      })
    }else if(this.state.currentBlock.color === "next"){
      this.setState({
        currentBlock: this.state.nextBlock,
      })

    }
    this.fallblock()
    
    setTimeout(this.mainloop.bind(this), 1000)
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

    return(
      <Board
        board = {current.board}
        color ={this.state.currentBlock.color}
        figures = {this.state.currentBlock.figures}
      />
    )
  }
}

ReactDOM.render(
  <Tetris />,
  document.getElementById('root')
)
