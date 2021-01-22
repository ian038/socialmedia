import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Menu from './components/Nav/Menu'
import Home from './components/Home'
import Profile from './components/User/Profile'
import Signup from './components/User/Signup'
import Signin from './components/User/Signin'
import Users from './components/User/Users'
import EditProfile from './components/User/EditProfile'
import PrivateRoute from './auth/PrivateRoute'
import FindPeople from './components/User/FindPeople'
import NewPost from './components/Post/NewPost'
import SinglePost from './components/Post/SinglePost'
import EditPost from './components/Post/EditPost'
import ForgotPassword from './components/User/ForgotPassword'

export default function Main() {
    return (
        <BrowserRouter>
            <Menu />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/forgot-password' component={ForgotPassword} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/signin' component={Signin} />
                <PrivateRoute exact path='/user/:userId' component={Profile} />
                <PrivateRoute exact path='/user/edit/:userId' component={EditProfile} />
                <PrivateRoute exact path='/findpeople' component={FindPeople} />
                <Route exact path='/users' component={Users} />
                <PrivateRoute exact path='/post/edit/:userId/:postId' component={EditPost} />
                <PrivateRoute exact path='/post/create' component={NewPost} />
                <PrivateRoute exact path='/post/:postId' component={SinglePost} />
            </Switch>
        </BrowserRouter>
    )
}