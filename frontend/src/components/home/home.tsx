import axios from 'axios'
import React, { Fragment, Key, useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import  Dinero from "dinero.js";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Paper, Typography, styled } from '@mui/material';

const Home = () => {
    const [spendingsList,setSpendingsList] = useState(null)
    const [limits,setLimits] = useState(null as any)

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);


    useEffect(() => {
        const apiUrl = '/api/spendings';
        axios.get(apiUrl,{
            withCredentials: true,
          }).then((resp) => {
            console.log("get.then in useEffect")
            const data = resp.data;
            console.log("resp.data is ",resp.data);
            console.log("resp.data.list is ",resp.data.list);
            setSpendingsList(data.list);
            setLimits(data.limits)
        });
      }, []);
    
    
    const handleSubmit = (event : any) => {
        console.log('handleSubmit ran');
        event.preventDefault();
        /**
         * axios.postForm('/api/spendings', {
            _id: event.target._id.value,
            image:  event.target.image.value,
        })
         */
        
        axios.delete(`/api/spendings/${event.target._id.value}`).then((res) => {
            console.log("postForm.then")
            const apiUrl = '/api/spendings';
            axios.get(apiUrl).then((resp) => {
            console.log("get in post.then  ")
            const data = resp.data;
            console.log("resp.data is ",resp.data);
            console.log("resp.data.list is ",resp.data.list);
            setSpendingsList(data.list);
            setLimits(data.limits)
        });
        }).catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });

        //"proxy": "http://localhost:3001"

        // eslint-disable-next-line react-hooks/rules-of-hooks
        forceUpdate()
    }

    console.log("spendingList is ",spendingsList)

    interface ISpending {
        //  Dinero({amount: 10000,currency: 'USD'})
        _id: String,
        amount:  String,

        type:String, 
        comments:String, 
        date: Date, 
        image: String,
    
    }
    interface ILimits {
        dailyLimit: Dinero.Dinero;
        weeklyLimit: Dinero.Dinero;
        monthlyLimit: Dinero.Dinero;
        yearlyLimit: Dinero.Dinero;
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 15,
        minHeight: 20,
        paddingBlock: 15,
        textAlign: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        color: theme.palette.text.secondary
      }));
      
    
    const spendingsArray: ISpending[] = spendingsList as unknown as ISpending[]
    const limitsObj: ILimits = limits as unknown as ILimits 
    let limitsPanel = null
    if(limitsObj !== null) {
        limitsPanel = 
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            //flexDirection='column'
            margin='auto'
        >
            <Fragment>
                <Box>
                    <Grid container spacing={1}>
                        <Item>
                            <Typography variant='body1'>
                                Daily Limit:{limits.limits.dailyLimit}<br/> 
                                {limits.checks.exceedingDaily}
                            </Typography>
                        </Item>
                        <Item><Typography variant='body1'> Weekly Limit:{limits.limits.weeklyLimit}<br/> {limits.checks.exceedingWeekly}
                        </Typography></Item>
                        <Item><Typography variant='body1'>Monthly Limit:{limits.limits.monthlyLimit} <br/>{limits.checks.exceedingMonthly} 
                        </Typography></Item>
                        <Item><Typography variant='body1'>Yearly Limit:{limits.limits.yearlyLimit}<br/> {limits.checks.exceedingYearly}
                        </Typography></Item>  
                    </Grid>
                    <Item><Typography variant='h4'> Spent in total: {limits.total} </Typography></Item>
                    
                
                </Box>
                
            </Fragment>
        </Box>

    }

    let listItems = null
    if (spendingsArray !== null) {

        listItems = spendingsArray.map((item) => (
            <Box 
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                minWidth={640}
                margin={1}
                padding={1}
            >
                <Fragment key={item._id as Key} 
>
                        <Card sx={{ width: 900,backgroundColor: "white",whiteSpace: 'pre-wrap' }}>
                            <CardHeader 
                                sx ={{ backgroundColor: "whitesmoke"}}
                                title={<Typography variant="h4"> {'$' + item.amount}</Typography> } 
                                
                                subheader={<Typography variant="h5">{item.type} 
                                        <Typography variant="body1"> 
                                            {new Date(item.date).toLocaleDateString()+" "+new Date(item.date).toLocaleTimeString()} 
                                        </Typography>
                                    </Typography>}
                                >
              
                            </CardHeader>
                            <CardContent>
                                <Typography variant='body1'>
                                    {item.comments}
                                </Typography>
                                
                            </CardContent>
                            <CardMedia  
                                sx={{ maxWidth: 300, padding: "1em 1em 0 1em", objectFit: "contain" }}
                                
                                image={String(item.image)} 
                                alt=""
                                component="img" 
                                >
                                
                            </CardMedia>
                            <CardActionArea>
                                <form name="element-form" method="post" id="delete-form" encType="multipart/form-data" action="/api/spendings" onSubmit={handleSubmit}>
                                    <input type="hidden" name="_id" value={String(item._id)} />
                                    <input type="hidden" name="image" value={(item.image !== null) ? String(item.image)  : '' } />
                                    <Button type="submit" value="Delete" variant="text" sx={{marginRight: 'auto'}}>Delete</Button>
                                </form>
                            </CardActionArea>
                        </Card>    

                </Fragment>
            </Box>
        ));
    }

    console.log("listItems is ", listItems)
    return(
        <div>
            <Box
                justifyContent='center'
                alignItems='center'
                alignContent='center'
                display='flex'
                flexDirection='column'
            >
                <Typography variant='h2' sx={{alignSelf: 'center'}}>SPENDINGS TRACKER</Typography>
                <Button variant='text'><Link to="/login">LOGIN</Link></Button>
                <Button variant='text'><Link to="/register">REGISTER</Link></Button>
            </Box>
                    
            
                {!limitsPanel ?'Loading limits...' :  limitsPanel}

                <Box
                    justifyContent='center'
                    alignItems='center'
                    alignContent='center'
                    display='flex'
                >
                    <Button variant='text'><Link to="/add">ADD NEW SPENDINGS</Link></Button>
                    <Button variant='text'><Link to="/limits">CHANGE LIMITS</Link></Button>
                </Box>
        
        
                {!listItems ?'Loading spendings...' :  listItems}
            
        </div>
    )
}
export default Home