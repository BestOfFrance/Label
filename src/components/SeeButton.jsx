import './SeeButton.css'

export default function SeeButton(props) {
  return(
    <button className='seebutton' >
      {props.text}
    </button>
  )
}