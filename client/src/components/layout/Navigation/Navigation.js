import './Navigation.css'

import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = ({ loggedUser = 'guest', logout }) => {

    const navbarWelcome = role => {
        switch (role) {
            case 'citizen':
                return <Link to="/profile" className="nav-link">{loggedUser.name}</Link>
            
            case 'director':
                return <Link to="/directorLandingPage" className="nav-link">Greetings Director {loggedUser.name}.</Link>
            
            case 'agent':
                return <Link to="/agentLandingPage" className="nav-link">WELCOME AGENT: {loggedUser.username}</Link>
            
            default:
                return <Link to="/" className="nav-link">'AGENCY LOGO'</Link>
        }
    }

    const navbarMainLink = role => {
        switch (role) {
            case 'citizen':
                return "/planner"
            
            case 'director':
                return "/directorLandingPage"
            
            case 'agent':
                return "/agentLandingPage"
            
            default:
                return "/"
        }
    }
    

    return (
        <Navbar bg="dark" variant="dark">

            <Nav className="align-items-center justify-content-between">
                {navbarWelcome(loggedUser.role)}
                <Link to={navbarMainLink(loggedUser.role)} className="nav-link"> S.P.Y. Planner </Link>
                {
                    loggedUser === 'guest' ?
                        <>
                            <Link to="/signup" className="nav-link">SignUp</Link>
                            <Link to="/login" className="nav-link">Login</Link>
                        </>
                    :
                        <Link onClick={() => logout()} to="/" className="nav-link">Logout</Link>    
                }
            </Nav>

        </Navbar>
    )
}

export default Navigation