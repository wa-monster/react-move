import React ,{ Component} from 'react'
import Pagenation from './pagenation'
import ListGroup from './listgroup'
import MoviesTable from './moviesTable'
import SearchBox from './searchBox'
import { getMovies } from '../../services/fakeMovieService'
import { getGenres } from '../../services/fakeGenreService'
import _ from 'lodash'

class Movies extends Component{
    constructor(props){
        super(props)
        this.state = {
            movies:[],
            currentPage:0,
            pageSize:4,
            genres:[],
            selectGenre:[],
            searchQuery:'',
            selectedGenre: null,
            sortColumn:{path:"title", order:'asc'}
        }
    }
    componentWillMount(){
        let genres = [{name:'All Genres',_id:''},...getGenres()]
        this.setState({
            movies:getMovies(),
            genres,
            selectGenre:getMovies()
        })
    }

    onGenresSelect(genre){
        let newMovies
        genre === this.state.genres[0] ?
            newMovies = getMovies()
            :
            newMovies = getMovies().filter((item)=>{
                return genre.name === item.genre.name
            })
        this.setState({
            selectGenre:genre,
            movies:newMovies,
            currentPage:0,
            searchQuery:'',
        })
    }

    onSort = (sortColumn) => {
        this.setState({sortColumn})
    }

    //表格的
    handleDelete(item){
        let {movies} = this.state 
        let index = movies.indexOf(item)
        movies.splice(index,1)
        this.setState((pre)=>{
            return {
                movies,
            }
        })
    }


    getPageData(){
        let {
            movies, 
            currentPage, 
            pageSize, 
            sortColumn,
            searchQuery,
            selectGenre
        } =this.state
        let currentMovies =  movies.slice(currentPage*pageSize, (currentPage+1)*pageSize)
        if(searchQuery){
            currentMovies = movies.filter(m=>{
               return  m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            })
        }else if(selectGenre && selectGenre._id){
            currentMovies = _.orderBy( currentMovies,[sortColumn.path],[sortColumn.order])
            
        }
        return currentMovies
    }


    //分页的
    changePage(index){
        this.setState({
            currentPage:index,
        })
    }

    handleSearch = query=>{
        this.setState({
            searchQuery:query,
            selectedGenre:null,
            currentPage: 1,
        })
    }

    render(){

        let {
            movies, 
            pageSize, 
            genres, 
            selectGenre,
            sortColumn,
            searchQuery
        } = this.state
        if(getMovies().length === 0) return <p>there is no database</p> 

        let currentMovies = this.getPageData()
        return (
            <div className='row'>
                <div className='col-3'>
                    <ListGroup 
                        items={genres} 
                        onItemSelect={this.onGenresSelect.bind(this)}
                        selectItem={selectGenre}
                    />
                </div>
                <div className='col-8'>
                    <button className='btn btn-primary' onClick={()=>{this.props.history.push('/movies/new')}}>
                        New Movies
                    </button>
                    <p>Showing {currentMovies.length} movies in the database</p>
                    <SearchBox value={searchQuery}  onChange={this.handleSearch} />
                    <MoviesTable 
                        currentMovies={currentMovies}
                        onDelete={this.handleDelete.bind(this)} 
                        onSort={this.onSort}
                        sortColumn={sortColumn}
                    /> 
                    <Pagenation 
                        changePage={this.changePage.bind(this)} 
                        pageSize={pageSize}
                        moviesLength={movies.length}
                    />
                </div>
            </div >
        )
    }
}

export default Movies