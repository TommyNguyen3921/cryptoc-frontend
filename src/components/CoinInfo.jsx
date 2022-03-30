import React, { useEffect,useState } from 'react';
import Axios from 'axios';
import HTMLReactParser from 'html-react-parser';

const CoinInfo = () => {
    //coin description
    const [Coininfo, setCoininfo] = useState('');

    /**
     * get description of selected coin
     */
    useEffect(async () =>{
        const response = await Axios.get("https://api.coingecko.com/api/v3/coins/bitcoin")
          
           setCoininfo(response.data.description['en']);
            //console.log(Coininfo);
          
          
      },[])

  return (
    <div> 
        <h1>Coin Information </h1>   
        
        <p style={{whiteSpace: "pre-line"}} > {HTMLReactParser(Coininfo) }</p> 
        
        </div>
  )
}

export default CoinInfo