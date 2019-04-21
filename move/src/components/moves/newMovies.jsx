import React from 'react'
import Form from '../base/form'
import Joi from 'joi-browser'
import * as movies from '../../services/fakeMovieService'
import * as Genre from '../../services/fakeGenreService'

class newMoviesForm extends Form {
    state={
        data:{
            title:'',
            genre:'',
            numberInStock:'',
            rate:''
        },
        errors:{},
    }
    schema={
        title:Joi.string().required().label('Title'),
        genre:Joi.string().required().label('Genre'),
        numberInStock:Joi.number().required().min(1).max(100).label('NumberInStock'),
        rate:Joi.number().required().min(1).max(10).label('Rate'),

    }
    doSubmit = (e) => {
        this.handleSubmit(e)
        console.log('addMovies')
    }
    saveMovies = ()=>{
        let data = {...this.state.data}
        data.genre = Genre.genres.filter(g => g.name === data.genre)[0]
        movies.saveMovie(data)
        this.props.history.push('/movies')
    }
    render(){
        return (
            <div>
                <h1>Movies Form</h1>
                <form onSubmit={this.doSubmit}>
                    {this.renderInput('title','Title')}
                    {this.renderInput('genre','Genre')}
                    {this.renderInput('numberInStock','Number in Stock')}
                    {this.renderInput('rate','Rate')}
                    <button 
                        disabled={this.validate()}  
                        className="btn btn-primary"
                        onClick={this.saveMovies}
                    >
                        save
                    </button>
                </form>
            </div>
        )
    }
}
export default newMoviesForm