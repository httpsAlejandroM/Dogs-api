import { GET_DOGS, DOG_BY_SOURCE, DOG_BY_TEMPERAMENTS,
     GET_TEMPERAMENTS, ORDER_BY_WEIGHT, SEARCH_DOG, ORDER_ALPHA, GET_DETAIL, CREATE_DOG } from "./actionsType";

const initialState = {
    dogs: [],
    allDogs: [],
    allTemperaments: [],
    orderAlpha: [],
    detail: [],
}

const rootReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_DOGS:
            return { ...state, dogs: action.payload, allDogs:action.payload};
        case DOG_BY_SOURCE:
            const created = action.payload === "true"? state.allDogs.filter(d => d.created) : state.allDogs.filter(d => !d.created);
            const source = action.payload === "all"? state.allDogs : created;
            return {...state,  dogs: source};
        case GET_TEMPERAMENTS:
            return{...state, allTemperaments: action.payload};
        case DOG_BY_TEMPERAMENTS:
            const filteredByTemperaments = state.allDogs.filter((d) => typeof d.temperaments === "string"? d.temperaments.split(", ").includes(action.payload) : d.temperaments.map(t=>t.name).includes(action.payload))
            return {...state, dogs: filteredByTemperaments};
        case ORDER_BY_WEIGHT:
            const allPerros = state.allDogs.filter(d => d.weight.split(" - ").length > 1 && d.weight.split(" - ")[0] !== "NaNkg") 
            const result = action.payload === "heavier"  
           ? allPerros.sort((a, b) =>{
            const weightA = parseInt(a.weight); 
            const weightB = parseInt(b.weight); 
            return weightB - weightA
        }) 
           : allPerros.sort((a, b) =>{ 
            const weightA = parseInt(a.weight);  
            const weightB = parseInt(b.weight);
            return weightA - weightB
        })
           return{...state, dogs: result};
           case SEARCH_DOG:
            return {...state, dogs: action.payload};
            case ORDER_ALPHA:
                const todosPerros = [...state.allDogs]
                const sortedAlpha = action.payload === "az" ?
                todosPerros.sort(function(a, b){
                    if (a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0
                }) :
                todosPerros.sort(function(a, b){
                    if(a.name > b.name){
                        return -1
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0
                })
                return {...state, dogs: sortedAlpha };
                case GET_DETAIL:
                return {...state, detail: action.payload};
            case CREATE_DOG:
                return {...state, detail:action.payload}     
        default:
            return {...state};
    }
}

export default rootReducer;
