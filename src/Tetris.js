import React from 'react'
import './i18n'
import { withTranslation } from 'react-i18next'

const x = 12 // x=（実際に表示させたい数）＋２（左右の隠し分）
const y = 22 // y=（実際に表示させたい数）＋２（最上位列の隠し分）
const maxNum = x * y
const middleX = Math.floor(x / 2)

// テトリミノの設定用関数
function blocktemplate (middleX, x, thisFigures) {
  const blocks =
  [
    {
      figures: [middleX - 2, middleX - 1, middleX, middleX + 1],
      color: 'lightblue',
      angle: 0,
      rotatedFigures: [
        [thisFigures[0] - 2 * x + 2, thisFigures[1] - x + 1, thisFigures[2], thisFigures[3] + x - 1],
        [thisFigures[0] + 2 * x - 2, thisFigures[1] + x - 1, thisFigures[2], thisFigures[3] - x + 1]
      ]
    },
    {
      figures: [middleX - 1, middleX, middleX + x - 1, middleX + x],
      color: 'yellow',
      angle: 0
      // 正方形の為、回転しない
    },
    {
      figures: [middleX, middleX + 1, middleX - 1 + x, middleX + x],
      color: 'green',
      angle: 0,
      rotatedFigures: [
        [thisFigures[0] + x, thisFigures[1] + 2 * x - 1, thisFigures[2] - x, thisFigures[3] - 1],
        [thisFigures[0] - x, thisFigures[1] - 2 * x + 1, thisFigures[2] + x, thisFigures[3] + 1]
      ]
    },
    {
      figures: [middleX - 1, middleX, middleX + x, middleX + x + 1],
      color: 'red',
      angle: 0,
      rotatedFigures: [
        [thisFigures[0] + 2, thisFigures[1] + x + 1, thisFigures[2], thisFigures[3] + x - 1],
        [thisFigures[0] - 2, thisFigures[1] - x - 1, thisFigures[2], thisFigures[3] - x + 1]
      ]
    },
    {
      figures: [middleX - 1, middleX + x - 1, middleX + x, middleX + x + 1],
      color: 'blue',
      angle: 0,
      rotatedFigures: [
        [thisFigures[0] + 2, thisFigures[1] - x + 1, thisFigures[2], thisFigures[3] + x - 1],
        [thisFigures[0] + 2 * x, thisFigures[1] + x + 1, thisFigures[2], thisFigures[3] - x - 1],
        [thisFigures[0] - 2, thisFigures[1] + x - 1, thisFigures[2], thisFigures[3] - x + 1],
        [thisFigures[0] - 2 * x, thisFigures[1] - x - 1, thisFigures[2], thisFigures[3] + x + 1]
      ]
    },
    {
      figures: [middleX + 1, middleX + x - 1, middleX + x, middleX + x + 1],
      color: 'orange',
      angle: 0,
      rotatedFigures: [
        [thisFigures[0] + 2 * x, thisFigures[1] - x + 1, thisFigures[2], thisFigures[3] + x - 1],
        [thisFigures[0] - 2, thisFigures[1] + x + 1, thisFigures[2], thisFigures[3] - x - 1],
        [thisFigures[0] - 2 * x, thisFigures[1] + x - 1, thisFigures[2], thisFigures[3] - x + 1],
        [thisFigures[0] + 2, thisFigures[1] - x - 1, thisFigures[2], thisFigures[3] + x + 1]
      ]
    },
    {
      figures: [middleX, middleX + x - 1, middleX + x, middleX + x + 1],
      color: 'purple',
      angle: 0,
      rotatedFigures: [
        [thisFigures[0] + x + 1, thisFigures[1] - x + 1, thisFigures[2], thisFigures[3] + x - 1],
        [thisFigures[0] + x - 1, thisFigures[1] + x + 1, thisFigures[2], thisFigures[3] - x - 1],
        [thisFigures[0] - x - 1, thisFigures[1] + x - 1, thisFigures[2], thisFigures[3] - x + 1],
        [thisFigures[0] - x + 1, thisFigures[1] - x - 1, thisFigures[2], thisFigures[3] + x + 1]
      ]
    }
  ]
  return blocks
  // const blocks = blocks_without_angle.map(f => {f.angle = 0 return f})
  // const blocks = blocks_without_angle.map(f =>  ({...f , angle : 0}))
}

