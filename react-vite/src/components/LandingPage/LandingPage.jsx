import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchAllSites } from '../../redux/websiteReducer';
import SiteContainer from '../SiteContainer';
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal';
import { randomizeArray, limitString } from '../../../bandaid';

import './LandingPage.css'

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const websites = useSelector((state) => state.websites.allSites)
  const sessionUser = useSelector((state) => state.session.user)
  const featuredSites = websites.length > 8 ? randomizeArray(Object.values(websites), websites.length) : randomizeArray(Object.values(websites), 8)

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
    "redBtnText": "Details",
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
          <button
            className="lp-block1-btn"
            type="button"
            onClick={() => navigate("/sites")}
          >Explore Websites</button>

          {sessionUser ?
            <button
              className="lp-block1-btn"
              type="button"
              onClick={() => navigate("/sites/add")}
            >Upload a Website</button>
            :
            <OpenModalButton
              className="lp-block1-btn"
              modalComponent={<LoginFormModal />}
              buttonText="Upload a Website"
            ></OpenModalButton>
          }
        </div>
      </section>

      <section className="landing-page-block-2">
          <h2>Featured Sites</h2>
          <div className="lp-featured-sites">{websites.length < 1 ?
            <span className="loading"> Loading... </span>
                :
              <>
                {featuredSites.map(site => {
                  if (site.description.length > 115) {
                    site["description"] = limitString(site.description, 110)
                  }

                  return (
                    <div key={site.id} className="lp-site-item">
                      <SiteContainer siteDetails={site} className="landing-page" btnHandle={buttonHandle}/>
                    </div>
                  )}
                )}
              </>}
          </div>
      </section>
    </span>
  )
}

export default LandingPage
