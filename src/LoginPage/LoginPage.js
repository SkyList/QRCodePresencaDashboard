import React, { Component } from 'react';
import './LoginPage.css'
import user from '../images/user.png'
import API from '../API/API'
import { Redirect } from 'react-router-dom'
import HomePage from '../HomePage/HomePage';


class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.signinCheck = this.signinCheck.bind(this)
        this.state = {
            redirect: false
        }
    }

    signinCheck(e) {
        e.preventDefault()
        API.signinUser( this.refs.email.value, this.refs.password.value )
            .then( 
                ()=> this.setState({ redirect: '/home' }),
                //console.log('Welcome, ', API.refAuth.currentUser )
            )
    }

    render() {
        return (
            <div className='LoginPage'>
            {
                this.state.redirect &&
                <Redirect to={ this.state.redirect }/>
            }
                <div className="row justify-content-center inputArea">
                    <form onSubmit={this.signinCheck} >
                        <img src={user} alt="User" className="rounded mx-auto d-block mb-5" />
                        <div className="form-group">
                            <input type="email" className="form-control bg-dark text-white badge-pill border-dark" ref="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control bg-dark text-white badge-pill border-dark" ref="password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-dark btn-block badge-pill" >Signin</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginPage;