class Panel extends React.Component {
  render () {
    const { t } = this.props

    return (
      <div>
        <p>{t('スコア')}&nbsp;&nbsp;:&nbsp;&nbsp;{this.props.score}</p>
        <p>{t('レベル')}&nbsp;&nbsp;:&nbsp;&nbsp;{this.props.level}</p>
        <br />
        <p>{t('ナカヤマン')}：<br />{this.props.message}</p>
        <br />
        <p>{t('勝利判定')}：{this.props.judge}</p>
      </div>
    )
  }
}
// 他言語化対応
const TetrisInformationPanel = withTranslation()(Panel)

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
    const tbody = []
    const templateblocks = blocktemplate(nextX, nextY, x, Array(5).fill(null))
    const blocks = this.props.color ? templateblocks.filter(f => f.color === this.props.color) : [{ figures: [-1] }]
    const figures = blocks[0].figures
    for (let i = 0; i < nextX; i++) {
      const row = []
      for (let j = 0; j < nextY; j++) {
        const num = i * 4 + j
        figures.includes(num)
          ? row.push(<td key={`table-td ${num}`} className={`block-type-${this.props.color}`} />)
          : row.push(this.renderSquare(num))
      }
      tbody.push(<tr key={`table-tr ${i}`} className='table-row'>{row}</tr>)
    }

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
    const tbody = []
    for (let i = 2; i < y; i++) {
      const row = []
      for (let j = 0; j < x; j++) {
        const num = i * x + j
        if (num % x === 0 || num % x === x - 1) {
          row.push(<td key={`board-td${num}`} className='block-type-wall' />)
        } else if (this.props.figures.includes(num)) {
          row.push(<td key={`board-td${num}`} className={`block-type-${this.props.color}`} />)
        } else {
          row.push(this.renderSquare(num))
        }
      }
      tbody.push(<tr key={`board-tr${i}`} className='table-row'>{row}</tr>)
    }

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
      judge: '',
      language: ''
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
        this.fallblock(false)
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
        rotatedFigures.push(blocktemplate(middleX, x, figures)[0].rotatedFigures[0])
      } else if (angle === 90 || angle === 270) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[0].rotatedFigures[1])
      } else {
        return
      }
    } else if (color === 'green') {
      if (angle === 0 || angle === 180) {
        console.log(figures)
        rotatedFigures.push(blocktemplate(middleX, x, figures)[2].rotatedFigures[0])
        console.log(rotatedFigures)
      } else if (angle === 90 || angle === 270) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[2].rotatedFigures[1])
      } else {
        return
      }
    } else if (color === 'red') {
      if (angle === 0 || angle === 180) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[3].rotatedFigures[0])
      } else if (angle === 90 || angle === 270) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[3].rotatedFigures[1])
      } else {
        return
      }
    } else if (color === 'blue') {
      if (angle === 0) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[4].rotatedFigures[0])
      } else if (angle === 90) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[4].rotatedFigures[1])
      } else if (angle === 180) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[4].rotatedFigures[2])
      } else if (angle === 270) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[4].rotatedFigures[3])
      }
    } else if (color === 'orange') {
      if (angle === 0) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[5].rotatedFigures[0])
      } else if (angle === 90) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[5].rotatedFigures[1])
      } else if (angle === 180) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[5].rotatedFigures[2])
      } else if (angle === 270) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[5].rotatedFigures[3])
      }
    } else if (color === 'purple') {
      if (angle === 0) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[6].rotatedFigures[0])
      } else if (angle === 90) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[6].rotatedFigures[1])
      } else if (angle === 180) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[6].rotatedFigures[2])
      } else if (angle === 270) {
        rotatedFigures.push(blocktemplate(middleX, x, figures)[6].rotatedFigures[3])
      }
    } else {
      return
    }

    // 回転できる場所にいるときは、回転した配列を、回転できない場所にいるときはretun
    if (rotatedFigures[0].find(f => f % x === 0 || f % x === x - 1)) {
      return null
    } else if (rotatedFigures[0].find(f => board[f - 1] !== null)) {
      return null
    } else {
      this.setState({
        currentBlock: {
          figures: rotatedFigures[0],
          color: color,
          angle: rotatedAngle
        }
      })
    }
  }

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

  moveRight () {
    const history = this.state.histories
    const current = history[history.length - 1]
    const board = current.board
    const figures = this.state.currentBlock.figures.slice(0)
    // 右が壁の場合は、return
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
  needFix () {
    const history = this.state.histories
    const current = history[history.length - 1]
    const board = current.board
    const figures = this.state.currentBlock.figures

    // 任意のブロック配列に対して、ブロックにおける最下層のFix判定用配列を作成。
    const filteredBottomFigure = figures.filter(f => figures.find(figure => figure === f + x))
    const JudgeBottomFigure = figures.filter(f => filteredBottomFigure.indexOf(f) === -1)

    // Fix対象がある場合は返り値を用意する
    return JudgeBottomFigure.find(f => maxNum < f + x) || JudgeBottomFigure.find(f => board[f + x] !== null)
  }

  fallblock (fromMouse = true) {
    const figures = this.state.currentBlock.figures
    if (this.needFix()) {
      // クリックに操作の場合
      if (fromMouse) {
        return
      }
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
    let LineConter = 0

    for (let i = 0; i < y; i++) {
      if (copyboard[x * i] === 'delete') {
        copyboard.splice(x * i, x)
        LineConter++
        [...Array(x)].map(() => copyboard.splice(1, 0, null))
      }
    }

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
    const blocks = blocktemplate(middleX, x, Array(5).fill(null))
    return blocks[this.getRandomBlock()]
  }

  changeInfo (level, message, judge, timeId, time) {
    clearTimeout(timeId)
    if (time !== null) {
      timeId = setTimeout(this.mainloop.bind(this), time)
    }
    this.setState({
      level: level,
      message: message,
      judge: judge
    })
  }

  mainloop () {
    const history = this.state.histories
    const current = history[history.length - 1]
    const board = current.board
    const nextBlock = this.state.nextBlock.figures
    const level = this.state.level
    const { t } = this.props
    if (board.includes('delete')) {
      this.delete()
    }
    const timeId = setTimeout(this.mainloop.bind(this), 1000)

    // ブロックを作成する（For creating blocks）
    if (this.state.currentBlock.color === 'next') {
      this.setState({
        currentBlock: this.state.nextBlock,
        nextBlock: this.cleateblock()
      })
    }

    // 次のブロックが出現する場所に、1個でも色があったら、ゲームオーバー
    if (nextBlock.find(f => board[f] !== null)) {
      this.state.score >= 5000
        ? this.changeInfo(level, t('5000点以上とるとわ。。。 いっぱい遊んで、くれたんやな、、、ありがとう！！！完敗や'), t('あなたの勝ち'), timeId, null)
        : this.changeInfo(level, t('がははは、100年早いわ！出直してきんしゃい！'), t('あなたの負け'), timeId, null)
    } else {
      if (this.state.score < 100) {
        this.changeInfo(level, t('さて、お手並み拝見させて貰おうか'), '', timeId, 1000)
      } else if (this.state.score < 1000) {
        this.changeInfo(2, t('ほほう！やり方は、知っているみたいだな。それじゃ行くぞ'), '', timeId, 500)
      } else if (this.state.score < 1700) {
        this.changeInfo(3, t('むむむ、なかなかうまいな'), '', timeId, 350)
      } else if (this.state.score < 3500) {
        this.changeInfo(4, t('ま、ま、まだ大丈夫だ'), '', timeId, 200)
      } else if (this.state.score < 4500) {
        this.changeInfo('MAX', t('こ、このままだと、負けてしまう。。あれを準備しよう。。。'), '', timeId, 150)
      } else {
        this.changeInfo(t('奥義発動'), t('勝たせない！'), '', timeId, 10)
      }
    }
    this.fallblock(false)
  }

  // i18nextのAPIでブラウザの言語を習得して判別しているが、対応していない言語は全て英語にする関数を実行する
  checkLanguage () {
    const language = this.state.language
    const { i18n } = this.props
    if (language === '') {
      window.navigator.language === 'ja' ? i18n.changeLanguage('ja') : i18n.changeLanguage('en')
      this.setState({
        language: 'SETED'
      })
    }
  }

  startGame () {
    this.checkLanguage()
    this.mainloop()
  }

  componentDidMount () {
    this.startGame()
  }

  render () {
    const history = this.state.histories
    const current = history[history.length - 1]
    const { t, i18n } = this.props

    return (
      <div className='wrapper-container'>
        <div className='tetris'>
          <div className='title'>
            <h1>{t('最難テトリス ”ナカヤマン” Ver2.0')}</h1>
            <p className='explain'>{t('スコア5000点以上とって、ナカヤマンをぶっ倒せ！！！')}</p>
          </div>
          <div className='button'>
            <button type='button' className='changeLanguage' onClick={() => { i18n.changeLanguage('ja') }}>日本語</button>
            <button type='button' className='changeLanguage' onClick={() => { i18n.changeLanguage('en') }}>English</button>
          </div>
          <div className='tetris-container'>
            <Board
              board={current.board}
              color={this.state.currentBlock.color}
              figures={this.state.currentBlock.figures}
            />
            <div className='tetris-panel-container'>
              <div className='information'>
                <div className='tetris-nextBlock'>
                  <p>{t('次のブロック')}:</p>
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(Tetris)
