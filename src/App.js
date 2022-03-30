import './App.css';
import {useEffect, useState} from 'react';
import Axios from 'axios';
import Coin from './components/Coin'
import CoinDetail from './components/CoinDetail';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { Routes, Route,useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getFav} from './actions/posts';
import {useSelector} from 'react-redux';
function App() {

  const dispatch = useDispatch();
  //list of crypto
  const [listOfCoins, setListOfCoins] = useState([]);
  //filter word
  const [searchWord, setSearchWord] = useState("");
  //user login profile
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  //route location
  const location = useLocation();
  
  /**
   * get all cryptocoin from api
   */
  useEffect(async () =>{
    
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response.data.coins);
        
      }
      )
  },[])

  //get favourite from reducer
  const posts = useSelector((state) => state.posts);
 
  
  //get favourite when user is signin
  useEffect(() =>{
    if (user !== null){
    getfav();
    }
  },[user])

  //getFav crypto if route changes to /favourites
  useEffect(() =>{
    //set the user to the localstorage value
    setUser(JSON.parse(localStorage.getItem('profile')));
    //check if route is /favourites
    if (location.pathname == '/Favourites'){
      //get fav for login user
      getfav();
    }
  
  },[location])

  /**
   * dispatch to get favurites
   */
  const getfav = () =>{
    dispatch(getFav(user.result._id));
  }

  /**
   * get coin that matches search word
   */
  const filteredCoins = listOfCoins.filter((coin) =>{
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  })

  return (
    <div className="App">

          

      <Navbar />

     <Routes>
            <Route path="/" element={
            <div>
             
            <div className="cryptoHeader">
       <input type="text" placeholder="Search..." onChange={(e) => {
         setSearchWord(e.target.value)
         }}
         />
     </div>
            
            
            <div className="cryptoDisplay">{filteredCoins.map((coin) => {
       
       return <Coin key={coin.name} name={coin.name} icon ={coin.icon} price={coin.price} symbol={coin.symbol} isfav={1} id={1} fav={posts}/>
       
       })

       }
       
       </div>
       </div>} />
            <Route path="/Favourites" element={posts.length !== 0 ? (<div>    <div className="cryptoDisplay">{posts.map((coin) => {
       
       return <Coin key={coin.name} name={coin.name} icon ={coin.icon} price={coin.price} symbol={coin.symbol} isfav={0} id={coin._id} fav={posts} />
       
       })

       }
       
       </div>
       </div>) : (<div style={{position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',fontSize: 100,color: "black"}}>No saved Favourite</div>) } />
            <Route path="/Coindetail/:id" element={<div> <CoinDetail /></div> } />
            <Route path="/Login" element={<Login /> } />
            <Route path="/Login/Signup" element={<Signup /> } />
      </Routes>
     
    </div>
  );
}

export default App;
