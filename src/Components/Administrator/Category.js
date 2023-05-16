import { useState } from "react"
import { useStyles } from "./CategoryCss";
import { Avatar, TextField, Grid, Button } from "@mui/material";
import { postData } from "../Services/NodeServices";
import Swal from "sweetalert2"
import { useNavigate } from "react-router";


export default function Category(props) {
  var classes = useStyles()
  var navigate = useNavigate()

  const [categoryName, setCategoryName] = useState('')
  const [icon, setIcon] = useState({ url: '/icon.png', bytes: '' })
  const handleIcon = (event) => {
    setIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })

  }
  const handleSubmit = async () => {
    var formData = new FormData()
    formData.append('categoryname', categoryName)
    formData.append('icon', icon.bytes)
    var result = await postData('category/add_new_category', formData, true)
    if (result.result) {
      Swal.fire({
        icon: 'success',
        title: 'Record Submitted Successfully',

      })

    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',

      })
    }

  }
  return (<div className={classes.mainContainer}>
    <div className={classes.box}>

      <Grid className={classes.gridStyle} container spacing={2}>
        <Grid item xs={12} style={{ display:'flex' }}>
          <div className={classes.headingText}>
            Category Interface

          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '55%', height: '50' }}>
            <Avatar src={'/report.png'} style={{ width: 35 }} onClick={() => navigate('/dashboard/displayallcategory')} variant="square" />
          </div>

        </Grid>

        <Grid item xs={12}>
          <TextField onChange={(event) => setCategoryName(event.target.value)} fullWidth variant="outlined" label="Category Name" />
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Button onChange={handleIcon} fullWidth variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar
            alt="Remy Sharp"
            src={icon.url}
            sx={{ width: 70, height: 70 }}
            variant="square"
          />
        </Grid>

        <Grid item xs={6}>
          <Button onClick={handleSubmit} fullWidth variant="contained">Submit</Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained">Reset</Button>
        </Grid>
      </Grid>
    </div>
  </div>)

}