import React from 'react'
import { startGetCategories } from '../../actions/category'
import { connect } from 'react-redux'

function ListCategory(props) {

    return (
        <div className = "container">
            <h1>Listing categories - { props.categories.length }</h1>
            <ul className = "list-group">
                {
                    props.categories.map(category => {
                        return <li className = "list-group-item" key = { category._id }>{ category.name }</li>
                    })
                }
            </ul>
            <button className = "btn btn-primary" onClick = {() => { props.history.push('/categories/new')}}>Add</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories : state.categories
    }
}

export default connect(mapStateToProps)(ListCategory)