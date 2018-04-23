import React, { Component } from 'react';
import './HomePage.css'
import user from '../images/user.png'
import API from '../API/API'
import { Redirect } from 'react-router-dom'
import QRCode from 'qrcode-react'

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            name: 'USER_NAME',
            students: []
        }
        this.signoutUser = this.signoutUser.bind(this)
        this.studentsRender = this.studentsRender.bind(this)
    }
    componentWillMount() {
        API.loadData('users/students/')
            .on('value',
                (snap) => {
                    this.setState({ students: Object.values(snap.val()) })
                }
            )
    }

    componentDidMount() {
        let cUser = API.refAuth.currentUser
        cUser == null ? this.setState({ redirect: '/' }) : this.setState({ name: cUser.displayName })
        console.log(this.state.students)
    }

    signoutUser() {
        API.signOutUser().then(() => this.setState({ redirect: '/' }), )
    }

    studentsRender(item) {
        return (
            <div className="col-sm">
                <div className="card m-2" style={{ width: 18 + 'rem;' }}>
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>
            </div>
        )
    }

    generateQR() {
        return <QRCode value="MATERIA 3;PROFESSOR 3;CACHORRO;UNITINS" bgColor='#ffffff' fgColor='#222' size={window.innerHeight * .8} />
    }

    render() {
        return (
            <div className='HomePage container-flex'>

                {
                    this.state.redirect &&
                    <Redirect to={this.state.redirect} />
                }

                <div className="row justify-content-center">
                    <div className='col-3'>
                        <img src={user} alt="User" className="rounded mx-auto d-block m-5 img" />

                        <h4 className="mx-auto text-info">{this.state.name}</h4>

                        <button onClikc={this.generateQR} className="btn btn-dark btn-block badge-pill m-2">Generate QR</button>
                        <button onClick={this.signoutUser} className="btn btn-danger btn-block badge-pill m-2">Signout</button>
                    </div>
                    <div className='col-9' style={{ backgroundColor: '#202020' }}>
                        <div className="row container">
                            {
                                this.state.students.map(this.studentsRender)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomePage