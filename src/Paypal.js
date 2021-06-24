import React from 'react'
import ReactDOM from 'react-dom'
import './i18n'
import { withTranslation } from 'react-i18next'

const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM })

class Paypal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  createOrder (data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: this.state.text
          }
        }
      ]
    })
  }

  onApprove (data, actions) {
    return actions.order.capture()
  }

  render () {
    const { t } = this.props
    return (
      <div className='Paypal'>
        <p id='donate'>{t('ナカヤマンを餌付けする')}</p>
        <div id='priceField'>
          <label htmlFor='price'>{t('餌付(ドル)')}</label><br />
          <input
            type='number' name='price' id='price' value={this.state.text} placeholder={t('金額を入力する')}
            onChange={(e) => this.setState({ text: e.target.value })}
          />
        </div>
        <PayPalButton
          createOrder={(data, actions) => this.createOrder(data, actions)}
          onApprove={(data, actions) => this.onApprove(data, actions)}
        />
      </div>
    )
  }
}

export default withTranslation()(Paypal)
