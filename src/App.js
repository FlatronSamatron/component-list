import React,{useState, useEffect} from 'react'
import { Input, Container, Grid, CircularProgress } from '@material-ui/core';

import TabeList from './components/TableList'
import AddComment from './components/AddComment'
import postsApi from './utils/requests'

function App() {

  const [data, setData] = useState([])
  const [searchData, setSearchData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    const fetchData = async () => {
      const res = await postsApi.getPosts()
      setData(res)
      setLoading(false)
    }
    fetchData()
  }, [])

  const filterSearch = ( el, value ) => {
    return el.toString().toLowerCase().trim().includes(value.toString().toLowerCase().trim())
  }
  
  const search = (value) => {
      let result = data.filter((el)=> 
      filterSearch(el.title,value) ||
      filterSearch(el.userId,value) ||
      filterSearch(el.body,value))

      setSearchData(result)
  }

  
  return (
    <Container maxWidth="lg" style={{padding:"50px 0"}}>
      <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
        <Input 
          style={{marginBottom: '20px', width: '50%'}} 
          placeholder='Search' 
          onChange={(el)=>{search(el.target.value)}}
        />
        {loading ? <CircularProgress /> : <TabeList 
          data={!searchData 
          ? data : 
          searchData}
        />}
        <AddComment/>
      </Grid>
    </Container>
  );
}

export default App;
