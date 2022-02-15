import './SeeButton.css'

export default function SeeButton(props) {
  return(
    <button className='seebutton' onClick={() => {props.onClickShop(props.shop)}}>
      See More
    </button>
  )
}