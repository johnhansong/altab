import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux"
import { fetchAllTags,removeSitefromTag, appendSitetoTag} from "../../redux/tagsReducer";
import './AddTagModal.css'

const AddTagModal = () => {
  const dispatch = useDispatch()
  const currSite = useSelector((state) => state.websites.oneSite)
  const siteTags = currSite.tags
  const allTags = useSelector((state) => state.tags.allTags || {})
  const tagsArray = Object.values(allTags)

  const [options, setOptions] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  console.log("alltags", allTags)

  useEffect(() => {
    dispatch(fetchAllTags())
  }, [dispatch])

  useEffect(() => {
    setOptions(tagsArray.map(tag => ({
      label: tag.name,
      value: tag.id
    })));
  }, [allTags])

  useEffect(() => {
    setSelectedTags(siteTags.map(tag => ({
      label: tag.name,
      value: tag.id
    })));
  }, [siteTags])

  const handleAddTag = () => {
    
  }

  const handleChange = (selectedOptions) => {

  }

  return (
    <div className="add-tag-modal-wrapper">
      <h3 className="add-tag-modal-header">
        Tags for {currSite.name}
      </h3>

      <CreatableSelect
        className="add-tag-modal-select"
        isMulti
        options={options}
        value={selectedTags}
      />
    </div>
  )
}

export default AddTagModal
