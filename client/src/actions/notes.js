import axios from 'axios'
import Swal from 'sweetalert2'

export const setNotes = (notes) => {
    return {
        type : 'SET_NOTES',
        payload : notes
    }
}

export const addNote = (note) => {
    return {
        type : 'ADD_NOTE',
        payload : note
    }
}

export const editNote = (note) => {
    return {
        type : 'EDIT_NOTE',
        payload : note
    }
}

export const deleteNote = (note) => {
    return {
        type : "DELETE_NOTE",
        payload : note
    }
}

export const pinNote = (note) => {
    return {
        type : 'PIN_NOTE',
        payload : note
    }
}

export const binNote = (note) => {
    return {
        type : 'BIN_NOTE',
        payload : note
    }
}

export const archiveNote = (note) => {
    return {
        type : 'ARCHIVE_NOTE',
        payload : note
    }
}

export const startGetNotes = () => {
    return dispatch => {
        axios.get('http://localhost:3030/notes', {
            headers : {
                'x-auth' : localStorage.getItem('authToken'),
            }
        })
        .then(response => {
            const notes = response.data
            dispatch(setNotes(notes))
        })
    }
}

export const startAddNote = (formData) => {
    return dispatch => {
        axios.post('http://localhost:3030/notes', formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken'),
                'content-type' : 'multipart/form-data'
            }
        })
        .then(response => {
            const note = response.data
            dispatch(addNote(note))
            Swal.fire('Good job', 'Successfully added !', 'success')

        })
    }
}

export const startPinNote = (note) => {
    note.pinned = !note.pinned
    return dispatch => {
        axios.put(`http://localhost:3030/notes/${note._id}`, note, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const note = response.data
            console.log(note)
            dispatch(pinNote(note))
        })
    }
}

export const startBinNote = (note) => {
    note.deleted = !note.deleted
    return dispatch => {
        axios.put(`http://localhost:3030/notes/${note._id}`, note, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const note = response.data
            console.log(note)
            dispatch(binNote(note))
        })
    }
}

export const startArchiveNote = (note) => {
    note.archived = !note.archived
    return dispatch => {
        axios.put(`http://localhost:3030/notes/${note._id}`, note, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const note = response.data
            console.log(note)
            dispatch(archiveNote(note))
        })
    }
}


export const startEditNote = (obj) => {
    console.log(obj)
    return dispatch => {
        axios.put(`http://localhost:3030/notes/${obj.id}`, obj.formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken'),
                'content-type' : 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response.data)
            const note = response.data
            dispatch(editNote(note))
        })
    }
}

export const startDeleteNote = (id) => {
    return dispatch => {
        axios.delete(`http://localhost:3030/notes/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken'),
            }
        })
        .then(response => {
            const note = response.data
            dispatch(deleteNote(note))
        })
    }
}