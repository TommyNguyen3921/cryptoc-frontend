import axios from 'axios';
//api url
const API = axios.create({baseURL:'https://cryptoapp-project.herokuapp.com'});

//return req.header of token
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        
    }
    
    return req;
});
//sign in user
export const signIn = (FormData) => API.post('/users/signin', FormData);

//signup fir user
export const signUp = (FormData) => API.post('/users/signup', FormData);

//add favourite
export const updateFav = (id,updatedFav) => API.patch(`/users/${id}`,updatedFav); 

//get account favourite crypto
export const fetchFav = (id) => API.get(`/users/${id}`);

//delete favourite from user list
export const deleteFav = (id,deletefav) => API.patch(`/users/remove/${id}`,deletefav);