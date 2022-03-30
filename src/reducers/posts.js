export default (posts = [], action) => {
   switch (action.type) {
       case 'UPDATE':
           
          //return posts.filter((post) => post._id === action.payload._id ? action.payload : post);   
          //add data to favs
          return [...posts, action.payload]; 
       case 'DELETE':
            
           
           //keep all fav except the one that match the payload
          return posts.filter((post) => post._id !== action.payload.id);   

       case 'FETCH_ALL':
          //get data and map favs
           var favs = action.payload.map((post) =>post.fav ); 
           // return favs
            return favs[0];  
       default:
            return posts;
   }
}