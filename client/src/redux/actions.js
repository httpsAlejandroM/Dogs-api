import axios from "axios";
import { GET_DOGS, DOG_DETAIL,DOG_BY_TEMPERAMENTS, DOG_BY_SOURCE, 
    GET_TEMPERAMENTS, ORDER_BY_WEIGHT, SEARCH_DOG, ORDER_ALPHA, GET_DETAIL, CREATE_DOG } from "./actionsType";



    axios.defaults.baseURL = "https://dogs-api-r2n1.onrender.com"

    // axios.defaults.baseURL = "http://localhost:3001"

    export const getDogs =  () => {
return async function (dispatch){
    const dogs = (await axios.get(`/dogs`)).data;
    return dispatch({type:GET_DOGS, payload:dogs})
}
}


export const dogDetail = (id) => {
    return async function(dispatch){
        const dog = (await axios.get(`/dogs/${id}`)).data;
        dispatch({type:DOG_DETAIL , payload:dog})
    }
}

export const filterBySource = (source) => {
    return function (dispatch) {
        return  dispatch({type:DOG_BY_SOURCE, payload: source})
    }
}

export const getTemperaments = () => {
    return async function (dispatch){
        const temperaments = (await axios.get(`/temperaments`)).data.map(t => t);
        dispatch({type:GET_TEMPERAMENTS, payload:temperaments})
    }
}

export const filterByTemperament = (temperament) => {
    return function(dispatch) {
       return dispatch({type:DOG_BY_TEMPERAMENTS, payload:temperament})
    }
}

export const orderByWeight = (weight) => {
     return function (dispatch){
      return dispatch({type:ORDER_BY_WEIGHT, payload:weight} )
    }
}

export const searchDogByName = (name) => {
    return async function (dispatch){
        const dogs = (await axios.get(`/dogs?name=${name}`)).data;
      return  dispatch({type:SEARCH_DOG, payload: dogs})
    }
}

export const orderAlpha = (order) => {
    return function (dispatch){
        dispatch({type:ORDER_ALPHA, payload:order})
    }
}

export const getDetail = (id) => {
    console.log(id)
    return async function (dispatch){
        const dog = (await axios.get(`/dogs/${id}`)).data;
        console.log(dog)
        return dispatch({type: GET_DETAIL, payload: dog})
    }
}

export const postDog = ({name, image, height, weight, life_span, temperamentId}) => {
    return async function (dispatch){
        try {
            const response = await axios.post('/dogs', { name, image, height, weight, life_span, temperamentId });
            dispatch({
              type: CREATE_DOG,
              payload: response.data
            });
            console.log(response)
          } catch (error) {
          }
}
}
