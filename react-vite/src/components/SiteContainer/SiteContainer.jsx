import { useState } from 'react'
import OpenModalButton from '../OpenModalButton'
import './SiteContainer.css'

const SiteContainer = ({siteDetails, className, btnHandle}) => {
  // FORMAT:
  // const buttonHandle = {
  //   "redBtnText": "See More",
  //   "yellowBtnText": "Add",
  //   "greenBtnText": "Visit",
  //   "redBtnHandle": handleRedBtn,
  //   "yellowBtnHandle": handleYellowBtn,
  //   "greenBtnHandle": handleGreenBtn
  // }

  // console.log("BTNHANDLE", btnHandle.greenBtnHandle)

  const [redBtnText] = useState(btnHandle.redBtnText ? btnHandle.redBtnText : "")
  const [yellowBtnText] = useState(btnHandle.yellowBtnText ? btnHandle.yellowBtnText : "")
  const [greenBtnText] = useState(btnHandle.greenBtnText ? btnHandle.greenBtnText : "")

  return (
    <div key={siteDetails.id} className={`${className}-site-container`}>
        <div className="site-container-btns">
          <button className="sc-circle-btn"
                  id="sc-red-btn"
                  onClick={() => btnHandle.redBtnHandle(siteDetails.id)}
          >{redBtnText}</button>

          <OpenModalButton className="sc-circle-btn"
                  id="sc-yellow-btn"
                  buttonText={yellowBtnText}
                  modalComponent={
                    <h3 className="in-dev-msg">Add to Collection in Development!</h3>
                  }
          ></OpenModalButton>

          <button className="sc-circle-btn"
                  id="sc-green-btn"
                  onClick={() => btnHandle.greenBtnHandle(siteDetails.link)}
          >{greenBtnText}</button>
        </div>

      <div className={`${className}-site-con-info`}>
        <img className={`${className}-site-con-img`}
            src={siteDetails.preview_img?.length ? siteDetails.preview_img : "./template.png"}
        />

        <div className={`${className}-site-con-details`}>
          <h4>{siteDetails.name}</h4>
          <p>{siteDetails.description}</p>
        </div>
      </div>

    </div>
  )
}

export default SiteContainer
