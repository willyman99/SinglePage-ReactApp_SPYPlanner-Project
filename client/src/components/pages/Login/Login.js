import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'

const Login = ({ storeUser, history, handleAlert }) => {

    return (

        <>

            <h1>User Login</h1>

            <hr />

            <LoginForm storeUser={storeUser} history={history} handleAlert={handleAlert}/>

            <hr />

            <Link to="/signup">Signup</Link>

        </>

    )
}

export default Login