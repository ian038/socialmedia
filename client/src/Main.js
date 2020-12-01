import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/user/Signup'

export default function Main() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/signup' component={Signup} />
            </Switch>
        </BrowserRouter>
    )
}