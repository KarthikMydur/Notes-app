import axios from 'axios'

export const setCategories = (categories) => {
    return {
        type : 'SET_CATEGORIES',
        payload : categories
    }
}

export const addCategory = (category) => {
    return {
        type : 'ADD_CATEGORY',
        payload : category
    }
}

export const startGetCategories = () => {
    return dispatch => {
        axios.get('http://localhost:3030/categories', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const categories = response.data
            dispatch(setCategories(categories))
        })
    }
}

export const startAddCategory = (formData) => {
    return dispatch => {
        axios.post('http://localhost:3030/categories',formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const category = response.data
            dispatch(addCategory(category))
        })
    }
}