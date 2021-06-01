import { Link } from 'react-router-dom'

import SignupForm from './SignupForm'

const Signup = ({ history, handleAlert }) => {

    return (

        <>

            <h1>User Signup</h1>

            <hr />

            <SignupForm history={history} handleAlert={handleAlert}/>

            <hr />

            <Link to="/login">Login</Link>

        </>

    )
}

export default Signup