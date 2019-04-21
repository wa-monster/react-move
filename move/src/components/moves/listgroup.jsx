import React from 'react'

const ListGroup = (props)=>{
    //组件化，如何降低耦合度
    const {
        items, 
        textProperty, 
        valueProperty, 
        onItemSelect,
        selectItem
    } = props
    return (
        <ul className="list-group">
            {
                items.map(item=>{
                    return(
                        <li 
                            onClick={()=>{onItemSelect(item)}}
                            key={item[valueProperty]} 
                            className={`list-group-item ${item === selectItem ? 'active' : ''}`}
                        >
                            {item[textProperty]}
                        </li>
                    )
                    
                })
            }
        </ul>
    )
}

ListGroup.defaultProps = {
    textProperty:'name',
    valueProperty:'_id',
}

export default ListGroup