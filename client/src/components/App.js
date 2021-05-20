import './App.css'

import { Component } from 'react'

import Routes from './routes/Routes'
import Footer from './layout/Footer/Footer'

import AuthService from './../service/auth.service'


class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedUser: undefined
    }
    this.authService = new AuthService()
  }

  fetchUser() {
    this.authService
      .isLoggedIn()
      .then(response => this.setState({ loggedUser: response.data }))
      .catch(() => this.setState({ loggedUser: undefined }))
  }

  storeUser = loggedUser => this.setState({ loggedUser })

  componentDidMount() {
    this.fetchUser()
  }


  render() {

    return (
      <>
        <main>
          <Routes />
        </main>

        <Footer />
      </>
    )

  }
}


export default App
