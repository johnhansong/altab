import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { fetchAllSites } from '../../redux/websiteReducer'
import { fetchAllTags } from '../../redux/tagsReducer';
import SiteContainer from '../SiteContainer';
import { limitString } from '../../../bandaid';

import './SiteListPage.css'

const SiteListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTag = searchParams.get('tag') || '';

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const websites = useSelector((state) => state.websites.allSites);
  const allTagsObj = useSelector((state) => state.tags.allTags || {});
  const allTags = useMemo(() => Object.values(allTagsObj), [allTagsObj]);
  const websitesObjValue = Object.values(websites);

  const [filterTag, setFilterTag] = useState(initialTag);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    setFilterTag(searchParams.get('tag') || '')
  }, [searchParams])

  const websitesorter = (websites = [], filter = '') => {
    const arr = Array.isArray(websites) ? [...websites] : []
    switch(filter) {
      case "alphabetical (A-Z)":
        return arr.sort((a, b) => {
          const an = (a.name || '').toLowerCase();
          const bn = (b.name || '').toLowerCase();
          if (an < bn) return -1;
          if (an > bn) return 1;
          return 0
        })
      case "alphabetical (Z-A)":
        return arr.sort((a, b) => {
          const an = (a.name || '').toLowerCase();
          const bn = (b.name || '').toLowerCase();
          if (an < bn) return 1;
          if (an > bn) return -1;
          return 0
        })
      case "recent":
        return arr.sort((a, b) => {
          const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bt - at;
        });
      default:
        return arr
    }
  }

  const websitesArray = useMemo(() => {
    const arr = Array.isArray(websitesObjValue) ? websitesObjValue : []

    const filtered = filterTag != ""
      ? arr.filter(site => (site.tags || []).some(t=>t.id === Number(filterTag)))
      : arr;

      return websitesorter(filtered, sortBy)
  }, [websitesObjValue, sortBy, filterTag])

  const handleTag = (e) => {
    const tagId = e.target.value
    setFilterTag(tagId);
    setFilterTag(tagId);
    const params = new URLSearchParams(searchParams)
    if (tagId) params.set('tag', tagId); else params.delete('tag');
    setSearchParams(params);
  }

  useEffect(() => {
    dispatch(fetchAllSites())
    dispatch(fetchAllTags())
  }, [dispatch])

  const handleRedBtn = (siteId) => {
    navigate(`/sites/${siteId}`)
  }

  const handleYellowBtn = () => {
    // will be developed once collections are created. Add "in dev" modal in meantime?
  }

  const handleGreenBtn = (link) => {
    window.location.href = `${link}`
  }

  const buttonHandle = {
    "redBtnText": "Details",
    "yellowBtnText": "Add",
    "greenBtnText": "Visit",
    "redBtnHandle": handleRedBtn,
    "yellowBtnHandle": handleYellowBtn,
    "greenBtnHandle": handleGreenBtn
  }

  return (
    <span className='site-listpage-wrapper'>
      <h2>Explore Websites</h2>

      <div className='site-listpage-navbar'>
        <div className="site-listpage-dropdown">
          <select
            className="dropdown"
            id="sort-sites-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="alphabetical (A-Z)">Alphabetical (A-Z)</option>
            <option value="alphabetical (Z-A)">Alphabetical (Z-A)</option>
            <option value="recent">Recent</option>
          </select>

          <select
            className="dropdown"
            id="filter-sites-by-tag-dropdown"
            value={filterTag}
            onChange={handleTag}
          >
            <option value="">Filter by Tag</option>
            {allTags.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="post-site-btn"
          onClick={() => navigate("/sites/add")}
        >Post a Website</button>


      </div>

      <div className="list-page-sites">{websites.length < 1 ?
            <span className="loading"> Loading... </span>
                :
              <>
                {websitesArray.map(site => {
                  if (site.description.length > 115) {
                    site["description"] = limitString(site.description, 80)
                  }

                  return (
                    <div key={site.id} className="lp-site-item">
                      <SiteContainer siteDetails={site} className="site-listpage" btnHandle={buttonHandle}/>
                    </div>
                  )}
                )}
              </>}
          </div>
    </span>
  )
}

export default SiteListPage
