import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createSite } from '../../redux/websiteReducer'
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'
import './AddSitePage.css'

function AddSite ({toggle}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sessionUser = useSelector((state) => state.session.user)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [image, setImage] = useState("")
  const [errors, setErrors] = useState({})

  const handleName = (e) => setName(e.target.value)
  const handleDescription = (e) => setDescription(e.target.value)
  const handleLink = (e) => setLink(e.target.value)
  const handleImage = (e) => setImage(e.target.value)

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

      if (!link) { error.link = "Site link is required" }

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
        const newSite = await dispatch(createSite(payload))

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


  if (toggle == 'create') {
      return (
        <div className="create-site-form-wrapper">
          <header>
            <h1 className="addsite-header">Add a new website</h1>
          </header>

          <div className="addsite-form-wrapper">
              <div className="addsite-form-text">
                <p className="addsite-intro">All the websites on Altab were saved by people like you. Now&apos;s your chance to add your own!</p>
                <p className="addsite-advisory">Please be sure to adhere to the following guideline when posting your site</p>
                <ol>
                  <li>Don&apos;t post malicious links or scams</li>
                  <li>Don&apos;t post personal information</li>
                  <li>Do post fun or useful websites</li>
                </ol>
              </div>

            <form className="addsite-form" onSubmit={handleSubmit}>
              <div className="addsite-input">
                <input
                  onChange={handleName}
                  placeholder='Website Name'
                ></input>
                <p>{errors.name}</p>
              </div>

              <div className="addsite-input">
                <textarea
                  onChange={handleDescription}
                  placeholder='Website Description'
                ></textarea>
                <p>{errors.description}</p>
              </div>

              <div className="addsite-input">
                <input
                  onChange={handleLink}
                  placeholder='Website Link'
                ></input>
                <p>{errors.link}</p>
              </div>

              <div className="addsite-input">
                <input
                  onChange={handleImage}
                  placeholder='Website Image Url'
                ></input>
                <p>{errors.image}</p>
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
                    Submit!
                  </button>
                }
              </div>

            </form>
          </div>
        </div>
      )
    }


    if (toggle === "update") {
      return(
        <div>
          Hello from edit
        </div>
      )
    }
  }

export default AddSite
