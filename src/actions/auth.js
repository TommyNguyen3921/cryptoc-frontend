import * as api from '../api';

/**
 * 
 * @param {get user login input} formData 
 * @param {change nav location if login credential is correct} navigate 
 * @returns dispatch data
 */
export const signin = (formData,navigate) => async (dispatch) => {
    try {

        //getting response data
        const {data} = await api.signIn(formData);

        //dispatch 
        dispatch({type: 'AUTH', payload: data});
        //go to main page
        navigate('/');
    } catch (error) {
        console.log(error);
        //if login credential is incorrect dispatch with no data
        dispatch({type: 'AUTH', payload: 'no'});
    }
}
/**
 * 
 * @param {signup data} formData 
 * @param {page location} navigate 
 * @returns dispatch data
 */
export const signup = (formData, navigate) => async (dispatch) => {
    try {
        //getting response data
        const {data} = await api.signUp(formData);
        
        //dispatch signup
        dispatch({type: 'SIGNUP', payload: data});
        navigate('/login');
    } catch (error) {
        console.log(error);
        //return same value if email is already used for signup
        dispatch({type: 'SIGNUP', payload: 'same'});
    }
}

