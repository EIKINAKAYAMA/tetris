import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const x = 12 // x=（実際に表示させたい数）＋２（左右の隠し分）
const y = 22 // y=（実際に表示させたい数）＋２（最上位列の隠し分）
const maxNum = x * y
const middleX = Math.floor(x / 2)

// テトリミノの設定用関数
function blocktemplate (middleX, x) {
  const blocks =
  [
    {
      figures: [middleX - 2, middleX - 1, middleX, middleX + 1],
      color: 'lightblue',
      angle: 0
    },
    {
      figures: [middleX - 1, middleX, middleX + x - 1, middleX + x],
      color: 'yellow',
      angle: 0
    },
    {
      figures: [middleX, middleX + 1, middleX - 1 + x, middleX + x],
      color: 'green',
      angle: 0
    },
    {
      figures: [middleX - 1, middleX, middleX + x, middleX + x + 1],
      color: 'red',
      angle: 0
    },
    {
      figures: [middleX - 1, middleX + x - 1, middleX + x, middleX + x + 1],
      color: 'blue',
      angle: 0
    },
    {
      figures: [middleX + 1, middleX + x - 1, middleX + x, middleX + x + 1],
      color: 'orange',
      angle: 0
    },
    {
      figures: [middleX, middleX + x - 1, middleX + x, middleX + x + 1],
      color: 'purple',
      angle: 0
    }
  ]
  return blocks
  // const blocks = blocks_without_angle.map(f => {f.angle = 0 return f})
  // const blocks = blocks_without_angle.map(f =>  ({...f , angle : 0}))
}

class TetrisInformationPanel extends React.Component {
  render () {
    return (
      <div>
        <p>Score&nbsp;&nbsp;:&nbsp;&nbsp;{this.props.score}</p>
        <p>Level&nbsp;&nbsp;:&nbsp;&nbsp;{this.props.level}</p>
        <p>ナカヤマン：<br />{this.props.message}</p>
        <p>勝利判定：{this.props.judge}</p>
      </div>
    )
  }
}

function Square (props) {
  return (
    <td className={`block-type-${props.name}`} />
  )
}

// 次のブロックを表示する為のtableクラス
class Table extends React.Component {
  renderSquare (i) {
    const table = Array(16).fill(null)
    return <Square key={`table${i}`} name={table[i]} />
  }

  render () {
    const nextX = 2
    const nextY = 4
    const templateblocks = blocktemplate(nextX, nextY)
    const blocks = this.props.color ? templateblocks.filter(f => f.color === this.props.color) : [{ figures: [-1] }]
    const figures = blocks[0].figures

    const tbody = [...Array(nextX)].map((_, i) => {
      const row = [...Array(nextY)].map((_, j) => {
        const num = i * 4 + j
        return figures.includes(num)
          ? <td key={`table-td ${num}`} className={`block-type-${this.props.color}`} />
          : this.renderSquare(num)
      })

      return <tr key={`table-tr ${i}`} className='table-row'>{row}</tr>
    })

    return (
      <table className='board-table'>
        <tbody>
          {tbody}
        </tbody>
      </table>
    )
  }
}

// 盤面
class Board extends React.Component {
  renderSquare (i) {
    return <Square key={`board${i}`} name={this.props.board[i]} />
  }

  render () {
    const tbody = [...Array(y)].map((_, i) => {
      // ブロック出現時のリアリティを出すため、上に列を隠す
      if (i >= 2) {
        const row = [...Array(x)].map((_, j) => {
          const num = i * x + j
          // return this.props.figures.includes(num)
          // ? <td key={`board-td${num}`} className = {`block-type-${this.props.color}`}></td>
          // : this.renderSquare(num)
          if (num % x === 0 || num % x === x - 1) {
            return (<td key={`board-td${num}`} className='block-type-wall' />)
          } else if (this.props.figures.includes(num)) {
            return (<td key={`board-td${num}`} className={`block-type-${this.props.color}`} />)
          } else {
            return (this.renderSquare(num))
          }
        })
        return <tr key={`board-tr${i}`} className='table-row'>{row}</tr>
      } else {
        return null
      }
    })

    return (
      <table className='board-table'>
        <tbody>
          {tbody}
        </tbody>
      </table>
    )
  }
}

