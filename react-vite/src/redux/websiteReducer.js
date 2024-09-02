//*------ACTION TYPES---------
const GET_ALL_SITES = '/site/GET_SITES'
const GET_ONE_SITE = '/site/GET_ONE_SITE'
const POST_SITE = '/site/POST_SITE'


//*-------ACTION CREATORS---------
export const loadAllSites = (websites) => {
  return {
    type: GET_ALL_SITES,
    payload: websites
  }
}

export const loadOneSite = (website) => {
  return {
    type: GET_ONE_SITE,
    payload: website
  }
}

export const addSite = (website) => {
  return {
    type: POST_SITE,
    payload: website
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


//*---------REDUCERS-----------
const initialState = {allSites: {}, oneSite: {}}

const websiteReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_ALL_SITES:
      return {...state, allSites:{...action.payload}}

    case GET_ONE_SITE:
      return {...state, oneSite: {...action.payload}}

    case POST_SITE:
      return {
        ...state,
        allSites: {
          ...state, allSites,
          [action.payload.id]: action.payload
        },
        oneGroup: {...action.payload}
      }

    default: return state;
  }
}

export default websiteReducer
