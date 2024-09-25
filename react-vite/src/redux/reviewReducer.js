//*------ACTION TYPES---------
const GET_SITE_REVIEWS = '/review/GET_SITE_REVIEWS'
const GET_REVIEW = '/review/GET_REVIEW'
const CREATE_REVIEW = '/review/CREATE_REVIEW'
const UPDATE_REVIEW = '/review/UPDATE_REVIEW'
const DELETE_REVIEW = '/review/DELETE_REVIEW'
const CLEAR_STATE = '/review/CLEAR_STATE'


//*-------ACTION CREATORS---------
const loadSiteReviews = (reviews) => {
  return {
    type: GET_SITE_REVIEWS,
    payload: reviews
  }
}

const loadReview = (review) => {
  return {
    type: GET_REVIEW,
    payload: review
  }
}

const postReview = (review) => {
  return {
    type: CREATE_REVIEW,
    payload: review
  }
}

const putReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    payload: review
  }
}

const doomedReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId
  }
}

export const clearSiteReviews = () => {
  return {
    type: CLEAR_STATE
  }
}


//*---------THUNKS------------
export const fetchSiteReviews = (siteId) => async (dispatch) => {
  const res = await fetch(`/api/sites/${siteId}/reviews`)

  if (res.ok) {
    const data = await res.json()
    const reviews = data.reviews
    dispatch(loadSiteReviews(reviews))
  }
}

export const fetchReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/review/${reviewId}`)

  if (res.ok) {
    const data = await res.json()
    dispatch(loadReview(data))
  }
}

export const createReview = (siteId, review) => async (dispatch) => {
  try {
    const res = await fetch(`/api/sites/${siteId}/review`, {
      method: "POST",
      body: JSON.stringify(review),
      headers: { "Content-Type": "application/json" }
    })

    if (res.ok) {
      const newReview = await res.json()
      dispatch(postReview(newReview))
      return newReview
    } else {
      const errorData = await res.json()
      console.error("Error creating review", errorData);
      throw new Error(errorData.message || "Error submitting review")
    }
  } catch(err) {
    console.error("Error creating review", err)
    throw err;
  }
}

export const updateReview = (reviewId, review) => async (dispatch) => {
  try {
    const res = await fetch(`/api/review/${reviewId}`, {
      method: "PUT",
      body: JSON.stringify(review),
      headers: { "Content-Type": "application/json" }
    })

    if (res.ok) {
      const updatedReview = await res.json()
      dispatch(putReview(updatedReview))
      return updatedReview
    } else {
      const errorData = await res.json()
      console.error("Error updating review", errorData);
      throw new Error(errorData.message || "Error submitting review")
    }
  } catch(err) {
    console.error("Error posting updated review", err)
    throw err;
  }
}

export const destroyReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/review/${reviewId}`, {
    method: "DELETE"
  })

  if (res.ok) {
    dispatch(doomedReview(reviewId))
  }
}

//*---------REDUCERS-----------
const initialState = {siteReviews: {}, oneReview: {}}

const reviewReducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_SITE_REVIEWS:
      return {...state, siteReviews: {...action.payload}}

    case GET_REVIEW:
      return {...state, oneReview: {...action.payload}}

    case CREATE_REVIEW: {
      return {
        ...state,
        siteReviews: {
          ...state.siteReviews,
          [action.payload.id]: action.payload
        },
        oneReview: {...action.payload}
      }
    }

    case UPDATE_REVIEW: {
      const reviewId = action.payload.id;
      const key = Object.entries(state.siteReviews).find(([key, review]) => review.id === reviewId)?.[0]

      if (key) {
        return {
          ...state,
          siteReviews: {
            ...state.siteReviews,
            [key]: action.payload,
          },
          oneReview: action.payload
        }
      } else {
        return state;
      }
    }

    case DELETE_REVIEW: {
      const { payload: reviewId } = action;
      const newSiteReviews = { ...state.siteReviews }
      delete newSiteReviews[reviewId]
      return {
        ...state,
        siteReviews: newSiteReviews,
        oneReview: {}
      }
    }

    case CLEAR_STATE: {
      return {
        ...initialState
      }
    }

    default: return state;
  }
}

export default reviewReducer
