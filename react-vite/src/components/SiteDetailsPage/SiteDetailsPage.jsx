import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchOneSite } from "../../redux/websiteReducer"
import "./SiteDetailsPage.css"

const SiteDetailsPage = () => {
  const dispatch = useDispatch()
  const {siteId} = useParams()
  const currSite = useSelector((state) => state.websites.oneSite)

  const [previewImg, setPreviewImg] = useState(currSite["preview_img"] ? currSite["preview_img"] : '../placeholder.png')

  useEffect(() => {
    dispatch(fetchOneSite(siteId))
  }, [dispatch])

  return (
    <span className="site-details-wrapper">
      <section className="site-details-block-1">
        <img className="site-details-img" src={previewImg}/>

      </section>

    </span>
  )
}


export default SiteDetailsPage
