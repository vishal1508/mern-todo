import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import Dashsidebar from '../components/Dashsidebar';
import Dashprofile from '../components/Dashprofile';
const Dashboard = () => {
  const locationSearch = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlSearch = new URLSearchParams(locationSearch.search);
    const tabFormUrl = urlSearch.get('tab')
   if(tabFormUrl){
    setTab(tabFormUrl);
   }

  },[locationSearch.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'><Dashsidebar/></div>
      {tab === 'Profile' && (<Dashprofile/>)}
    </div>
  )
}

export default Dashboard