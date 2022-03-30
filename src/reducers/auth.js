 const authReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        
        case 'AUTH':
            //set localstorage to payload if user is authorized to login1
            if(action?.payload !== "no"){
                localStorage.setItem('profile', JSON.stringify({...action?.payload}));
            }
            return {...state, authData: action?.payload};
        case 'SIGNUP':
            //if sign up email is same return the same value to state
            if(action?.payload === "same"){
                return {...state, authData: action?.payload};
            }else{
                return state;  
            }
        case 'LOGOUT':
            //clear local storage
            localStorage.clear();
            //set state authdata to null
            return {...state, authData: null};
        default:
             return state;
    }
 }

 export default authReducer