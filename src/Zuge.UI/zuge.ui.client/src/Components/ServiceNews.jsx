import axios from 'axios';

const newsUrl = "http://localhost:3000/news";

const getAllNews = () => {
  const request = axios.get(newsUrl)
  return(
    request.then(response => response.data)  
  )
  }

export default {getAllNews}