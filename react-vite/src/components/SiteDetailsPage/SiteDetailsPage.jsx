import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { fetchOneSite, destroyWebsite } from "../../redux/websiteReducer"
import { fetchSiteReviews } from "../../redux/reviewReducer"
import OpenModalButton from "../OpenModalButton"
import ReviewContainer from "./ReviewContainer"
import AddReviewModal from "../AddReviewModal/AddReviewModal"
import "./SiteDetailsPage.css"

const SiteDetailsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {siteId} = useParams()
  const currSite = useSelector((state) => state.websites.oneSite)
  const sessionUser = useSelector((state) => state.session.user)
  const siteReviews = useSelector((state) => state.reviews.siteReviews)


  const siteReviewsArr = Object.values(siteReviews)
  const avgRating = siteReviewsArr.reduce((acc, review) => {
    return acc + review.rating;
  }, 0) / siteReviewsArr.length

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
    dispatch(fetchSiteReviews(siteId))
  }, [dispatch, siteId])


  return (
    <span className="site-details-wrapper">
      <section className="site-details-block">
        <img className="site-details-img" src={currSite["preview_img"] ? currSite["preview_img"] : '../placeholder.png'}/>

        <div className="site-details">

          <div className="site-details-info">
            <h2>{currSite.name}</h2>
            <p>
              ⭐ {avgRating}/5
              ({siteReviewsArr.length} {siteReviewsArr.length == 1 ? "Review" : "Reviews"})
            </p>

            <div className="site-details-info-sections">
              <div className="site-details-description">
                <h4>Description</h4>
                <p>{currSite.description}</p>
              </div>

              <p>(Tags go here)</p>
            </div>
          </div>

          <div className="site-details-btns">
            {currSite.user_id === sessionUser?.id ?
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
                        onClick={() => {window.location.href = `${currSite.link}`}}
                ></button>
              </div>
            }
          </div>

        </div>
      </section>

      <section className="site-reviews-block">
        <div className="site-reviews-header">
          <div className="site-review-header-rating">
            <h2>Reviews</h2>
            {siteReviewsArr.length > 0 ?
              <p>
                ⭐ {avgRating}/5
                ({siteReviewsArr.length} {siteReviewsArr.length == 1 ? "Review" : "Reviews"})
              </p>
              :
              <p>No reviews yet. Add your review!</p>
            }
          </div>

          <div>
            <OpenModalButton
              buttonText="Add Review"
              modalComponent={<AddReviewModal websiteId={siteId} reviewId={null}/>}
            ></OpenModalButton>
          </div>
        </div>

        <div className="user-review">
          {(siteReviewsArr.length > 0) && siteReviewsArr.map(review => (
            <div key={review.id} className="site-review">
              <ReviewContainer review={review}/>
            </div>
          ))}
        </div>

      </section>
    </span>
  )
}


export default SiteDetailsPage
