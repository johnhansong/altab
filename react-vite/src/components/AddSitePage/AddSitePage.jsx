import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createSite, updateWebsite, clearSiteState } from '../../redux/websiteReducer'
import { fetchOneSite } from '../../redux/websiteReducer'
import { isValidUrl } from '../../../bandaid'
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'
import './AddSitePage.css'

function AddSite ({toggle}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sessionUser = useSelector((state) => state.session.user)
  const sessionSite = useSelector((state) => state.websites.oneSite)
  const { siteId } = useParams();
  const siteExists = Object.values(sessionSite).length

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [image, setImage] = useState("")
  const [errors, setErrors] = useState({})

  const handleName = (e) => setName(e.target.value)
  const handleDescription = (e) => setDescription(e.target.value)
  const handleLink = (e) => setLink(e.target.value)
  const handleImage = (e) => setImage(e.target.value)

  useEffect(() => {
    if (toggle === "create") {
      setName("")
      setDescription("")
      setLink("")
      setImage("")
    }
    if (siteId && toggle === "update") {
      dispatch(fetchOneSite(siteId))
    }
    return () => dispatch(clearSiteState())
  }, [dispatch, siteId, toggle])

  useEffect(() => {
    if (siteExists && siteId) {
      setName(sessionSite.name || "")
      setDescription(sessionSite.description || "")
      setLink(sessionSite.link || "")
      setImage(sessionSite.image || "")
    }
  }, [sessionSite, siteExists, siteId])

  const handleSubmit = async(e) => {
    e.preventDefault();

    const error = {}
      if (!name) {
        error.name = "Site name is required"
      } else if (name.length > 30) {
        error.name = "Site name must not exceed 30 characters"}

      if (!description) {
        error.description = "Site description is required"
      } else if (description.length < 30) {
        error.description = "Site description must be 30 characters or more"}

      if (!link) {
        error.link = "Site link is required"
      } else if (!isValidUrl(link)) {
        error.link = "Please provide a valid URL (with https:// prefix)"
      }

      if (Object.keys(error).length > 0) {
        setErrors(error)
        return;
      }

      const payload = {
        name,
        link,
        description,
        "preview_img": image
      }

      try {
        let newSite;
        if (siteId) {
          newSite = await dispatch(updateWebsite(payload, siteId))
        } else {
          newSite = await dispatch(createSite(payload))
        }

        if (newSite) {
          navigate(`/sites/${newSite.id}`)
        }
      } catch (res) {
        const data = await res.json();
        if (data?.errors) {
          setErrors(...errors, ...data.errors)
        }
      }
  }


  if (toggle == 'update' && sessionSite.user_id !== sessionUser.id) {
    return (
      <div>
        Unauthorized
      </div>
    )
  }

  return (
    <div className="create-site-form-wrapper">
      <header>
        <h1 className="addsite-header">{siteExists ? "Update Your Website" : "Add a new website"}</h1>
      </header>

      <div className="addsite-form-wrapper">
          <div className="addsite-form-text">
            <p className="addsite-intro">
              { !siteExists &&
                "All the websites on Altab were saved by people like you. Now's your chance to add your own!"
              }
            </p>
            <p className="addsite-advisory">Please be sure to adhere to the following guideline when {siteExists ? "updating" : "posting"} your site</p>
            <ol>
              <li className="addsite-advisory">Don&apos;t post malicious links or scams</li>
              <li className="addsite-advisory">Don&apos;t post personal information</li>
              <li className="addsite-advisory">Do post fun or useful websites</li>
            </ol>
          </div>

        <form className="addsite-form" onSubmit={handleSubmit}>
          <div className="addsite-input">
            <h3>Website Title*</h3>
            <input
              onChange={handleName}
              placeholder='Website Name'
              value={name}
            ></input>
            <p className="error">{errors.name}</p>
          </div>

          <div className="addsite-input">
          <h3>Website Description*</h3>
            <textarea
              onChange={handleDescription}
              placeholder='Website Description'
              value={description}
            ></textarea>
            <p className="error">{errors.description}</p>
          </div>

          <div className="addsite-input">
          <h3>Website Link*</h3>
            <input
              onChange={handleLink}
              placeholder='Website Link'
              value={link}
            ></input>
            <p className="error">{errors.link}</p>
          </div>

          <div className="addsite-input">
          <h3>Website Image</h3>
            <input
              onChange={handleImage}
              placeholder='Website Image Url'
              value={image}
            ></input>
            <p className="error">{errors.image}</p>
          </div>

          <div className="addsite-submit-btns">
            { !sessionUser ?
                <OpenModalButton
                  className="addsite-form-submit-btn"
                  modalComponent={LoginFormModal}
                  buttonText="Log In"
                ></OpenModalButton>
            :
              <button className="addsite-form-submit-btn" type="submit">
                { siteExists ? "Update!"
                            : "Submit!"
                }
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  )

  }

export default AddSite
