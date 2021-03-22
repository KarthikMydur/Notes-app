import React from 'react'
import axios from 'axios'

class Register extends React.Component{
    constructor() {
        super()
        this.state = {
            username: "",
            email: "",
            password: ""
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:3030/users/register', formData)
            .then(response => {
                if(response.data._id) {
                    this.props.history.push('/login')
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    render(){
        return(
            <div className='container'>
                <h1>Register</h1>
                <form onSubmit = { this.handleSubmit }>
                    <div className = "form-group">
                        <input type = "text" className = "form-control" placeholder = "username" name = "username" value = { this.state.username } onChange = { this.handleChange } />
                    </div>
                    <div className = "form-group">
                        <input type = "text" className = "form-control" placeholder = "email" name = "email" value = { this.state.email } onChange = { this.handleChange } />
                    </div>
                    <div className = "form-group">
                        <input type = "text" className = "form-control" placeholder = "password" name = "password" value = { this.state.password } onChange = { this.handleChange } />
                    </div>
                    <button type ="submit" className = "btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Register