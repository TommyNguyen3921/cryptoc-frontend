import React,{useState,useEffect} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link,useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateFav,deleteFav } from '../actions/posts';
import {  } from '../actions/posts';
import {useSelector} from 'react-redux';

const Coin = ({name, icon, price, symbol,isfav,id,fav}) => {

  const dispatch = useDispatch();
  const [saveFav, setSaveFav] = useState({name:'',icon:'',price:'',symbol:''})
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [didMount, setDidMount] = useState(false);
  const [valuesave, setvaluesave] = useState(false);
  const location = useLocation();
 
  useEffect(() =>{
    
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);

// Setting didMount to true upon mounting
useEffect(() => { setDidMount(true) }, [])

// Now that we have a variable that tells us wether or not the component has
// mounted we can change the behavior of the other effect based on that
console.log(fav);
useEffect(() => {
  
  if (didMount){ 
    dispatch(updateFav(user.result._id,saveFav));
  }
  
}, [saveFav])

useEffect(() => {
  
  const found = fav.find(fav => fav.name === name);
  console.log(found);
  if (found){
    setvaluesave(true);
  }else{
    setvaluesave(false);
  }
}, [fav])

  
  return (
    <div className="coin" >

        <Card sx={{ maxWidth: 400}}>
      <CardMedia
      style={{
        width: "auto",
        maxHeight: "auto",
        float: "right"
      }}
        component="img"
        src={icon}
        alt="green iguana"
        className="photo"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Price:{price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Price:{symbol}
        </Typography>
      </CardContent>
      <CardActions>
      {isfav ? user ? (!valuesave ?<Button onClick={() => {setSaveFav({name: name,icon: icon, price: price,symbol: symbol});}} >Favourite</Button>: (<Button disabled="true">SAVED</Button>)): (<></>) : <Button onClick={() => dispatch(deleteFav(user.result._id,{id:id}))} >Remove</Button> }
        
        
        <Link to={`/CoinDetail/${name}`}>
        <Button size="small">Learn More</Button>
        </Link>
        
      </CardActions>
    </Card>
    </div>
  )
}

export default Coin