import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchReview, createReview, updateReview } from "../../redux/reviewReducer";
import { useModal } from "../../context/Modal";

import './AddReviewModal.css'

const AddReviewModal = ({websiteId, reviewId}) => {
  const dispatch = useDispatch();
  const currReview = useSelector((state) => state.reviews.oneReview)
  const { closeModal } = useModal();

  useEffect(() => {
    if(reviewId) {
      dispatch(fetchReview(reviewId))
    }
  }, [dispatch, reviewId])

  const [title, setTitle] = useState(reviewId ? currReview.title : "")
  const [rating, setRating] = useState(reviewId ? currReview.rating : 0)
  const [review, setReview] = useState(reviewId ? currReview.review : "")
  const [errors, setErrors] = useState({})

  const handleTitle = (e) => setTitle(e.target.value)
  const handleReview = (e) => setReview(e.target.value)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = {}
    if (rating == 0) {
      error.rating = "Please provide a rating"}

    if (!title) {
      error.title = "Please provide a title"
    } else if (title.length > 30) {
      error.title = "Title must not exceed 30 characters"
    } else if (title.length < 5) {
      error.title = "Title must be at least 5 characters"}

    if (!review) {
      error.reviews = "Please provide a review"
    } else if (review.length < 30) {
      error.reviews = "Review must be at least 30 characters"
    } else if (review.length > 2000) {
      error.reviews = "Review must not exceed 2000 characters"}

    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }

    const payload = {
      title,
      rating,
      review
    }

    console.log("REVIEW ID", reviewId)

    let reviewPayload
    try {
      if (!reviewId) {
        reviewPayload = await dispatch(createReview(websiteId, payload))
      } else {
        reviewPayload = await dispatch(updateReview(reviewId, payload))
      }

      if (reviewPayload) {
        closeModal()
      }

    } catch (res) {
      const data = await res.json()
      if (data?.errors) {
        setErrors(...errors, ...data.errors)
      }
    }
  }


  return (
    <span className="add-review-form-wrapper">
      <h2>{reviewId ? "Update Review" : "Add a Review" }</h2>

      <form className="add-review-form" onSubmit={handleSubmit}>

        <div className="add-review-rating">
          <input
            type='radio' id='star5' name='rating'
            onClick={() => setRating(5)} onChange={() => {}}
            checked={rating === 5}
          /> <label htmlFor="star5" title="5 stars"></label>

          <input
            type='radio' id='star4' name='rating'
            onClick={() => setRating(4)} onChange={() => {}}
            checked={rating === 4}
          /> <label htmlFor="star4" title="4 stars"></label>

          <input
            type='radio' id='star3' name='rating'
            onClick={() => setRating(3)} onChange={() => {}}
            checked={rating === 3}
          /> <label htmlFor="star3" title="3 stars"></label>

          <input
            type='radio' id='star2' name='rating'
            onClick={() => setRating(2)} onChange={() => {}}
            checked={rating === 2}
          /> <label htmlFor="star2" title="2 stars"></label>

          <input
            type='radio' id='star1' name='rating'
            onClick={() => setRating(1)} onChange={() => {}}
            checked={rating === 1}
          /> <label htmlFor="star1" title="1 stars"></label>
        </div>
        <p>{errors.rating}</p>

        <div className="add-review-title">
          <input
            className="review-title"
            onChange={handleTitle}
            placeholder='Title'
            value={title}
          ></input>
        </div>
        <p>{errors.title}</p>

        <div className="add-review-text">
          <textarea
            className="review-textarea"
            onChange={handleReview}
            placeholder='Please write at least 30 characters'
            value={review}
          ></textarea>
        </div>
        <p>{errors.review}</p>

        <button className="add-review-submit-btn" type="submit">Submit</button>
      </form>
    </span>
  )
}

export default AddReviewModal
