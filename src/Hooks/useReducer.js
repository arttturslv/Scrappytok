const ACTIONS = {
    normal: 'normal',
    IMPORT_FILE: 'import_file',
    FAVORITE: 'favorite',
    DELETE: 'delete',
    CLEAR: 'clear'
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.FAVORITE: {
            const currentState = state.favorite;
            const otherState1 = state.normal;
            const otherState2 = state.delete;
            
            if(!Array.isArray(currentState)) { //current is array
                var alreadyHas = currentState.some(item => item.Link === action.payload.data.Link);

                if(alreadyHas) { //item selected is already saved, so we delete
                    return {
                        ...state,
                        currentState: currentState.filter(item => item.Link !== action.payload.data.Link),
                    }
                } else {

                    const otherState1IsValid = Array.isArray(otherState1) && otherState1.length > 0;
                    const otherState2IsValid = Array.isArray(otherState2) && otherState2.length > 0;

                    if(otherState1IsValid) {
                        const hasOnOtherState1 = otherState1.some(item => item.Link === action.payload.data.Link);

                        if(hasOnOtherState1) { //se tem em outro estado, eu tenho que retirar do estado e adiconar no fav
                            return {
                                ...state,
                                favorite: [...state.favorite, action.payload.data],
                                normal: otherState1.filter(item => item.Link !== action.payload.data.Link)
                            }  
                        }
                    } else if(otherState2IsValid) {
                        const hasOnOtherState2 = otherState2.some(item => item.Link === action.payload.data.Link);

                        if(hasOnOtherState2) { //se tem em outro estado, eu tenho que retirar do estado e adiconar no fav
                            return {
                                ...state,
                                favorite: [...state.favorite, action.payload.data],
                                delete: otherState2.filter(item => item.Link !== action.payload.data.Link)
                            }
                        }
                    }
 
                    alreadyHas = currentState.some(item => item.Link === action.payload.data.Link);

                    if(!alreadyHas) {
                        return {
                            ...state,
                            currentState: currentState.filter(item => item.Link !== action.payload.data.Link),
                        }
                    }
                }
            } 
        }
        case ACTIONS.DELETE:
            const currentState = state.delete;
            const otherState1 = state.normal;
            const otherState2 = state.favorite;
            
            if(!Array.isArray(currentState)) { //current is array
                var alreadyHas = currentState.some(item => item.Link === action.payload.data.Link);

                if(alreadyHas) { //item selected is already saved, so we delete
                    return {
                        ...state,
                        currentState: currentState.filter(item => item.Link !== action.payload.data.Link),
                    }
                } else {

                    const otherState1IsValid = Array.isArray(otherState1) && otherState1.length > 0;
                    const otherState2IsValid = Array.isArray(otherState2) && otherState2.length > 0;

                    if(otherState1IsValid) {
                        const hasOnOtherState1 = otherState1.some(item => item.Link === action.payload.data.Link);

                        if(hasOnOtherState1) { //se tem em outro estado, eu tenho que retirar do estado e adiconar no fav
                            return {
                                ...state,
                                delete: [...state.favorite, action.payload.data],
                                normal: otherState1.filter(item => item.Link !== action.payload.data.Link)
                            }  
                        }
                    } else if(otherState2IsValid) {
                        const hasOnOtherState2 = otherState2.some(item => item.Link === action.payload.data.Link);

                        if(hasOnOtherState2) { //se tem em outro estado, eu tenho que retirar do estado e adiconar no fav
                            return {
                                ...state,
                                delete: [...state.favorite, action.payload.data],
                                favorite: otherState2.filter(item => item.Link !== action.payload.data.Link)
                            }
                        }
                    }
 
                    alreadyHas = currentState.some(item => item.Link === action.payload.data.Link);

                    if(!alreadyHas) {
                        return {
                            ...state,
                            currentState: currentState.filter(item => item.Link !== action.payload.data.Link),
                        }
                    }
                }
            } 
        case ACTIONS.CLEAR:
            return { favorite: [], delete: [], normal: [] }
        case ACTIONS.IMPORT_FILE:
            return {...state, normal:action.payload.data}
        default:
            return "This action doesn't exist."
    }
}
