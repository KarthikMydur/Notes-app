import React from 'react'
import validator from "validator"
import { startLoginUser } from './actions/login'
import { connect } from 'react-redux'
import axios from 'axios'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input : '',
            email : '',
            password : ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name ] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let formData
        if (validator.isEmail(this.state.input)) {
            formData = {
                email : this.state.input,
                password : this.state.password
            }
        } else {
            formData = {
                username : this.state.input,
                password : this.state.password
            }
        }
        console.log(this.props)
        this.props.dispatch(startLoginUser(formData, this.props))
        
    }


    render () {
        return (
            <div className = "container">
                <h1>Login</h1>
                <form onSubmit = { this.handleSubmit }>
                    <div className = "form-group">
                        <input type = "text" className = "form-control" placeholder = "username or email" name = "input" value = { this.state.username } onChange = { this.handleChange } />
                    </div>
                    <div className = "form-group">
                        <input type = "password" className = "form-control" placeholder = "password" name = "password" value = { this.state.password } onChange = { this.handleChange } />
                    </div>
                    <button type ="submit" className = "btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
    
}

export default connect()(Login)