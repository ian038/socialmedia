import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Menu from './components/Nav/Menu'
import Home from './components/Home'
import Profile from './components/User/Profile'
import Signup from './components/User/Signup'
import Signin from './components/User/Signin'
import Users from './components/User/Users'
import PrivateRoute from './auth/PrivateRoute'

export default function Main() {
    return (
        <BrowserRouter>
            <Menu />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/signin' component={Signin} />
                <Route exact path='/user/:userId' component={Profile} />
                <Route exact path='/users' component={Users} />
            </Switch>
        </BrowserRouter>
    )
}