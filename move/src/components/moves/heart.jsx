import React, { Component } from 'react'
import 'font-awesome/css/font-awesome.css'

class Heart extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLiked:false
        }
    }

    componentDidMount(){
        let liked = this.props.liked
        this.setState({
            isLiked:liked
        })
    }

    changeColorHeart(){
        let {isLiked} = this.state
        this.setState({
            isLiked:!isLiked
        })
    }
    render(){
        let { isLiked } = this.state
        return (
            <React.Fragment>
                {isLiked ?
                    <i className="fa fa-heart" onClick={()=>this.changeColorHeart()} aria-hidden="true"></i>
                    :
                    <i className="fa fa-heart-o" onClick={()=>this.changeColorHeart()} aria-hidden="true"></i>
                }
            </React.Fragment>
        )
    }
}

export default Heart