import axios from 'axios'


class AuthService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/auth',
            withCredentials: true
        })
    }

    signup = userInfo => this.app.post('/signup', userInfo) //username pwd name => msg: 'User created'
    login = userInfo => this.app.post('/login', userInfo) //username pwd => CurrentUser.json
    logout = () => this.app.get('/logout') // => msg: 'Logout succesful'
    isLoggedIn = () => this.app.get('/isloggedin') // => CurrentUser.json || msg: 'Unauthorized Access'

    isCitizen = () => this.app.get('/isCitizen') // => CurrentUser.json || msg: 'Unauthorized Access'
    isDirector = () => this.app.get('/isDirector') // => CurrentUser.json || msg: 'Unauthorized Access'
    isAgent = () => this.app.get('/isAgent') // => CurrentUser.json || msg: 'Unauthorized Access'
}


export default AuthService