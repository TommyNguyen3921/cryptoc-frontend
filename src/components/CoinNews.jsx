import React, { useEffect,useState } from 'react'
import Axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CoinNews = ({Coinname}) => {
    //array of news
    const [Coinnews, setCoinnews] = useState([]);

    const options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news/search',
        params: {q: Coinname, safeSearch: 'Off', textFormat: 'Raw', freshness: 'Day'},
        headers: {
          'x-bingapis-sdk': 'true',
          accept: 'json',
          'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
          'x-rapidapi-key': 'd18b5c897fmshe16b614c6164792p1ce67bjsnc84b88b1140f'
        }
      };

      /**
       * get selected coins news
       */
      useEffect(async () =>{

        Axios.request(options).then(function (response) {
            
            setCoinnews(response.data.value.map((news)=>[news.name,news.description,news?.image?.thumbnail?.contentUrl,news.url]));
            
            
          }).catch(function (error) {
            console.error(error);
          });
    
    },[])
  return (
    <div style={{background: " antiquewhite "}} >
        
       
       {Coinnews.map(news =>{return <div className="coin"> 
       
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        src={news[2]}
        alt="No Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {news[0]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {news[1]}
        </Typography>
      </CardContent>
      <CardActions>
      <a target="_blank" href={news[3]}><Button size="small">Learn More</Button></a>
        
      </CardActions>
    </Card>
       
       
       </div>
      
      
      
      } )}
       
    </div>
  )
}


export default CoinNews