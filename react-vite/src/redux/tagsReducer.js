//*------ACTION TYPES---------
const GET_ALL_TAGS = '/tags/GET_TAGS'
const GET_ONE_TAG = '/tags/GET_ONE_TAG'

//*-------ACTION CREATORS---------
const loadAllTags = (tags) => {
  return {
    type: GET_ALL_TAGS,
    payload: tags
  }
}

const loadOneTag = (tag) => {
  return {
    type: GET_ONE_TAG,
    payload: tag
  }
}

//*---------THUNKS------------
export const fetchAllTags = () => async (dispatch) => {
  const res = await fetch('/api/tags')
  if (res.ok) {
    const data = await res.json()
    const tags = data.tags
    dispatch(loadAllTags(tags))
  }
}

export const fetchOneTag = (tagId) => async (dispatch) => {
  const res = await fetch(`/api/tags/${tagId}`)

  if (res.ok) {
    const data = await res.json()
    const tag = data.tag
    dispatch(loadOneTag(tag))
  }
}


//*---------REDUCERS-----------
const initialState = {allTags: {}, oneTag: {}}

const tagReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_ALL_TAGS:
      return {...state, allTags: {...action.payload}}

    case GET_ONE_TAG:
      return {...state, oneTag: {...action.payload}}

    default: return state;
  }
}

export default tagReducer
