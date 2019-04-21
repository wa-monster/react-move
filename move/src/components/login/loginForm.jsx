import React  from 'react'
import Joi from 'joi-browser'
import Form from '../base/form'

class LoginForm extends Form {
    state = {
        data:{
            username:'',
            password:'',
        },
        errors:{}
    }
    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    }
    doSubmit= (e) => {
        this.handleSubmit(e)

        console.log('doSubmit--Login')
    }
    render(){
        return (
            <div style={{margin:"20px 100px"}}>
                <h1>
                    login
                </h1>
                <form onSubmit={this.doSubmit}>
                    {this.renderInput('username','Username')}
                    {this.renderInput('password','Password','password')}
                    {this.renderButton('login')}
                </form>
            </div>
        )
    }
}

export default LoginForm