import './footer.css'

export default function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-icon-container">
          <img className="footer-icon" src="facebook.png"/>
          <img className="footer-icon" src="instagram.png"/>
          <img className="footer-icon" src="youtube.png"/>
        </div>
        Copyright @ 2022 Best of France LLP. All rights reserved.
      </div>
    </div>
  )
}