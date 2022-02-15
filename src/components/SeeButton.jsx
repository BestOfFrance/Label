export default function SeeButton(props) {
  return(
    <button onClick={() => {props.onClickShop(props.shop)}}>
      See More
    </button>
  )
}