import {useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import CoinNews from './CoinNews';
import CoinInfo from './CoinInfo';
import Grid from '@mui/material/Grid';
Chart.register(...registerables);




const CoinDetail = () => {

  const [Coinvalue, setCoinvalue] = useState([]);
  //get selected id from param
  const {id} = useParams()


  /**
   * get chart values
   */
  useEffect(async () =>{

    
    const response = await Axios.get("https://api.coinstats.app/public/v1/charts?period=1m&coinId=" + id.toLowerCase())
     
        
        setCoinvalue(response.data.chart)
    
  },[])

  //data for chart
  const data = {
    labels:  Coinvalue.map((x, index) => index  ),
    datasets: [
      {
        label: "past month",
        data: Coinvalue.map((x) => x[1]  ),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };
  
  return (
    <div>
      <Grid container spacing={2}>
      
      <Grid item xs={9} sx={{height: '100vh'}}>
        <h1>CoinDetail - {id} </h1>  

        <Link to="/">
        <Button variant="contained">Go Back</Button>
        </Link>

        <Line data={data}  />
        <CoinInfo />
        </Grid>
        <Grid item xs={3}  sx={{
          overflow: 'auto',
          my: 2,
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          height: '130vh'
        }}>
          <h1>{id} - News</h1>
      <CoinNews Coinname={id} />
      </Grid>
        </Grid>
    </div>
  )
}

export default CoinDetail