import React from 'react'
import { connect } from 'react-redux'
import { startGetCategories } from '../../actions/category'
import { startAddNote } from '../../actions/note'
import { TimePicker } from 'antd';
import moment from 'moment';

class NewNote extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            title : '',
            description : '',
            photo : null,
            category : '',
            color :'',
            reminder : ''
        }
    }

    handleSelect = (e) => {
        this.setState({ [e.target.id] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title' , this.state.title)
        formData.append('description' , this.state.description)
        formData.append('category' , this.state.category)  
        formData.append('photo' , this.state.photo)
        formData.append('reminder', this.state.reminder)
        console.log(formData)
        this.props.dispatch(startAddNote(formData))
        this.props.history.push('/notes')
    }

    onChange = ( time, timeString) => {
        console.log( timeString);
        this.setState({ reminder : timeString })
      }

    handleChange = (e) => {
        if(e.target.type == 'file') {
            this.setState({ photo : e.target.files[0]})
        } else{
            this.setState({ [e.target.name] : e.target.value })
        }
        
    }
    fetchCategories = () => {
        this.props.dispatch(startGetCategories())
    }

    render () {
        if(this.props.categories.length === 0) {
            this.fetchCategories()
        }
        return (
            <div className = "container">
                <h2>Add a new note</h2>
                <form onSubmit = { this.handleSubmit }>
                    <div className = "form-group">
                        <input type="text" className = "form-control" placeholder = "title" name="title" value={ this.state.title} onChange = { this.handleChange }/>
                    </div>
                    <div className = "form-group">
                        <input type="text" className = "form-control" placeholder = "description" name="description" value={ this.state.description} onChange = { this.handleChange }/>
                    </div>
                    <div className = "form-group">
                        <input type="file" className = "form-control" name="photo"  onChange = { this.handleChange }/>
                    </div>
                    <label>Category :
                        <select className = "form-control" id = "category" onChange = { this.handleSelect }>
                            <option value="select">Select</option>
                            {
                                this.props.categories.map(category => {
                                    return <option key = {category._id} value= {category._id}>{ category.name }</option>
                                })
                            }
                        </select>
                    </label>
                    <label>Color :
                    <select className = "form-control" id ="color" onChange = { this.handleSelect }>
                        <option value = "select">Select</option>
                        <option value = "#81ecec">Faded poster</option>
                        <option value="#74b9ff">Green darner tail</option>
                    </select></label><br/>
                    <TimePicker onChange={this.onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /><br/>
                    <button type="submit" className = "btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        categories : state.categories
    }
}

export default connect(mapStateToProps)(NewNote)