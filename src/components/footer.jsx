import './footer.css'

import './NewFooter.css'
import CheckoutButton from './CheckoutButton'

export default function Footer(props) {
  return (
   

 
<footer className="footer-container" >
  <div className="footer-top-container">
  <div class="w-layout-grid grid_footer--top">
    <div class="dblock flex-v">
      <div class="e-title_footer">Top Cities (coming soon)</div>
      <div class="e-link_footer--label">Vancouver, BC</div>
      <div class="e-link_footer--label">Toronto, ON</div>
      <div class="e-link_footer--label">Edmonton, AB</div>
    </div>
    <div class="dblock flex-v">
      <div class="e-title_footer">CUISINES NEAR YOU (coming Soon)</div>
      <div class="e-link_footer--label">Fine Restaurants near Me</div>
      <div class="e-link_footer--label">Pastry Shops near me</div>
      <div class="e-link_footer--label">Bakeries near me</div>
    </div>
    <div class="dblock flex-v">
      <div class="e-title_footer">Social</div>
      <a rel="nofollow" href="https://www.facebook.com/bestoffranceCanada/" target="_blank"
        class="lblock flex-h margin-b-10 w-inline-block">
        <img src="https://uploads-ssl.webflow.com/5e7ec4cbdc544552e7ea5886/5ea47f94dddc5f3871889349_icon-facebook.svg"
          alt="Facebook | Best of France" class="e-image--sm" />
        <div class="e-text_footer--sm">Facebook</div>
      </a>
      <a rel="nofollow" href="https://www.facebook.com/groups/276877796782827/" target="_blank"
        class="lblock flex-h margin-b-10 w-inline-block">
        <img src="https://uploads-ssl.webflow.com/5e7ec4cbdc544552e7ea5886/5ea47f94dddc5f3871889349_icon-facebook.svg"
          alt="Facebook | Best of France" class="e-image--sm" />
        <div class="e-text_footer--sm">Facebook Group</div>
      </a>
      <a rel="nofollow" href="https://www.instagram.com/bestoffrance.ca" target="_blank"
        class="lblock flex-h margin-b-10 w-inline-block">
        <img src="https://uploads-ssl.webflow.com/5e7ec4cbdc544552e7ea5886/5ea47f9427484ba96aa8603b_icon-instagram.svg"
          alt="Instagram | Best of France" class="e-image--sm" />
        <div class="e-text_footer--sm">Instagram</div>
      </a>
    </div>
  </div>
  <div class="grid-3columns footer-arg">
    
    <div class="dblock flex-v">
      <div class="e-title_footer">Become labeled</div>
      <a href="/label/what-represents-the-best-of-france-label" class="e-link_footer--label">Why a Label?</a>
      <a href="/label/how-to-apply-for-best-of-france-label" class="e-link_footer--label">How to apply?</a>
      <a href="/label/what-are-the-advantages-to-join-the-best-of-france-label" class="e-link_footer--label">What are
        the advantages?</a>
      <a href="/label/dashboard" class="e-link_footer--label">Dashboard Access</a>
    </div>
    <div id="w-node-_62644ab4-19ac-6e63-74c8-fdb8e9a8d614-e9a8d5e0" class="dblock flex-v center">
      <a href="mailto:label@bestoffrance.ca" class="e-link_footer--label email">label@bestoffrance.ca</a>
      <a href="#" class="e-footer_logo--label w-inline-block"><img className="footer-logo"
          src="https://uploads-ssl.webflow.com/5e7ec4cbdc544552e7ea5886/5e9b3e9805bf3a8858130f3c_fts_favicon_256.png"
          width="40" alt="Best of France Logo" />
      </a>
      <div class="e-text_footer--didascalie">This experience is provided by Best of France</div>
    </div>
    <div class="dblock flex-v">
      <div class="e-title_footer">Explore MORE</div><a href="/event" class="e-link_footer--label">Event</a><a
        href="/blog" class="e-link_footer--label">Blog</a><a href="/" class="e-link_footer--label">Home</a>
    </div>
  </div>
  </div>
  <div class="legal">
  <CheckoutButton/>
    <div class="footer-legal-txt">Copyright © 2021 Best of France LLP. All rights reserved.</div>
  </div>


</footer>

        



       

  )
}