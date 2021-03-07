const initState = {
    isLoading : true,
    OKR: []
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'RESOLVED_OKR':
            return {
                ... state,
                OKR: action.OKR,
                isLoading: false
            };
    }
    return state
}



export default rootReducer;