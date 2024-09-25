// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { destroyReview } from "../../redux/reviewReducer";
import OpenModalButton from "../OpenModalButton";
import AddReviewModal from "../AddReviewModal/AddReviewModal";

import "./ReviewContainer.css"

const ReviewContainer = ({review}) => {
  const dispatch = useDispatch()
  const isReviewUpdated = review.created_at !== review.updated_at
  const sessionUser = useSelector((state) => state.session.user)
  const userId = sessionUser?.id

  const handleDeleteBtn = async (e) => {
    e.preventDefault();
    return dispatch(destroyReview(review.id))
  }

  return (
    <span key={review.id} className="review-wrapper">
      <div className="review-container">

        <div className="review-header">
          <div className="review-header-user-info">
            <h4 className="reviewer-info">{review.username}</h4>
            <p className="review-timestamp">Reviewed on {review.created_at.slice(0, 16)}
              {isReviewUpdated && (<span className="review-timestamp">; Edited {review.updated_at.slice(0, 16)}</span>)}
            </p>
          </div>

          <div className="review-header-right">
            {(review.user_id === userId)  &&
              <div className="review-btns-container">

                <OpenModalButton
                  className="review-btn-edit"
                  buttonText="Edit"
                  modalComponent={<AddReviewModal websiteId={review.website_id} reviewId={review.id}/>}
                ></OpenModalButton>

                <button
                  className="review-btn-delete"
                  onClick={handleDeleteBtn}
                >Delete</button>
              </div>
            }
            <p className="review-header-user-rating">⭐ {review.rating}/5</p>
          </div>
        </div>

        <div className="review-body">
          <h4>{review.title}</h4>
          <p>{review.review}</p>
        </div>

      </div>

    </span>
  )
}


export default ReviewContainer
