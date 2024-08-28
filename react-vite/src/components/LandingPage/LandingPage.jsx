import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSites } from '../../redux/websiteReducer';

import './LandingPage.css'

function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSites())
  }, [dispatch])
  
  return (
    <div>
      Hi from Landing Page
    </div>
  )
}

export default LandingPage
