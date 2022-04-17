import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {useEffect, useState} from 'react'
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "none",
    background: "white",
     
  },
}));
export default function SearchBar(props) {

  const [width, setWidth] = useState(window.innerWidth);
  const [style, setStyle] = useState(500)
  const breakpoint = 1000;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    if (width > breakpoint) {
      setStyle(500)
    }
    if (width < breakpoint) {
      setStyle(300)
    }
    
  }, [width])

  const classes = useStyles();
  return (
    <Autocomplete
      id="combo-box-demo"
      value={true ? "" : props.searchSelected}
      options={props.searchList}
      onChange={(e, value) => props.updateSearch(e, value)}
      getOptionLabel={(option) => option.name || ""}
      style={{ width: style }}
      
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          // label="Search.."
          placeholder="Search.."
          size="small"
          color="secondary"
          fullWidth
          classes={{
            root: classes.root,
          }}
        />
      )}
    />
  );
}