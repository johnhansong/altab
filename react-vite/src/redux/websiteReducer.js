//*------ACTION TYPES---------
const GET_ALL_SITES = '/site/GET_SITES'
const GET_ONE_SITE = '/site/GET_ONE_SITE'
const ADD_SITE = '/site/ADD_SITE'
const DELETE_SITE = '/site/DELETE_SITE'
const CLEAR_STATE = '/site/CLEAR_STATE'


//*-------ACTION CREATORS---------
const loadAllSites = (websites) => {
  return {
    type: GET_ALL_SITES,
    payload: websites
  }
}

const loadOneSite = (website) => {
  return {
    type: GET_ONE_SITE,
    payload: website
  }
}

const addSite = (website) => {
  return {
    type: ADD_SITE,
    payload: website
  }
}

const doomedWebsite = (websiteId) => {
  return {
    type: DELETE_SITE,
    websiteId
  }
}

export const clearSiteState = () => {
  return {
    type: CLEAR_STATE
  }
}


//*---------THUNKS------------
// Get all Websites
export const fetchAllSites = () => async (dispatch) => {
  const res = await fetch('/api/sites');

  if (res.ok) {
    const data = await res.json()
    const websites = data.websites
    dispatch(loadAllSites(websites))
  }
}

export const fetchOneSite = (siteId) => async (dispatch) => {
  const res = await fetch(`/api/sites/${siteId}`)

  if (res.ok) {
    const data = await res.json()
    const website = data.website
    dispatch(loadOneSite(website))
  }
}

export const createSite = (website) => async (dispatch) => {
  try {
    const res = await fetch(`/api/sites/`, {
        method: "POST",
        body: JSON.stringify(website),
        headers: { "Content-Type": "application/json" }
    });

    if (res.ok) {
      const newSite = await res.json();
      dispatch(addSite(newSite))
      return newSite;
    } else {
      const err = await res.json();
      throw err
    }
  } catch(err) {
    console.error("Error creating website", err)
  }
}

export const updateWebsite = (website, websiteId) => async (dispatch) => {
  const res = await fetch(`/api/sites/${websiteId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(website)
  });

  if (res.ok) {
    const updatedSite = await res.json()
    dispatch(addSite(updatedSite));
    return updatedSite
  }
}

export const destroyWebsite = (websiteId) => async (dispatch) => {
  const res = await fetch(`/api/sites/${websiteId}`, {
    method: "DELETE"
  });

  if (res.ok) {
    dispatch(doomedWebsite(websiteId))
  }
}


//*---------REDUCERS-----------
const initialState = {allSites: {}, oneSite: {}}

const websiteReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_ALL_SITES:
      return {...state, allSites:{...action.payload}}

    case GET_ONE_SITE:
      return {...state, oneSite: {...action.payload}}

    case ADD_SITE:
      return {
        ...state,
        allSites: {
          ...state.allSites,
          [action.payload.id]: action.payload
        },
        oneSite: {...action.payload}
      }

    case DELETE_SITE: {
      const newState = {
        ...state,
        allSites: {...state.allSites},
        oneSite: {}
      }
      delete newState.allSites[action.websiteId]
      return newState
    }

    case CLEAR_STATE: {
      return {
        ...state,
        oneSite: {}
      }
    }

    default: return state;
  }
}

export default websiteReducer
