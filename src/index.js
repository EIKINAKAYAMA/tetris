import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const x = 8; //左右隠された一列を含むものとする。
const y = 10;
const maxNum = x*y
const midleX = Math.floor(x/2);


//ブロックの種類、テンプレート
function blocktemplate(midleX, x){
  const blocks = 
  [
    {
      figures: [midleX-2,midleX-1, midleX, midleX+1],
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
  return blocks
}


class TetrisInformationPanel extends React.Component {
  render() {
    return (
      <div>
      <p>Score:{this.props.score}</p>
      <p>{this.props.message}</p>
      </div>
    );
  }
}

function Square(props) {
  return (
    <td className = {`block-type-${props.name}`}></td>
  )
}
  
class Table extends React.Component {
  renderSquare(i){
    const table = Array(16).fill(null)
    return <Square name = {table[i]} />
  }

  render() {
    const tbody = [];
    const templateblocks = blocktemplate(2, 4)
    const blocks = this.props.color? templateblocks.filter(f => f.color === this.props.color) : [{figures: [-1]}]
    const figures = blocks[0].figures
    for(let i=0; i< 2; i++){
      const row = [];
      for (let j = 0; j < 4; j++){
        var num = i * 4 + j
        figures.includes(num)
        ? row.push(<td className = {`block-type-${this.props.color}`}></td>)
        : row.push(this.renderSquare(num));
      }
      tbody.push(<tr className = {`table-row`}>{row}</tr>)
    }

    return (
      <table className="board-table">
        <tbody>
          {tbody}
        </tbody>
      </table>
    );
  }
}

//盤面
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
      score: 0,
      message: ""
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
    const history = this.state.histories;
    const current = history[history.length - 1];
    const board = current.board;
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

    if( rotated_figures.find(f => f % x === 0 || f % x === x - 1)){
      return;
    }else if(rotated_figures.find(f => board[f - 1] !== null)){
      return;
    }else{
      this.setState({
        currentBlock: {
          figures: rotated_figures,
          color: color,
          angle: rotated_angle,
        }
      })
    }
  }

  //左に動かす
  moveLeft(){
    const history = this.state.histories;
    const current = history[history.length - 1];
    const board = current.board;
    const figures = this.state.currentBlock.figures.slice(0);
    //左が壁の場合は、return
    if(figures.find(f => f % x === 1) ){
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
    if(figures.find(f => f % x === x - 2) ){
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
    const figures = this.state.currentBlock.figures.slice(0);
    //任意のブロック配列に対して、ブロックにおける最下層のFix判定用配列を作成。
    const filteredBottomFigure = figures.filter(f => figures.find(figure => figure === f + x))
    const JudgeBottomFigure = figures.filter(f => filteredBottomFigure.indexOf(f) === -1)
    // 配列の値のいずれかが、最下層、又は下に色がある時、Fix
    if( JudgeBottomFigure.find(f => maxNum < f + x) || JudgeBottomFigure.find(f => board[f + x] !== null)){
      this.fixblock();
      this.deleteLine();
      this.setState({
        histories: this.state.histories,
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

  //空白行を削除して点数加算
  delete(){
    const history = this.state.histories;
    const current = history[history.length - 1];
    const board = current.board
    const copyboard = board.slice(0)
    const score = this.state.score;
    let LineConter = 0;

    if(board.includes("delete")){
      for(var k=0; k < y; k++){
        if(copyboard[x*k] === "delete"){
          LineConter++;
          copyboard.splice(x*k, x)
          for(var j=0; j < x; j++){
            copyboard.splice(1, 0, null)
          }
        }
      }
      this.setState({
        histories: history.concat([{
          board: copyboard
        }]),
        score: score + LineConter*100*(LineConter*1)
      })
    }else{
      return
    }
  }

  // この関数は着色ラインを消すことのみを目的とする。
  deleteLine(){
    const history = this.state.histories;
    const current = history[history.length - 1];
    const copyhistories = this.state.histories.slice(0, history.length -1)
    const board = current.board
    const copyboard = board.slice(0)
    
    //削除されるべきラインを全て”Null”にする
    for(var i=0; i < y; i++){
      const Line = copyboard.slice(1+x*i, x*(i+1)-1);
      if(!Line.some(f => f === null)){
        copyboard.fill(null, x*i, x*(i+1))
        copyboard[x*i] = "delete"; //盤面外の最左列を”delete”対象として判定する。
      }
    }
    copyhistories.push({board: copyboard})
    this.setState({
      histories: copyhistories
    })
  }

  getRandomBlock(){
    return Math.floor(Math.random()*7)
  }

  cleateblock(){
    const blocks = blocktemplate(midleX, x)
    return blocks[this.getRandomBlock()]
  }
  
  mainloop(){
    const history = this.state.histories;
    const current = history[history.length - 1];
    const board = current.board;

    if(board.includes("delete")){
      this.delete();
    }
    const timeId = setTimeout(this.mainloop.bind(this), 1000)

    //ブロックを作成する（For creating blocks）
    if(this.state.currentBlock.color === null){
      this.setState({
        // currentBlock: blocks[this.getRandomBlock()],
        // nextBlock: blocks[this.getRandomBlock()],
        currentBlock: this.cleateblock(),
        nextBlock: this.cleateblock(),
      })
    }else if(this.state.currentBlock.color === "next"){
      const nextBlock = this.state.nextBlock.figures;
      if(nextBlock.find(f => board[f]!== null)){
        clearTimeout(timeId)
        this.setState({
          message: "Game Over",
        })
        return;
      }
      this.setState({
        currentBlock: this.state.nextBlock,
        // nextBlock: blocks[this.getRandomBlock()],
        nextBlock: this.cleateblock(),
      })
    }
    this.fallblock();
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
      <div className="wrapper-container">
        <span className="tetris-container">
          <Board
            board = {current.board}
            color ={this.state.currentBlock.color}
            figures = {this.state.currentBlock.figures}
          />
          <span className="tetris-panel-container">
            <p>Next:</p>
            <Table
              color ={this.state.nextBlock.color}
            />
            <TetrisInformationPanel
              score = {this.state.score}
              message = {this.state.message}
            />
            <div className="tetris-panel-container-padding"></div>
            <table className="tetris-button-panel">
              <tbody>
                <tr>
                  <td></td>
                  <td id="tetris-rotate-button" className="tetris-button" onMouseDown = {this.rotate.bind(this)}>↻</td>
                  <td></td>
                </tr>
                <tr>
                  <td id="tetris-move-left-button"className="tetris-button" onMouseDown = {this.moveLeft.bind(this)}>←</td>
                  <td id="tetris-fall-button" className="tetris-button" onMouseDown = {this.fallblock.bind(this)}>↓</td>
                  <td id="tetris-move-right-button" className="tetris-button" onMouseDown = {this.moveRight.bind(this)}>→</td>
                </tr>
              </tbody>
            </table>
          </span>
        </span>
      </div>
    )
  }
}

ReactDOM.render(
  <Tetris />,
  document.getElementById('root')
)
