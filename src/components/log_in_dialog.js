import React from 'react'
import { connect } from 'react-redux'

import { Dialog, InputGroup, Button, Intent } from '@blueprintjs/core'

import { getToken } from '../actions.js'

function mapStateToProps({ token }) {
  return { token }
}

const mapDispatchToProps = { getToken }

class LogInDialog extends React.Component {
  state = { email: '', password: '' }

  handleChangeEmail = e => this.setState({ email: e.target.value })
  handleChangePassword = e => this.setState({ password: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
    this.props
      .getToken(this.state)
      .then(
        json =>
          json.token !== false && this.setState({ email: '', password: '' })
      )
  }

  render() {
    const { token, getToken } = this.props
    return (
      <Dialog
        inline
        title="Log In to Spectacles"
        iconName="log-in"
        isOpen={!token}
      >
        <form onSubmit={this.handleSubmit}>
          <div className="pt-dialog-body">
            <div
              className="pt-callout pt-icon-error"
              style={{ marginBottom: '1em' }}
            >
              You must authenticate to access the Spectacles administration
              panel.
            </div>
            <div style={{ marginBottom: '0.5em' }}>
              <InputGroup
                type="email"
                leftIconName="envelope"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChangeEmail}
              />
            </div>
            <InputGroup
              type="password"
              leftIconName="lock"
              placeholder="Password"
              intent={this.props.token === false ? Intent.DANGER : null}
              style={{ marginBottom: '1em' }}
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
          </div>
          <div className="pt-dialog-footer">
            <Button type="submit" text="Submit" intent={Intent.PRIMARY} />
          </div>
        </form>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInDialog)
