import React, { Component } from 'react'
import { Route, Redirect,Switch } from 'react-router-dom'
import Movies from './components/moves/moves'
import Header from './components/header'
import Customers from './components/DiErGe/customers'
import Rentals from './components/DiSanGe/rentals'
import NotFound from './components/404'
import MoviesForm from './components/moves/moviesForm'
import LoginForm from './components/login/loginForm'
import RegisterForm from './components/register/registerForm'
import './App.css'

class App extends Component{
    render(){
        return (
            <React.Fragment>
                <Header></Header>
                <main>  
                    <Switch>
                        <Route path='/register' component={RegisterForm}></Route>
                        <Route path='/login' component={LoginForm}></Route>
                        <Route path='/movies/:id' component={MoviesForm}></Route>
                        <Route path="/movies" component={Movies}></Route>
                        <Route path="/customers" component={Customers}></Route>
                        <Route path="/rentals" component={Rentals}></Route>
                        <Route path="/not-found" component={NotFound}></Route>
                        <Redirect from='/' exact to='/movies' />
                        <Redirect to='/not-found' />
                    </Switch>
                </main>
            </React.Fragment>
            
        )
    }
}

export default App 