import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { fetchOneSite } from "../../redux/websiteReducer"
import { destroyWebsite } from "../../redux/websiteReducer"
import "./SiteDetailsPage.css"

const SiteDetailsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {siteId} = useParams()
  const currSite = useSelector((state) => state.websites.oneSite)
  const sessionUser = useSelector((state) => state.session.user)

  const handleUpdateBtn = async (e) => {
    e.preventDefault();
    navigate(`/sites/${siteId}/edit`)
  }

  const handleDeleteBtn = async (e) => {
    e.preventDefault();
    return dispatch(destroyWebsite(siteId)).then(navigate('/'))
  }

  useEffect(() => {
    dispatch(fetchOneSite(siteId))
  }, [dispatch, siteId])

  return (
    <span className="site-details-wrapper">
      <section className="site-details-block">
        <img className="site-details-img" src={currSite["preview_img"] ? currSite["preview_img"] : '../placeholder.png'}/>

        <div className="site-details">

          <div className="site-details-info">
            <h2>{currSite.name}</h2>
            <p>(Rating goes here)</p>


            <div className="site-details-info-sections">
              <div className="site-details-description">
                <h4>Description</h4>
                <p>{currSite.description}</p>
              </div>

              <p>(Tags go here)</p>
            </div>
          </div>

          <div className="site-details-btns">
            {currSite.user_id === sessionUser.id ?
              <div className="site-container-btns">

                <button className="sd-circle-btn"
                        id="sd-green-btn"
                        onClick={() => {window.location.href = `${currSite.link}`}}
                >Visit</button>

                <button className="sd-circle-btn"
                        id="sd-yellow-btn"
                        onClick={handleUpdateBtn}
                >Edit</button>

                <button className="sd-circle-btn"
                        id="sd-red-btn"
                        onClick={handleDeleteBtn}
                >Delete</button>

              </div>
                :
              <div>
                <button className="sd-circle-btn"
                      id="sd-yellow-btn"
                ></button>

                <button className="sd-circle-btn"
                        id="sd-green-btn"
                        onClick=""
                ></button>
              </div>
            }
          </div>

        </div>
      </section>

      <section className="site-reviews-block">
        <h2>Reviews</h2>
      </section>

    </span>
  )
}


export default SiteDetailsPage
