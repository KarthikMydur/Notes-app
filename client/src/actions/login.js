import axios from 'axios'
import Swal from 'sweetalert2'
import { setNotes } from './note'
import { setCategories } from './category'

export const loginUser = (user) => {
    return {
        type : 'SET_USER',
        payload : user
    }
}

export const removeUser = () => {
    return {
        type : 'REMOVE_USER',
    }
}


export const startLoginUser = (formData, props) => {
    return dispatch => {
        axios.post('http://localhost:3030/users/login', formData)
            .then(response => {
                console.log(response.data)
                if(response.data.err){
                    Swal.fire('Oops!!','invalid email or password', 'error ')
                }else{
                    const {user, token} = response.data
                    localStorage.setItem('authToken', token)
                    dispatch(loginUser(user))
                    return Promise.all([axios.get('http://localhost:3030/notes', {
                        headers: {
                            'x-auth': token
                        }
                    }), axios.get('http://localhost:3030/categories', {
                        headers: {
                            'x-auth':  token
                        }
                    })])
                }
            })
            .then(response =>{
                console.log(response)
                const [notes, categories] = response
                dispatch(setNotes(notes.data))
                dispatch(setCategories(notes.data))
                props.history.push('/')
                Swal.fire('Good job', 'Successfully logged in', 'success')
            })
            .catch(err=>{
                console.log(err)
            })
    }
}
export const startSetUser = () => {
    const req1 = axios.get('http://localhost:3015/users/account', {
        headers : {
            'x-auth' : localStorage.getItem('authToken')
        }
    })
    const req2 = axios.get('http://localhost:3015/notes', {
        headers : {
            'x-auth' : localStorage.getItem('authToken')
        }
    })
    const req3 = axios.get('http://localhost:3015/categories', {
        headers : {
            'x-auth' : localStorage.getItem('authToken')
        }
    })
    return dispatch => {
        Promise.all([req1, req2, req3])
            .then(responses => {
                const [user, notes, categories] = responses
                dispatch(loginUser(user.data))
                dispatch(setNotes(notes.data))
                dispatch(setCategories(categories.data))
            })
    }
}


export const startRemoveUser = ()=> {
    return dispatch => {
        axios.delete('http://localhost:3015/users/logout', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
                localStorage.removeItem('authToken')
                dispatch(removeUser())
                Swal.fire('Good job', 'Successfully logged out', 'success')
            }
        )
        .catch(err => {
            alert(err)
        })
    }
}