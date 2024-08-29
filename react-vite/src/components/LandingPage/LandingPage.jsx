import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchAllSites } from '../../redux/websiteReducer';
import SiteContainer from '../SiteContainer';
import { randomizeArray } from '../../../helper';

import './LandingPage.css'

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const websites = useSelector((state) => state.websites.allSites)
  const featuredSites = websites.length < 7 ? randomizeArray(Object.values(websites), websites.length) : randomizeArray(Object.values(websites), 6)

  const handleRedBtn = (siteId) => {
    navigate(`/sites/${siteId}`)
  }

  const handleYellowBtn = () => {
    // will be developed once collections are created. Add "in dev" modal in meantime?
  }

  const handleGreenBtn = (link) => {
    window.location.href = `${link}`
  }

  const buttonHandle = {
    "redBtnText": "More",
    "yellowBtnText": "Add",
    "greenBtnText": "Visit",
    "redBtnHandle": handleRedBtn,
    "yellowBtnHandle": handleYellowBtn,
    "greenBtnHandle": handleGreenBtn
  }

  useEffect(() => {
    dispatch(fetchAllSites())
  }, [dispatch])

  return (
    <span className="landing-page-wrapper">
      <section className="landing-page-block-1">
        <h1>A Bookmarks Bar for Everyone.</h1>
        <div className="lp-block-1-btns">
          <NavLink>Explore Websites</NavLink>
          <NavLink>Upload a Cool Website</NavLink>
        </div>
      </section>

      <section className="landing-page-block-2">
          <h2>Featured Sites</h2>
          <div className="lp-featured-sites">{websites.length < 1 ?
            <span className="loading"> Loading... </span>
                :
              <>
                {featuredSites.map(site => (
                  <div key={site.id} className="lp-site-item">
                    <SiteContainer siteDetails={site} className="landing-page" btnHandle={buttonHandle}/>
                  </div>
                ))}
              </>}
          </div>
      </section>
    </span>
  )
}

export default LandingPage
