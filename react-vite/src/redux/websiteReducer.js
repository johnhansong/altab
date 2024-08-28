//*------ACTION TYPES---------
const GET_ALL_SITES = '/site/GET_SITES'




//*-------ACTION CREATORS---------
export const loadAllSites = (websites) => {
  return {
    type: GET_ALL_SITES,
    payload: websites
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


//*---------REDUCERS-----------
const initialState = {allSites: {}, oneSite: {}}

const websiteReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_ALL_SITES:
      return {...state, allSites:{...action.payload}}

    default: return state;
  }
}

export default websiteReducer
