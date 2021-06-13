import React from 'react'
import ReactDOM from 'react-dom'
import 'ress'
import './index.css'
import GA4React from 'ga-4-react'
import Tetris from './Tetris'

const ga4react = new GA4React('G-GB64VYNVM1');
(async () => {
  await ga4react.initialize()
  ReactDOM.render(
    <React.StrictMode>
      <Tetris />
    </React.StrictMode>,
    document.getElementById('root')
  )
})()
