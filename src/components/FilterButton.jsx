import Button from '@mui/material/Button';
export default function FilterButton(props) {

  return (
    <Button onClick={() => {props.onFilterCms(props.myCategories)}}>{props.title}</Button>
  )
}