import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Heart from './heart'
import Table from './common/table'




class MoviesTable extends Component{
    columns = [
        {path:'title',
            label: 'Title', 
            content: movie => 
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        },
        {path:'genre.name',label: 'Genre'},
        {path:'numberInStock',label: 'Stock'},
        {path:'dailyRentalRate',label: 'Rate'},
        {key:'like', 
            content: movie =>(
                <Heart liked={movie.liked}/>
                )
        },
        {
            key:'delete', 
            content:item => (
                <button onClick={()=>this.props.onDelete(item)} className="btn btn-danger btn-sm">
                    Delete
                </button>
                )
        },
    ]
    raiseSort = path => {
        let sortColumn = {...this.props.sortColumn}
        if(path === sortColumn.path){
            sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
        }else{
            sortColumn.path = path 
            sortColumn.order = 'asc'
        }
        this.props.onSort(sortColumn)
    } 
    render(){
        let {currentMovies, onSort, sortColumn} = this.props
        return (
            <Table
                columns={this.columns}
                onSort = {onSort}
                sortColumn = {sortColumn}
                data={currentMovies}
            >
            </Table>  
        )
    }
}


export default MoviesTable