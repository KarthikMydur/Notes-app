const intialNotesState = []

const notesReducer = (state = intialNotesState, action) => {
    switch(action.type) {
        case 'SET_NOTES' :{
            return [...action.payload]
        }
        case 'PIN_NOTE' : {
            return state.map(note => {
                if(note._id == action.payload._id){
                    return action.payload
                } else {
                    return note
                }
            })
        }
        case 'ARCHIVE_NOTE' : {
            return state.map(note => {
                if(note._id == action.payload) {
                    return action.payload
                } else {
                    return note
                }
            })
        }
        case 'BIN_NOTE' : {
            return state.map(note => {
                if(note._id == action.payload._id) {
                    return note
                } else {
                    return note
                }
            })
        }
        case 'ARCHIVE_NOTE' : {
            return state.map(note => {
                if(note._id == action.payload._id) {
                    note.archived = !note.archived
                    return note
                } else {
                    return note
                }
            })
        }
        case 'DELETE_NOTE' : {
            return state.filter(note => note._id != action.payload._id)
        }
        case 'EDIT_NOTE' : {
            return state.map(note => {
                if(note._id == action.payload._id) {
                    return action.payload
                }else {
                    return note
                }
            })
        }
        case 'ADD_NOTE' : {
            return [...state, action.payload]
        }
        default : {
            return [...state]
        }
    }
}

export default notesReducer