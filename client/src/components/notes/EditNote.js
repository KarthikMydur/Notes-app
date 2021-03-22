import React from 'react'
import { connect } from 'react-redux'
import { startEditNote } from '../../actions/note'
import { TimePicker } from 'antd';
import moment from 'moment';

class EditNote extends React.Component {
    constructor (props) {
        super(props)
        console.log(props)
        this.state = {
            title : props.note ? props.note.title : '' ,
            description : props.note ? props.note.description : '' ,
            category : props.category ? props.category._id: '' ,
            photo : props.note ? props.note.photo : null,
            color : '',
            reminder : props.note ? props.note.reminder : ''
        }
    }

    
    handleSelect = (e) => {
        console.log(e.target.id)
        this.setState({ [e.target.id] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id
        console.log(this.state)
        const formData = new FormData()
        formData.append('title' , this.state.title)
        formData.append('description' , this.state.description)
        formData.append('category' , this.state.category)  
        formData.append('photo' , this.state.photo)
        formData.append('color' , this.state.color)
        formData.append('reminder', this.state.reminder)
        this.props.dispatch(startEditNote({ formData, id }))
        this.props.history.push('/notes')
    }

     onChange = (time, timeString) => {
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

    render () {
        //console.log(this.props)
        return (
            
            <div className = "container">
                <h1>Edit a note</h1>
                <form onSubmit = { this.handleSubmit }>
                    <div className = "form-group">
                        <input type="text" className = "form-control" name="title" value={ this.state.title} onChange = { this.handleChange }/>
                    </div>
                    <div className = "form-group">
                        <input type="text" className = "form-control" name="description" value={ this.state.description} onChange = { this.handleChange }/>
                    </div>
                    <div className = "form-group">
                        <input type="file" className = "form-control" name="photo"  onChange = { this.handleChange }/>
                    </div>
                    <label> Category :
                    <select className = "form-control" id = "category" onChange = { this.handleSelect }>
                        <option value="select">Select</option>
                        {
                            this.props.categories.map(category => {
                                    if(category._id == this.state.category._id) {
                                        return <option key = { category._id }  selected = "selected" value= {category._id}>{ category.name }</option>
                                    }
                                return <option  key = {category._id} value= {category._id}>{ category.name }</option>
                            })
                        }
                    </select></label>
                    <label> Color :
                    <select className = "form-control" id ="color" onChange = { this.handleSelect }>
                        <option value = "select">Select</option>
                        <option value = "#81ecec">Faded poster</option>
                        <option value="#74b9ff">Green darner tail</option>
                    </select></label><br/>
                    <TimePicker onChange={this.onChange} defaultOpenValue={moment(`${this.state.reminder}`, 'HH:mm:ss')} />
                    <button type="submit" className = "btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    const note = state.notes.find(note => note._id == props.match.params.id)
    let category
    if(note) {
        category = state.categories.find(cat => cat._id == note.category._id)
    }
    return {
        note,
        category,
        categories : state.categories
    }
}

export default connect(mapStateToProps)(EditNote)