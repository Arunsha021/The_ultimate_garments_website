import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
  mainContainer: {
    width: "100wh",
    height: "100vh",
    background: "#ecf0f1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
  },
  box: {
    width: "50%",
    height: "auto",
    background: "#fff",
    borderRadius: 5,
    marginTop: "3%",
  },
  headingText: {
    fontFamily: "Merriweather Sans",
    width: "80%",
    fontSize: 30,
    fontWeight: 700,
    padding: 2,
    margin: 3,
    color: "#01579b",
  },
  gridStyle: {
    padding: 10,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
