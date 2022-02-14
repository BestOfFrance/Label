export default function SeeButton(props) {
  return(
    <div onClick={props.onClickShop(props.shop)}>
      See More
    </div>
  )
}