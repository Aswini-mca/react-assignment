import React, { useEffect } from 'react'
import Home from './Home'

function InfiniteScroll() {
    //Function to fetch
    const fetchPage = () => {
        const newPageElement = document.createElement('div');
        newPageElement.classList.add('scroll-page');
        document.querySelector('.scroll-page').appendChild(newPageElement);
      };     

    // Function to handle scroll event
    const handleScroll = () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.documentElement.offsetHeight;
        const scrollThreshold = 100; // Adjust this threshold as needed
      
        if (scrollPosition >= pageHeight - scrollThreshold) {
          fetchPage();
        }
      };      

  // Add scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

   // Fetch initial items when component mounts
   useEffect(() => {
    fetchPage();
  }, []);
  return (
    <div>
    <Home/>
    <h3>Infinite Scroll Page</h3>
    <div className='scroll-page'></div>
    </div>
  )
}

export default InfiniteScroll
