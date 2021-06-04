import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Component } from 'react'

import Routes from './routes/Routes'
import Navigation from './layout/Navigation/Navigation'
import Footer from './layout/Footer/Footer'

import Alert from './shared/Alert/Alert'

import AuthService from './../service/auth.service'


class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedUser: undefined,
      showAlert: false,
      alertText: ''
    }
    this.authService = new AuthService()
  }

  fetchUser() {
    this.authService
      .isLoggedIn()
      .then(response => {
        this.setState({ loggedUser: response.data })
      })
      .catch(err => {
        this.setState({loggedUser: null})
        this.handleAlert(err.response.data.message)
      })
  }

  storeUser = loggedUser => this.setState({ loggedUser })

  handleAlert(alertText, showAlert = true) {
    this.setState({ showAlert, alertText })
  }

  logout = () => {

    const authService = new AuthService()

    authService
        .logout()
        .then(response => {
            this.storeUser(null)
            this.handleAlert(response.data.message)
        })
        .catch(err => this.handleAlert(err.response.data.message) )
  }

  componentDidMount() {
    this.fetchUser() 
  }

  render() {

    return (
      <>
        <Navigation
          loggedUser={this.state.loggedUser}
          logout={() => this.logout()}
        />

        <main>
          {
            this.state.loggedUser === undefined ?
              <h1>LOADING USER</h1>
            :
              <Routes
                loggedUser={this.state.loggedUser}
                logout={() => this.logout()}
                storeUser={user => this.storeUser(user)}
                handleAlert={alertText => this.handleAlert(alertText)}
              />
          }
        </main>

        <Footer />

        <Alert handleAlert={(alertText, showAlert) => this.handleAlert(alertText, showAlert)} show={this.state.showAlert} text={this.state.alertText} />
      </>
    )

  }
}


export default App
