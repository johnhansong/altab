//*------ACTION TYPES---------
const GET_ALL_TAGS = '/tags/GET_TAGS'
const GET_ONE_TAG = '/tags/GET_ONE_TAG'
const ADD_TAG = '/tags/ADD_TAG'
const DELETE_TAG = '/tags/DELETE_TAG'
const ADD_SITE_TO_TAG = '/tags/ADD_SITE_TO_TAG'
const DELETE_SITE_FROM_TAG = '/tags/DELETE_SITE_FROM_TAG'

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

const addTag = (tag) => {
  return {
    type: ADD_TAG,
    payload: tag
  }
}

const addSiteToTag = (updatedTag) => {
  return {
    type: ADD_SITE_TO_TAG,
    payload: updatedTag
  }
}

const cutSitefromTag = (updatedTag) => {
  return {
    type: DELETE_SITE_FROM_TAG,
    payload: updatedTag
  }
}

const doomedTag = (tagId) => {
  return {
    type: DELETE_TAG,
    tagId
  }
}

//*---------THUNKS------------
export const fetchAllTags = () => async (dispatch) => {
  const res = await fetch('/api/tags/')
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

export const createTag = ({ name, description="", websiteIds=[] }) => async (dispatch) => {
  const form = new FormData()

  const cleanedName = (name || "").trim();
  if (!cleanedName) throw {errors: { name: "Name is required" }}

  form.append("name", name);
  form.append("description", description);

  const siteIds = [...new Set(websiteIds.map(Number))].filter(Number.isInteger)
  siteIds.forEach(id => form.append("website_ids", id));

  try {
    const res = await fetch(`/api/tags/`, {
      method: "POST",
      body: form,
      credentials: 'include',
    });
    const payload = await res.json();
    if (!res.ok) throw payload

    dispatch(addTag(payload))
    return payload
  } catch(err) {
    console.error("Error creating tag", err)
    throw err;
  }
}

export const appendSitetoTag = (tagId, siteId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/tags/${tagId}/websites/${siteId}`, {
      method: "POST",
      credentials: 'include',
    })
    if (!res.ok) {
      const err = await res.json()
      throw err
    }

    const updatedTag = await res.json();
    dispatch(addSiteToTag(updatedTag));
    return updatedTag;

  } catch (err) {
    console.error("Error adding website to tag", err);
    throw err;
  }
}

export const removeSitefromTag = (tagId, siteId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/tags/${tagId}/websites/${siteId}`, {
      method: "DELETE"
    });
    if (!res.ok) {
      const err = await res.json();
      throw err
    }
    const updatedTag = await res.json();
    dispatch(cutSitefromTag(updatedTag))
    return updatedTag;
  } catch (err) {
    console.error("Error removing website from tag", err);
    throw err;
  }
}

export const deleteTag = (tagId) => async (dispatch) => {
  const res = await fetch(`/api/tags/${tagId}`, {
    method: "DELETE"
  });
  if (res.ok) {
    dispatch(doomedTag(tagId))
  }
}

//*---------SELECTORS-----------
export const selectAllTags = (state) => Object.values(state.tags.allTags)
export const selectTagsById = (state, tagId) => state.tags.allTags[tagId];
export const selectOneTag  = (state) => state.tags.oneTag

//*---------REDUCERS-----------
const initialState = {allTags: {}, oneTag: {}}

const tagReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_ALL_TAGS:
      return {...state, allTags: {...action.payload}}

    case GET_ONE_TAG:
      return {...state, oneTag: {...action.payload}}

    case ADD_TAG:
      return {
        ...state,
        allTags: {
          ...state.allTags,
          [action.payload.id]: action.payload
        },
        oneTag: {...action.payload}
      }

    case ADD_SITE_TO_TAG:
    case DELETE_SITE_FROM_TAG:
      return {
        ...state,
        oneTag: {...action.payload},
        allTags: {
          ...state.allTags,
          [action.payload.id]: action.payload
        }
      };

    case DELETE_TAG: {
        const newState = {
        ...state,
        allTags: {...state.allTags},
        oneTag: {}
      }
      delete newState.allTags[action.tagId]
      return newState
    }

    default: return state;
  }
}

export default tagReducer
