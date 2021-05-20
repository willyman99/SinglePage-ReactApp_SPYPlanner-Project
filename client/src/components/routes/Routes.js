import { Switch, Route} from 'react-router-dom'

import IndexPage from '../pages/Index/Index-Page'


const Routes = ({ storeUser, loggedUser, handleAlert }) => {

    return (
        <Switch>
            <Route path="/" exact render={() => <IndexPage />} />
        </Switch>
    )
}

export default Routes