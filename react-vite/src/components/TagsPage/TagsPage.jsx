import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchAllTags } from "../../redux/tagsReducer"
import "./TagsPage.css"

const TagsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const tags = useSelector((state) => state.tags.allTags || {})
  const tagArray = Object.values(tags)

  const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

  const groupedTags = tagArray.reduce((acc, tag) => {
    const firstLetter = tag.name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = []
    acc[firstLetter].push(tag);
    return acc;
  }, {});

  // console.log('groupedtags', groupedTags)

  useEffect(() => {
    dispatch(fetchAllTags())
  }, [dispatch])

  return (
    <div className='tags-page-wrapper'>
      <div className='tags-block'>
        <h1 className='tags-header'>Tags</h1>
        <div className='tags-inner-block'>
          <div className='tags-organized'>
            {alphabet.map(letter => (
              <div key={letter}>
                <h2 className="tag-letter-h2">{letter}</h2>
                <ul className="tag-groups-by-letter">
                  {groupedTags[letter]?.map(tag => (
                    <li key={tag.id}
                        className="tag"
                        onClick={() => navigate(`/sites?tag=${tag.id}`)}
                    >
                      {tag.name}
                    </li>
                  )) || <li className="no-tags">No tags</li>}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagsPage
