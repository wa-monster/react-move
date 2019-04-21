import React from 'react'
import Form from '../base/form'
import Joi from 'joi-browser'

class RegisterForm extends Form {
    state = {
        data:{
            username:'',
            password:'',
        },
        errors:{}
    }
    schema = {
        username: Joi.string().required().email().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name'),
    }
    doSubmit= (e) => {
        this.handleSubmit(e)

        console.log('doSubmit--Register')
    }
    render(){
        return (
            <div style={{margin:"20px 100px"}}>
                <h1>
                    Register
                </h1>
                <form onSubmit={this.doSubmit}>
                    {this.renderInput('username','Username')}
                    {this.renderInput('password','Password','password')}
                    {this.renderInput('name','Name')}
                    {this.renderButton('register')}
                </form>
            </div>
        )
    }
}

export default RegisterForm