import React from 'react'
import Form from '../base/form'

import Joi from 'joi-browser'
import {getMovie, saveMovie} from '../../services/fakeMovieService'
import { getGenres } from '../../services/fakeGenreService'

class MoviesForm extends Form {
    state={
        data:{
            title:'',
            genreId:'',
            numberInStock:'',
            dailyRentalRate:''
        },
        genres:[],
        errors:{},
    }
    schema={
        title:Joi.string().required().label('Title'),
        genreId:Joi.string().required().label('Genre'),
        numberInStock:Joi.number().required().min(1).max(100).label('NumberInStock'),
        dailyRentalRate:Joi.number().required().min(1).max(10).label('Rate'),

    }
    componentDidMount(){
        let genres = getGenres()
        this.setState({genres})
        let movieId = this.props.match.params.id
        if(movieId === 'new') return 


        const movie = getMovie(movieId)
        if(!movie) return this.props.history.replace('/not-found')
        this.setState({data:this.mapToViewModel(movie)})
    }

    mapToViewModel(movie){
        return {
            _id:movie._id,
            title:movie.title,
            genreId:movie.genre._id,
            numberInStock:movie.numberInStock,
            dailyRentalRate:movie.dailyRentalRate,
        }
    }
    doSubmit = (e) => {
        this.handleSubmit(e)

        saveMovie(this.state.data)
        console.log('addMovies')
        this.props.history.push('/movies')
    }
    render(){
        return (
            <div>
                <h1>Movies Form</h1>
                <form onSubmit={this.doSubmit}>
                    {this.renderInput('title','Title')}
                    {this.renderSelect('genreId','Genre',this.state.genres)}
                    {this.renderInput('numberInStock','Number in Stock')}
                    {this.renderInput('dailyRentalRate','Rate')}
                    {this.renderButton('save')}
                </form>
            </div>
        )
    }
}
export default MoviesForm