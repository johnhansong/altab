import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSites } from '../../redux/websiteReducer'
import SiteContainer from '../SiteContainer';
import { limitString } from '../../../bandaid';

import './SiteListPage.css'

const SiteListPage = () => {
  const dispatch = useDispatch()
  const websites = useSelector((state) => state.websites.allSites)
  const websitesArray = Object.values(websites)

  useEffect(() => {
    dispatch(fetchAllSites())
  }, [dispatch])

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

  return (
    <span className='site-listpage-wrapper'>
      <h2>Explore Websites</h2>
      <div className="list-page-sites">{websites.length < 1 ?
            <span className="loading"> Loading... </span>
                :
              <>
                {websitesArray.map(site => {
                  if (site.description.length > 115) {
                    site["description"] = limitString(site.description, 110)
                  }

                  return (
                    <div key={site.id} className="lp-site-item">
                      <SiteContainer siteDetails={site} className="site-listpage" btnHandle={buttonHandle}/>
                    </div>
                  )}
                )}
              </>}
          </div>
    </span>
  )
}

export default SiteListPage
