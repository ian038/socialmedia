import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Menu from './components/Nav/Menu'
import Home from './components/Home'
import Signup from './components/User/Signup'
import Signin from './components/User/Signin'

export default function Main() {
    return (
        <BrowserRouter>
            <Menu />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/signin' component={Signin} />
            </Switch>
        </BrowserRouter>
    )
}