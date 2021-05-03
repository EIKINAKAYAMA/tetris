import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const x = 7;
const y = 7;
const maxNum = x*y
const midleX = Math.floor(x/2);
const blocks = 
  [
    {
      figures: [midleX-1,midleX, midleX+1, midleX+2],
      color: "lightblue",
      angle: 0,
    },
    {
      figures: [midleX,midleX+1, midleX+x, midleX+1+x],
      color: "yellow",
      angle: 0,
    },
    {
      figures: [midleX, midleX+1, midleX-1+x, midleX+x],
      color: "green",
      angle: 0,
    },
    {
      figures: [midleX-1, midleX, midleX+x, midleX+x+1],
      color: "red",
      angle: 0,
    },
    {
      figures: [midleX-1, midleX+x-1, midleX+x, midleX+x+1],
      color: "blue",
      angle: 0,
    },
    {
      figures: [midleX+1, midleX+x-1, midleX+x, midleX+x+1],
      color: "orange",
      angle: 0,
    },
    {
      figures: [midleX, midleX+x-1, midleX+x, midleX+x+1],
      color: "purple",
      angle: 0,
    },
  ]


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
        angle: null,
      },
      nextBlock: {    //次落ちる予定のブロック
        figures: [],
        color: null,
        angle: null,
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
        this.rotate();
      }else if (e.key === "ArrowRight") {
        this.moveRight();
      }else if (e.key === "ArrowDown") {
        this.fallblock();
      }
    }
  }

  // 回転させる
  rotate(){
    const figures = this.state.currentBlock.figures.slice(0);
    const rotated_figures = [];
    const color = this.state.currentBlock.color
    const angle = this.state.currentBlock.angle
    const rotated_angle = (angle !== 270) ? (angle + 90) : 0
    
    if(color === "lightblue"){
      if(angle=== 0 || angle===180){
        rotated_figures[0] = figures[0]-2*x+2
        rotated_figures[1] = figures[1]-x+1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]+x-1 
      }else if(angle=== 90 || angle===270){
        rotated_figures[0] = figures[0]+2*x-2
        rotated_figures[1] = figures[1]+x-1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]-x+1 
      }else{
        alert("NG")
      }
    }else if(color === "green"){
      if(angle=== 0 || angle===180){
        rotated_figures[0] = figures[0]+x
        rotated_figures[1] = figures[1]+2*x-1
        rotated_figures[2] = figures[2]-x
        rotated_figures[3] = figures[3]-1
      }else if(angle=== 90 || angle===270){
        rotated_figures[0] = figures[0]-x
        rotated_figures[1] = figures[1]-2*x+1
        rotated_figures[2] = figures[2]+x
        rotated_figures[3] = figures[3]+1
      }else{
        alert("NG")
      }
      
    }else if(color === "red"){
      if(angle=== 0 || angle===180){
        rotated_figures[0] = figures[0]+2
        rotated_figures[1] = figures[1]+x+1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]+x-1
      }else if(angle=== 90 || angle===270){
        rotated_figures[0] = figures[0]-2
        rotated_figures[1] = figures[1]-x-1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]-x+1
      }else{
        alert("NG")
      }

    }else if(color === "blue"){
      if(angle=== 0){
        rotated_figures[0] = figures[0]+2
        rotated_figures[1] = figures[1]-x+1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]+x-1
      }else if(angle=== 90){
        rotated_figures[0] = figures[0]+2*x
        rotated_figures[1] = figures[1]+x+1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]-x-1
      }else if(angle=== 180){
        rotated_figures[0] = figures[0]-2
        rotated_figures[1] = figures[1]+x-1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]-x+1
      }else if(angle=== 270){
        rotated_figures[0] = figures[0]-2*x
        rotated_figures[1] = figures[1]-x-1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]+x+1
      }else{
        alert("NG")
      }
      
    }else if(color === "orange"){
      if(angle=== 0){
        rotated_figures[0] = figures[0]+2*x
        rotated_figures[1] = figures[1]-x+1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]+x-1
      }else if(angle=== 90){
        rotated_figures[0] = figures[0]-2
        rotated_figures[1] = figures[1]+x+1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]-x-1
      }else if(angle=== 180){
        rotated_figures[0] = figures[0]-2*x
        rotated_figures[1] = figures[1]+x-1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]-x+1
      }else if(angle=== 270){
        rotated_figures[0] = figures[0]+2
        rotated_figures[1] = figures[1]-x-1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]+x+1
      }else{
        alert("NG")
      }
      
    }else if(color === "purple"){
      if(angle=== 0){
        rotated_figures[0] = figures[0]+x+1
        rotated_figures[1] = figures[1]-x+1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]+x-1
      }else if(angle=== 90){
        rotated_figures[0] = figures[0]+x-1
        rotated_figures[1] = figures[1]+x+1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]-x-1
      }else if(angle=== 180){
        rotated_figures[0] = figures[0]-x-1
        rotated_figures[1] = figures[1]+x-1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]-x+1
      }else if(angle=== 270){
        rotated_figures[0] = figures[0]-x+1
        rotated_figures[1] = figures[1]-x-1
        rotated_figures[2] = figures[2]
        rotated_figures[3] = figures[3]+x+1
      }else{
        alert("NG")
      }
    }else{
      return;
    }

    this.setState({
      currentBlock: {
        figures: rotated_figures,
        color: color,
        angle: rotated_angle,
      }
    })
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
          angle : this.state.currentBlock.angle, 
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
          angle : this.state.currentBlock.angle,
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
          angle: 0,
        }
      })
    }else {
      this.setState({
        currentBlock: {
          figures : figures.map((figure) => {
            return figure = figure + x
          }),
          color : this.state.currentBlock.color,
          angle : this.state.currentBlock.angle,
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

  getRandomBlock(){
    return Math.floor(Math.random()*7)
  }
  
  mainloop(){
    if(this.state.currentBlock.color === null){
      this.setState({
        currentBlock: blocks[this.getRandomBlock()],
        nextBlock: blocks[this.getRandomBlock()],
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
