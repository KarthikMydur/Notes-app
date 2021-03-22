import React from 'react'
import { startAddCategory } from '../../actions/category'
import { connect } from 'react-redux'


class NewCategory extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            name : ""
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name ] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name : this.state.name
        }
        this.props.dispatch(startAddCategory(formData))
        this.props.history.push('/categories')
    }

    render () {
        return (
            <div className = "container">
                <h3>Add a new category</h3><hr/>
                <form onSubmit = { this.handleSubmit }>
                <div className = "form-group">
                    <input type="text" className = "form-control" onChange = { this.handleChange } name="name" value= { this.state.name } placeholder = "Category" />
                </div>
                <button type = "submit" className = "btn btn-primary">Add</button>
            </form>
        </div>
        )
        
    }
}



export default connect()(NewCategory)