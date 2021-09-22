import React, { Component } from 'react';
import axios from 'axios';
import logo from './../../assets/helo_logo.png';
import './Auth.css';
import { connect } from 'react-redux'
import { updateUser,logout } from './../../redux/reducer'
import { withRouter } from 'react-router';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      password: '',
      errorMsg: ''
    }
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    })
  }

  login() {
    const { user_name, password } = this.state
    axios.post('/api/auth/login', this.state)
      .then(res => {
        this.props.history.push("/dash") // marked
        // this.props.updateUser(res.data)
      })
      .catch(err => {
        console.log(err)
        this.setState({errorMsg: 'Incorrect username or password!'})
      })
  }

  register() {
    axios.post('/api/auth/register', this.state)
      .then(res => {
        this.props.history.push("/dash") // marked
      })
      .catch(err => {
        console.log(err)
        this.setState({errorMsg: 'Username taken!'})
      })
  }

  closeErrorMessage = () => {
    this.setState({
      errorMsg: false, 
      user_name: '', 
      password: ''
    })
  }

  render() {
    return (
      <div className='auth'>
        <div className='auth-container'>
          <img src={logo} alt='logo' />
          <h1 className='auth-title'>Helo</h1>
          {this.state.errorMsg && <h3 className='auth-error-msg'>{this.state.errorMsg} <span onClick={this.closeErrorMessage}>X</span></h3>}
          <div className='auth-input-box'>
            <p>Username:</p>
            <input value={this.state.user_name} onChange={e => this.handleChange('user_name', e.target.value)} />
          </div>
          <div className='auth-input-box'>
            <p>Password:</p>
            <input value={this.state.password} type='password' onChange={e => this.handleChange('password', e.target.value)} />
          </div>
          <div className='auth-button-container'>
            <button className='dark-button' onClick={this.login}> Login </button>
            <button className='dark-button' onClick={this.register}> Register </button>
          </div>
        </div>
      </div>
    );
  }
}

// export default Auth;
export default withRouter(connect(null, {updateUser})(Auth))