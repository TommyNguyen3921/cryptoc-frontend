import * as api from '../api';


/**
 * 
 * @param {user id} id 
 * @param {fav crypto object} Fav 
 * @returns update value
 */
export const updateFav = (id, Fav) => async (dispatch) => {
    try {

        if(Fav.name !== ""){
        //getting response data
        const {data} = await api.updateFav(id, Fav);
      
        dispatch({type: 'UPDATE', payload: Fav});
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {user id} id 
 * @returns user favourite crypto
 */
export const getFav = (id) => async (dispatch) =>{

    try {
        //getting response data
        const {data} = await api.fetchFav(id);
        
        //dispatch like return
        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error);
    }
   
}

/**
 * 
 * @param {user id} id 
 * @param {favourite crypto id} favID 
 * @returns deleted fav crypto
 */
export const deleteFav = (id, favID) => async (dispatch) => {
    try {
        //getting response data
         await api.deleteFav(id, favID);
      
        dispatch({type: 'DELETE', payload: favID});
        
    } catch (error) {
        console.log(error);
    }
}