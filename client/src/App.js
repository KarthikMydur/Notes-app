import React from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import Login from './login'
import Home from './Home'
import Register from './register'
import ListNote from './components/notes/ListNote'
import ListCategory from './components/categories/ListCategory'
import NewCategory from './components/categories/NewCategory'
import { connect } from 'react-redux'
import NewNote from './components/notes/NewNote'
import EditNote from './components/notes/EditNote'
import Bin from './components/notes/Bin'
import Archives from './components/notes/Archives'
import { startRemoveUser } from './actions/login'

function App (props) {

    const handleLogout = () => {
      props.dispatch(startRemoveUser())
    }

    return (
        <BrowserRouter>
            { Object.keys(props.user).length != 0 ? (
              <div>
                <Link to ="/">Home  |</Link>
                <Link to = "/notes">  Notes |</Link>
                <Link to = "/categories"> Categories  |</Link>
                <Link to = '/archives'> Archived  |</Link>
                <Link to = "/bin">  Bin   |</Link>
                <Link to ="/logout" onClick = { handleLogout }> Logout</Link>
              </div>
            ) : (
              <div>
                <Link to = "/">Home |</Link>
                <Link to ="/register">Register  |</Link>
                <Link to = "/login">Login</Link>
              </div>
            )}
            <Switch>
              <Route exact path = "/" component = { Home } />
              <Route path = "/register" component = { Register } />
              <Route path = "/login" component = { Login } />
              <Route exact path = "/notes" component = { ListNote } />
              <Route path = "/notes/new" component = { NewNote } /> 
              <Route exact path = '/categories' component = { ListCategory } />
              <Route path = "/categories/new" component = { NewCategory } />
              <Route path = "/notes/edit/:id" component = { EditNote } />
              <Route path = "/bin" component = { Bin } />
              <Route path = "/archives" component = { Archives } />
            </Switch>
              
        </BrowserRouter>
        
    )
}

const mapStateToProps = (state) => {
  return {
    user : state.user
  }
}

export default connect(mapStateToProps)(App)