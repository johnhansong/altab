import { useState } from 'react'
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

          <button className="sc-circle-btn"
                  id="sc-yellow-btn"
          >{yellowBtnText}</button>

          <button className="sc-circle-btn"
                  id="sc-green-btn"
                  onClick={() => btnHandle.greenBtnHandle(siteDetails.link)}
          >{greenBtnText}</button>
        </div>

      <div className={`${className}-site-con-info`}>
        <img className={`${className}-site-con-img`}
            src={siteDetails.preview_img?.length ? siteDetails.link : "./template.png"}
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