class Tetris extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentBlock: { // 今のブロック
        figures: [], // スタート座標
        color: 'next', // 色
        angle: null
      },
      nextBlock: this.cleateblock(),
      histories: [{ // 履歴
        board: Array(maxNum).fill(null)
      }],
      score: 0,
      level: 0,
      message: '',
      judge: ''
    }
    // キー操作が行われた時
    window.onkeydown = (e) => {
      if (this.state.currentBlock == null) {
        return
      }

      if (e.key === 'ArrowLeft') {
        this.moveLeft()
      } else if (e.key === 'ArrowUp') {
        this.rotate()
      } else if (e.key === 'ArrowRight') {
        this.moveRight()
      } else if (e.key === 'ArrowDown') {
        this.fallblock()
      }
    }
  }

  // 回転させる
  rotate () {
    const history = this.state.histories
    const current = history[history.length - 1]
    const board = current.board
    const figures = this.state.currentBlock.figures.slice(0)
    const rotatedFigures = []
    const color = this.state.currentBlock.color
    const angle = this.state.currentBlock.angle
    const rotatedAngle = (angle !== 270) ? (angle + 90) : 0

    if (color === 'lightblue') {
      if (angle === 0 || angle === 180) {
        rotatedFigures[0] = figures[0] - 2 * x + 2
        rotatedFigures[1] = figures[1] - x + 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] + x - 1
      } else if (angle === 90 || angle === 270) {
        rotatedFigures[0] = figures[0] + 2 * x - 2
        rotatedFigures[1] = figures[1] + x - 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] - x + 1
      } else {
        return
      }
    } else if (color === 'green') {
      if (angle === 0 || angle === 180) {
        rotatedFigures[0] = figures[0] + x
        rotatedFigures[1] = figures[1] + 2 * x - 1
        rotatedFigures[2] = figures[2] - x
        rotatedFigures[3] = figures[3] - 1
      } else if (angle === 90 || angle === 270) {
        rotatedFigures[0] = figures[0] - x
        rotatedFigures[1] = figures[1] - 2 * x + 1
        rotatedFigures[2] = figures[2] + x
        rotatedFigures[3] = figures[3] + 1
      } else {
        return
      }
    } else if (color === 'red') {
      if (angle === 0 || angle === 180) {
        rotatedFigures[0] = figures[0] + 2
        rotatedFigures[1] = figures[1] + x + 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] + x - 1
      } else if (angle === 90 || angle === 270) {
        rotatedFigures[0] = figures[0] - 2
        rotatedFigures[1] = figures[1] - x - 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] - x + 1
      } else {
        return
      }
    } else if (color === 'blue') {
      if (angle === 0) {
        rotatedFigures[0] = figures[0] + 2
        rotatedFigures[1] = figures[1] - x + 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] + x - 1
      } else if (angle === 90) {
        rotatedFigures[0] = figures[0] + 2 * x
        rotatedFigures[1] = figures[1] + x + 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] - x - 1
      } else if (angle === 180) {
        rotatedFigures[0] = figures[0] - 2
        rotatedFigures[1] = figures[1] + x - 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] - x + 1
      } else if (angle === 270) {
        rotatedFigures[0] = figures[0] - 2 * x
        rotatedFigures[1] = figures[1] - x - 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] + x + 1
      } else {
        return
      }
    } else if (color === 'orange') {
      if (angle === 0) {
        rotatedFigures[0] = figures[0] + 2 * x
        rotatedFigures[1] = figures[1] - x + 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] + x - 1
      } else if (angle === 90) {
        rotatedFigures[0] = figures[0] - 2
        rotatedFigures[1] = figures[1] + x + 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] - x - 1
      } else if (angle === 180) {
        rotatedFigures[0] = figures[0] - 2 * x
        rotatedFigures[1] = figures[1] + x - 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] - x + 1
      } else if (angle === 270) {
        rotatedFigures[0] = figures[0] + 2
        rotatedFigures[1] = figures[1] - x - 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] + x + 1
      } else {
        return
      }
    } else if (color === 'purple') {
      if (angle === 0) {
        rotatedFigures[0] = figures[0] + x + 1
        rotatedFigures[1] = figures[1] - x + 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] + x - 1
      } else if (angle === 90) {
        rotatedFigures[0] = figures[0] + x - 1
        rotatedFigures[1] = figures[1] + x + 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] - x - 1
      } else if (angle === 180) {
        rotatedFigures[0] = figures[0] - x - 1
        rotatedFigures[1] = figures[1] + x - 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] - x + 1
      } else if (angle === 270) {
        rotatedFigures[0] = figures[0] - x + 1
        rotatedFigures[1] = figures[1] - x - 1
        rotatedFigures[2] = figures[2]
        rotatedFigures[3] = figures[3] + x + 1
      } else {
        return
      }
    } else {
      return
    }

    if (rotatedFigures.find(f => f % x === 0 || f % x === x - 1)) {
      return null
    } else if (rotatedFigures.find(f => board[f - 1] !== null)) {
      return null
    } else {
      this.setState({
        currentBlock: {
          figures: rotatedFigures,
          color: color,
          angle: rotatedAngle
        }
      })
    }
  }

  // 左に動かす
  moveLeft () {
    const history = this.state.histories
    const current = history[history.length - 1]
    const board = current.board
    const figures = this.state.currentBlock.figures.slice(0)
    // 左が壁の場合は、return
    if (figures.find(f => f % x === 1)) {
      return
    }
    // 既に色がついているブロックがある場合は固定。
    if (figures.find(f => board[f - 1] !== null)) {
      return null
    } else {
      // 通常時は左にズラすのみ。
      this.setState({
        currentBlock: {
          figures: figures.map(m => m - 1),
          color: this.state.currentBlock.color,
          angle: this.state.currentBlock.angle
        }
      })
    }
  }

  // 右に動かす
  moveRight () {
    const history = this.state.histories
    const current = history[history.length - 1]
    const board = current.board
    const figures = this.state.currentBlock.figures.slice(0)
    // 左が壁の場合は、return
    if (figures.find(f => f % x === x - 2)) {
      return
    }
    // 既に色がついているブロックがある場合は固定。
    if (figures.find(f => board[f + 1] !== null)) {
      return null
    } else {
      // 通常時は左にズラすのみ。
      this.setState({
        currentBlock: {
          figures: figures.map(m => m + 1),
          color: this.state.currentBlock.color,
          angle: this.state.currentBlock.angle
        }
      })
    }
  }

  // 落とす関数（y軸をズラす）
  fallblock () {
    const history = this.state.histories
    const current = history[history.length - 1]
    const board = current.board
    const figures = this.state.currentBlock.figures.slice(0)

    // 任意のブロック配列に対して、ブロックにおける最下層のFix判定用配列を作成。
    const filteredBottomFigure = figures.filter(f => figures.find(figure => figure === f + x))
    const JudgeBottomFigure = figures.filter(f => filteredBottomFigure.indexOf(f) === -1)

    // 配列の値のいずれかが、最下層、又は下に色がある時、Fix
    if (JudgeBottomFigure.find(f => maxNum < f + x) || JudgeBottomFigure.find(f => board[f + x] !== null)) {
      const minY = Math.floor(Math.min(...figures) / x)
      const maxY = Math.floor(Math.max(...figures) / x)
      this.fixblock()
      this.deleteLine(minY, maxY)
      this.setState({
        histories: this.state.histories,
        currentBlock: {
          figures: [],
          color: 'next',
          angle: 0
        }
      })
    } else {
      this.setState({
        currentBlock: {
          figures: figures.map((figure) => figure + x),
          color: this.state.currentBlock.color,
          angle: this.state.currentBlock.angle
        }
      })
    }
  }

  fixblock () {
    const history = this.state.histories
    const current = history[history.length - 1]
    const boardcopy = current.board.slice()
    const color = this.state.currentBlock.color

    this.state.currentBlock.figures.forEach(f => {
      boardcopy[f] = color
    })
    this.setState({
      histories: history.concat([{
        board: boardcopy
      }])
    })
  }

  // 空白行を削除して点数加算
  delete () {
    const history = this.state.histories
    const copyboard = history[history.length - 1].board.slice(0)
    let LineConter = 0;

    [...Array(y)].map((_, i) => {
      if (copyboard[x * i] === 'delete') {
        return (
          copyboard.splice(x * i, x),
          LineConter++,
          [...Array(x)].map(() => copyboard.splice(1, 0, null))
        )
      } else {
        return null
      }
    })

    this.setState({
      histories: history.concat([{
        board: copyboard
      }]),
      score: this.state.score + LineConter * 100 * (LineConter * 1)
    })
  }

  // この関数は着色ラインを消すことのみを目的とする。
  deleteLine (minY, maxY) {
    const history = this.state.histories
    const current = history[history.length - 1]
    const copyhistories = this.state.histories.slice(0, history.length - 1)
    const board = current.board
    const copyboard = board.slice(0)

    // 削除されるべきラインを全て”Null”にする
    for (let i = minY; i <= maxY; i++) {
      const Line = copyboard.slice(1 + x * i, x * (i + 1) - 1)
      if (!Line.some(f => f === null)) {
        copyboard.fill(null, x * i, x * (i + 1))
        copyboard[x * i] = 'delete' // 盤面外の最左列を”delete”対象として判定する。
      }
    }
    copyhistories.push({ board: copyboard })
    this.setState({
      histories: copyhistories
    })
  }

  getRandomBlock () {
    return Math.floor(Math.random() * 7)
  }

  cleateblock () {
    const blocks = blocktemplate(middleX, x)
    return blocks[this.getRandomBlock()]
    // return blocks[1]
  }

  mainloop () {
    const history = this.state.histories
    const current = history[history.length - 1]
    const board = current.board
    const nextBlock = this.state.nextBlock.figures

    if (board.includes('delete')) {
      this.delete()
    }
    let timeId = setTimeout(this.mainloop.bind(this), 1000)

    // ブロックを作成する（For creating blocks）
    if (this.state.currentBlock.color === 'next') {
      this.setState({
        currentBlock: this.state.nextBlock,
        nextBlock: this.cleateblock()
      })
    }

    // 次のブロックが出現する場所に、1個でも色があったら、ゲームオーバー
    if (nextBlock.find(f => board[f] !== null)) {
      clearTimeout(timeId)
      if (this.state.score >= 5000) {
        this.setState({
          message: '5000点を超えるとわ。。。 いっぱい遊んで、くれたんやな、、、ありがとう！！！完敗や',
          judge: 'You are winner'
        })
      } else {
        this.setState({
          message: 'がははは、100年早いわ！出直してきんしゃい！',
          judge: 'You are loser'
        })
      }
      return
    } else {
      if (this.state.score < 100) {
        this.setState({
          message: 'さて、お手並み拝見させて貰おうか'
        })
      } else if (this.state.score < 1000) {
        clearTimeout(timeId)
        timeId = setTimeout(this.mainloop.bind(this), 500)
        this.setState({
          level: 2,
          message: 'ほほう！やり方は、知っているみたいだな。それじゃ行くぞ'
        })
      } else if (this.state.score < 1700) {
        clearTimeout(timeId)
        timeId = setTimeout(this.mainloop.bind(this), 350)
        this.setState({
          level: 3,
          message: 'むむむ、なかなかうまいな'
        })
      } else if (this.state.score < 3000) {
        clearTimeout(timeId)
        timeId = setTimeout(this.mainloop.bind(this), 200)
        this.setState({
          level: 4,
          message: 'ま、ま、まだ大丈夫だ'
        })
      } else if (this.state.score < 4100) {
        clearTimeout(timeId)
        timeId = setTimeout(this.mainloop.bind(this), 150)
        this.setState({
          level: 'MAX',
          message: 'こ、このままだと、負けてしまう。。あれを準備しなければ'
        })
      } else if (this.state.score < 6600) {
        clearTimeout(timeId)
        timeId = setTimeout(this.mainloop.bind(this), 10)
        this.setState({
          level: '奥義発動',
          message: '奥義発動'
        })
      } else {
        return
      }
    }
    this.fallblock()
  }

  startGame () {
    this.mainloop()
  }

  componentDidMount () {
    this.startGame()
  }

  render () {
    const history = this.state.histories
    const current = history[history.length - 1]

    return (
      <div className='wrapper-container'>
        <div className='title'>
          <h1>最難テトリス ”ナカヤマン”</h1>
          <p>スコア5000点以上とって、ナカヤマンをぶっ倒せ！！！</p>
        </div>
        <span className='tetris-container'>
          <Board
            board={current.board}
            color={this.state.currentBlock.color}
            figures={this.state.currentBlock.figures}
          />
          <span className='tetris-panel-container'>
            <div className='information'>
              <div className='tetris-nextBlock'>
                <p>Next:</p>
                <Table
                  color={this.state.nextBlock.color}
                />
              </div>
              <div className='score-message'>
                <TetrisInformationPanel
                  score={this.state.score}
                  level={this.state.level}
                  message={this.state.message}
                  judge={this.state.judge}
                />
              </div>
            </div>
            <div className='tetris-panel-container-padding' />
            <table className='tetris-button-panel'>
              <tbody>
                <tr>
                  <td />
                  <td id='tetris-rotate-button' className='tetris-button' onMouseDown={this.rotate.bind(this)}>↻</td>
                  <td />
                </tr>
                <tr>
                  <td id='tetris-move-left-button' className='tetris-button' onMouseDown={this.moveLeft.bind(this)}>←</td>
                  <td id='tetris-fall-button' className='tetris-button' onMouseDown={this.fallblock.bind(this)}>↓</td>
                  <td id='tetris-move-right-button' className='tetris-button' onMouseDown={this.moveRight.bind(this)}>→</td>
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
