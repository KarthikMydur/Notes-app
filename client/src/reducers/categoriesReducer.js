const initialCategoriesList = []

const categoriesReducer = (state = initialCategoriesList, action) => {
    switch(action.type) {
        case 'SET_CATEGORIES' : {
            return [...action.payload]
        }
        case 'ADD_CATEGORY' : {
            return [...state, action.payload]
        }
        default : { 
            return [...state]
        }
    }
}

export default categoriesReducer