import { useDispatch, useSelector } from "react-redux";
import { destroyReview } from "../../redux/reviewReducer";
import OpenModalButton from "../OpenModalButton";

import "./ReviewContainer.css"

const ReviewContainer = ({review}) => {
  const dispatch = useDispatch()
  const isReviewUpdated = review.created_at !== review.updated_at
  const sessionUser = useSelector((state) => state.session.user)

  const handleDeleteBtn = async (e) => {
    e.preventDefault();
    return dispatch(destroyReview(review.id))
  }

  return (
    <span key={review.id} className="review-wrapper">
      <div className="review-container">

        <div className="review-header">
          <div className="review-header-user-info">
            <h4>(UserName goes here)</h4>
            <p>Reviewed on {review.created_at.slice(0, 16)}
              {isReviewUpdated && (<p>Edited {review.updated_at.slice(0, 16)}</p>)}
            </p>
          </div>

          <div className="review-header-right">
            <p className="review-header-user-rating">⭐ {review.rating}/5</p>
            {(review.user_id === sessionUser.id)  &&
              <div className="review-btns-container">

                <OpenModalButton
                  className="review-btn"
                  buttonText="Edit"
                ></OpenModalButton>

                <button
                  className="review-btn"
                  onClick={handleDeleteBtn}
                >Delete</button>
              </div>
            }
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
