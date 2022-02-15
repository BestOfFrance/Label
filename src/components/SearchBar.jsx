import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "none",
    background: "white",
     
  },
}));
export default function SearchBar(props) {
  const classes = useStyles();
  return (
    <Autocomplete
      id="combo-box-demo"
      value={true ? "" : props.searchSelected}
      options={props.searchList}
      onChange={(e, value) => props.updateSearch(e, value)}
      getOptionLabel={(option) => option.name || ""}
      style={{ width: 400 }}
      
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