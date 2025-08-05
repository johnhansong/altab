import { useModal } from "../../context/Modal"
import "./ConfirmationModal.css"

const ConfirmationModal = ({text, buttonText, buttonAction}) => {
  const { closeModal } = useModal()

  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-text">{text}</div>
        </div>
        <div className="modal-buttons">
          <button onClick={closeModal}>Cancel</button>
          <button onClick={buttonAction}>{buttonText}</button>
        </div>
      </div>
    </div>
  )


}

export default ConfirmationModal
