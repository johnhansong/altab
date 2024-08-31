//*------ACTION TYPES---------
const GET_ALL_SITES = '/site/GET_SITES'
const GET_ONE_SITE = '/site/GET_ONE_SITE'


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


//*---------REDUCERS-----------
const initialState = {allSites: {}, oneSite: {}}

const websiteReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_ALL_SITES:
      return {...state, allSites:{...action.payload}}

    case GET_ONE_SITE:
      return {...state, oneSite: {...action.payload}}

    default: return state;
  }
}

export default websiteReducer
