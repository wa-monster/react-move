import React, {Component} from 'react'
import Joi from 'joi-browser'
import Input from './input'
import Select from './select'

class Form extends Component{
    constructor(prop){
        super(prop)
        this.state={
            data:{},
            errors:{}
        }
    }
    validateProperty = ({name, value}) => {
        const obj = {name: value}
        const schema = {name:this.schema[name]}
        let {error} = Joi.validate(obj,schema)
        return error ? error.details[0].message : null
    }
    validate = () =>{
        const options = {abortEarly: false}
        const {error} = Joi.validate(this.state.data, this.schema, options)
        if(!error) return null
        const errors = {}
        for(let item of error.details){
            errors[item.path] = item.message 
        }
        return errors
    }
    handleChange = ({target:input})=>{
        let errors = {...this.state.errors}
        let errorsMessage = this.validateProperty(input)
        if(errorsMessage) errors[input.name] = errorsMessage
        else delete errors[input.name]
        let data={...this.state.data}
        data[input.name] = input.value
        this.setState({data,errors})
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        const errors = this.validate()
        console.log(errors)
        this.setState({errors: errors || {} })
        if(errors){
            return 
        }
    }
    renderButton(text){
        return (
            <button 
                disabled={this.validate()}  
                className="btn btn-primary"
            >
                {text}
            </button>
                
        )
    }
    renderInput(name,label,type='text'){
        let {data,errors} = this.state
        return (
            <Input
                type={type}
                value={data[name]}
                onChange={this.handleChange}
                label={label}
                name={name}
                error = {errors[name]} 
            /> 
        )
    }
    renderSelect(name,label,options){
        let {data, errors} = this.state
        return(
            <Select
                name={name}
                value={data.name}
                label={label}
                options={options}
                onChange = {this.handleChange}
                error = {errors[name]}
            />
        )
        
    }
}

export default Form