import './footer.css'

export default function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-icon-container">
          <img className="footer-icon" src="facebook.svg"/>
          <img className="footer-icon" src="instagram.png"/>
          <img className="footer-icon" src="youtube.svg"/>
        </div>
        Copyright @ 2022 Best of France LLP. All rights reserved.
      </div>
    </div>
  )
}