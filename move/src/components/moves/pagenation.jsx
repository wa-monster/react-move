import React, { Component } from "react"
import _ from 'lodash'
import PropTypes from 'prop-types'

let pageArr
let pageCount
class Pagenation extends Component{
    constructor(props){
        super(props)
        this.sate={

        }
    }
    targetPage(index){
        this.props.changePage(index)
    }
    componentWillMount(){
        let { pageSize, moviesLength } = this.props
        this.calcu(pageSize, moviesLength)
    }
    componentWillReceiveProps(nextProps){
        let { pageSize, moviesLength } = nextProps
        this.calcu(pageSize, moviesLength)
    }
    calcu(pageSize, moviesLength){
        pageCount = Math.ceil(moviesLength/pageSize)
        pageArr = _.range(1, pageCount + 1)
    }
    render(){
        
        if(pageCount <= 1){
            return null
        }
        
        return (
            <nav aria-label="Page navigation example">
                    
                    <ul className="pagination">
                        {pageArr.map((item,index)=>{
                            
                            return (
                                <li key={index} className="page-item" onClick={()=>{this.targetPage(index)}}>
                                    <span className="page-link">{item}</span>
                                </li>
                                )
                        })
                    }
                    </ul>
            </nav>
            
        )
    }
}

// eslint-disable-next-line react/no-typos
Pagenation.propTypes = {
    changePage:PropTypes.func,
    pageSize:PropTypes.number,
    moviesLength:PropTypes.number
}

export default Pagenation