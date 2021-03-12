import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const tbody = [];
    const x= 5;
    const y = 5; 
    console.log(this.props)

    for(let i=0; i< y; i++){
      const row = [];
      for (let j = 0; j < x; j++){
        row.push(<td className = { 
          this.props.coordinates.x === j && this.props.coordinates.y === i
          ? `block-type-${this.props.color}`
          : `block-type-null`
        } onClick = {() => this.props.onClick()}></td>)
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
      coordinates: {
        x : 2,
        y : 0,
      },
      color: "blue"
    }
  }

  fallblock() {
    this.setState({
      coordinates: {
        x : this.state.coordinates.x,
        y : this.state.coordinates.y + 1
      }
    })
  }
  
  render() {

    setTimeout(this.fallblock.bind(this), 1000)

    return(
      <Board color ={this.state.color} coordinates = {this.state.coordinates} onClick ={() => this.fallblock()}/>
    )
  }
}

ReactDOM.render(
  <Tetris />,
  document.getElementById('root')
)