import { useState, useEffect, useMemo } from "react";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux"
import { fetchAllTags, createTag } from "../../redux/tagsReducer";
import { updateSiteTags } from "../../redux/websiteReducer";
import { useModal } from "../../context/Modal";
import './AddTagModal.css'

const toOption = (tag) => ({ label: tag.name, value: tag.id });

const AddTagModal = () => {
  const dispatch = useDispatch();
  const currSite = useSelector((state) => state.websites.oneSite) || {};
  const siteTags = currSite.tags;
  const allTagsObj = useSelector((state) => state.tags.allTags || {});
  const allTags = useMemo(() => Object.values(allTagsObj), [allTagsObj]);
  const { closeModal } = useModal();

  const [options, setOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);

  // Loading all tags at mount
  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  useEffect(() => {
    setOptions(allTags.map(toOption));
  }, [allTags]);

  useEffect(() => {
    setSelectedTags(siteTags.map(toOption));
  }, [siteTags]);

  const handleChange = (newValue) => {
    setSelectedTags(newValue || []);
  };

  const handleCreate = async (inputValue) => {
    const name = (inputValue || "").trim();
    if (!name) return;

    const existing = options.find(option => option.label.toLowerCase() === name.toLowerCase());
    if (existing) {
      setSelectedTags(prev =>
        prev.some(p => p.value === existing.value) ? prev : [...prev, existing]
      );
      return;
    }

    try {
      setCreating(true);

      const newTag = await dispatch(createTag({name, description: ""}));
      if (!newTag) return;

      const newOption = toOption(newTag);
      setSelectedTags(prev => [...prev, newOption]);

      setOptions(prev => {
        if (prev.some(opt => opt.value === newOption.value)) return prev;
        return [...prev, newOption]
      });
    } finally {
      setCreating(false);
    }
  };

  const handleSave = async () => {
    if (!currSite.id) return;
    setSaving(true);
    try {
      const tagIds = selectedTags.map(opt => opt.value);
      const updatedSite = await dispatch(updateSiteTags(currSite.id, tagIds));
      if (updatedSite?.tags) setSelectedTags(updatedSite.tags.map(toOption));
    } catch (err) {
      console.error("Save tags failed", err)
    } finally {
      setSaving(false);
      closeModal()
    }
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
        onChange={handleChange}
        onCreateOption={handleCreate}
        isClearable
        isDisabled={creating || saving}
        placeholder={creating ? "Creating..." : "Add or create tags..."}
        noOptionsMessage={() => "Type to create a new tag"}
      />

      <button onClick={handleSave} disabled={saving || creating}>
        {saving ? "Saving..." : "Save Tags"}
      </button>
    </div>
  )
}

export default AddTagModal
