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
            institute: 'UNITINS',
            materia: 'DISPOSITIVOS MOVEIS',
            txtqr: 'DEFAULT',
            showQR: false,
            students: []
        }
        this.signoutUser = this.signoutUser.bind(this)
        this.studentsRender = this.studentsRender.bind(this)
        this.generateQR = this.generateQR.bind(this)
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
    renderMATERIAS(item) {
        return (
            <div>
                <p>{item.materia}</p>
                <p>{item.institution}</p>
                <p>{item.preceptor}</p>
                <p>{item.timeCheckin}</p>
            </div>
        )
    }

    studentsRender(item, index) {
        return (
            <div className="col-sm">
                <div key={item.index} className="card m-2" style={{ width: 18 + 'rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">{item.name.toUpperCase()}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{}</h6>
                        <p className="card-text">...</p>
                        <a href="#" className="card-link">View all</a>
                    </div>
                </div>
            </div>
        )
    }

    generateQR() {
        let txt;
        let prmp = prompt("Digite uma palavra passe.", "DEFAULT")
        if (prmp == null || prmp == "") {
            txt = "Cancel"
        }
        else {
            txt = prmp;
            this.setState({ txtqr: txt, showQR: true });

        }

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

                        <h4 className="mx-auto text-info">{this.state.name.toUpperCase()}</h4>
                        {
                            this.state.showQR &&
                            <select onChange={(e) => this.setState({ institute: e.target.value })} className="form-control bg-dark text-white border-dark badge-pill m-2 text-center">
                                <option value='UNITINS'>UNITINS</option>
                                <option value='CATOLICA' >CATÓLICA</option>
                                <option value='UFT'>UFT</option>
                            </select>
                        }
                        {
                            this.state.showQR &&
                            <select onChange={(e) => this.setState({ materia: e.target.value })} className="form-control bg-dark text-white border-dark badge-pill m-2 text-center">
                                <option value='DISPOSITIVOS MOVEIS'>DISPOSITIVOS MOVEIS</option>
                                <option value='DESENVOLVIMENTO WEB' >DESENVOLVIMENTO WEB</option>
                                <option value='ALGORITMOS'>ALGORITMOS</option>
                            </select>
                        }
                        <button onClick={this.generateQR} className="btn btn-dark btn-block badge-pill m-2">Generate QR</button>
                        <button onClick={this.signoutUser} className="btn btn-danger btn-block badge-pill m-2">Signout</button>
                    </div>
                    <div className='col-9' style={{ backgroundColor: '#202020' }}>
                        {
                            !this.state.showQR &&
                            <div className="row container">
                                {
                                    this.state.students.map(this.studentsRender)
                                }
                            </div>
                        }
                        {this.state.showQR &&
                            <div className='p-2 bg-white container'>
                                <div className='row'>
                                    <div className='col'>
                                        <h2>{this.state.name.toUpperCase()}</h2>
                                        <h1>{this.state.materia.toUpperCase()}</h1>
                                    </div>
                                    <div className='col'>
                                        <QRCode value={this.state.materia + ";" + this.state.name.toUpperCase() + ';' + this.state.txtqr.toUpperCase() + ';' + this.state.institute} size={window.innerHeight * .4} />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>
        )
    }
}
export default HomePage