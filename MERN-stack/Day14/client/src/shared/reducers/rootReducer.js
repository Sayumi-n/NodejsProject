const initState = {
    isLoggedIn: false
}

const rootReducer = (state=initState, action) => {
    switch(action.type){
        case 'LOGIN':
            console.log('LOGGING IN');
            return{
                ...state,
                isLoggedIn: true
            }
        case 'LOGOUT':
            return{
                ...state,
                isLoggedIn: false
            }
        default:
            return state;
    }
}

export default rootReducer;