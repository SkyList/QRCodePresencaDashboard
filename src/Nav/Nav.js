import React, { Component } from 'react';
import './Nav.css'

class Nav extends Component {
    constructor(props){
        super(props)
        this.state={
            time: '00:00'
        }
        this.timer = this.timer.bind(this) 
    }
    componentDidMount(){
        this.timer()
    }

    timer(){
        let date = new Date()
        this.setState({ time: date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds() })
        setTimeout( this.timer, 1000 )
    }

    render() {
        return (
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <h1>{this.state.time}</h1>
                </li>
            </ul>

        )
    }

    
}
export default Nav