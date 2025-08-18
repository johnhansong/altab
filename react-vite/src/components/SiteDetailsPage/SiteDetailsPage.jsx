import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { fetchOneSite, destroyWebsite } from "../../redux/websiteReducer"
import { fetchSiteReviews, fetchReview, clearSiteReviews } from "../../redux/reviewReducer"
import OpenModalButton from "../OpenModalButton"
import ReviewContainer from "./ReviewContainer"
import ConfirmationModal from "../ConfirmationModal"
import AddReviewModal from "../AddReviewModal/AddReviewModal"
import AddTagModal from "../AddTagModal/AddTagModal"
import "./SiteDetailsPage.css"

const SiteDetailsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { siteId } = useParams()
  const currSite = useSelector((state) => state.websites.oneSite)
  const currSiteTags = Array.isArray(currSite?.tags) && currSite.tags.length > 0
    ? currSite.tags
    : [{id: 0b110010100, name: "No Tags Yet"}]

  const sessionUser = useSelector((state) => state.session.user)
  const userId = sessionUser?.id
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
    dispatch(clearSiteReviews())
    dispatch(fetchOneSite(siteId))
    dispatch(fetchSiteReviews(siteId))
  }, [dispatch, siteId])

  const userReview = siteReviewsArr.filter(review => review.user_id == userId)

  useEffect(() => {
    if (userId && userReview[0]?.user_id == userId) {
      dispatch(fetchReview(userReview[0].id))
    }
  }, [dispatch, userReview, userId, siteId])


  return (
    <span className="site-details-wrapper">
      <section className="site-details-block">
        <img className="site-details-img" src={currSite["preview_img"] ? currSite["preview_img"] : '../placeholder.png'}/>

        <div className="site-details">

          <div className="site-details-info">
            <h2>{currSite.name}</h2>
            <p>
            {avgRating ? `★  ${avgRating}` : "★ " } • {siteReviewsArr.length} {siteReviewsArr.length == 1 ? "Review" : "Reviews"}
            </p>

            <div className="site-details-info-sections">
              <div className="site-details-description">
                <h4>Description</h4>
                <p>{currSite.description}</p>
              </div>

              <p>{currSiteTags.map(tag => {
                return (
                  <span
                    key={tag.id}
                    className={`site-details-tag ${tag.id === 0b110010100 ? " disabled" : ""}`}
                  >
                    {tag.name}
                  </span>
                )
              })}
                <OpenModalButton
                  className='site-details-tag add-tag-button'
                  buttonText="+"
                  modalComponent={<AddTagModal />}
                ></OpenModalButton>
              </p>

            </div>
          </div>

          <div className="site-details-btns">
            {currSite.user_id === userId ?
              <div className="site-container-btns">

                <button className="sd-circle-btn"
                        id="sd-green-btn"
                        onClick={() => window.open(currSite.link, '_blank', 'noopener')}
                >Visit</button>

                <button className="sd-circle-btn"
                        id="sd-yellow-btn"
                        onClick={handleUpdateBtn}
                >Edit</button>

                <OpenModalButton className="sd-circle-btn"
                        id="sd-red-btn"
                        buttonText="Delete"
                        modalComponent={
                          <ConfirmationModal
                            text="Are you sure"
                            buttonText="Delete"
                            buttonAction={handleDeleteBtn}
                          />
                        }
                ></OpenModalButton>

              </div>
                :
              <div>
                {/* <button className="sd-circle-btn"
                      id="sd-yellow-btn"
                ></button> */}

                <button className="sd-circle-btn"
                        id="sd-green-btn"
                        onClick={() => {window.location.href = `${currSite.link}`}}
                >Visit</button>
              </div>
            }
          </div>

        </div>
      </section>

      <section className="site-reviews-block">
        <div className="site-reviews-header">
          <div className="site-review-header-rating">
            {siteReviewsArr.length > 0 ?
              <h2>
                ★ {avgRating} · {siteReviewsArr.length} {siteReviewsArr.length == 1 ? "Review" : "Reviews"}
              </h2>
              :
              <p>No reviews yet. Add your review!</p>
            }
          </div>

          <div>
            {userId && userReview.length == 0 ?
              <OpenModalButton
                className="add-review-btn"
                buttonText="Add Review"
                modalComponent={<AddReviewModal websiteId={siteId} reviewId={null}/>}
              ></OpenModalButton>
              :
              null
            }
          </div>
        </div>

        <div className="user-review">
          {(siteReviewsArr?.length > 0) && siteReviewsArr.map(review => (
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
