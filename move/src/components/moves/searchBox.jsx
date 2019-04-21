import React from 'react'

const SearchBox = ({value,onChange}) => {
    return (
        <input 
            type="text" 
            className="form-control my-3"
            name='query'
            placeholder='Search...'
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    )
}


export default SearchBox