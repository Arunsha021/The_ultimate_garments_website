import { useState } from "react"
import { useStyles } from "./BannerImagesCss";
import { Avatar, TextField, Grid, Button } from "@mui/material";
import { postData } from "../Services/NodeServices";
import Swal from "sweetalert2"
import { useNavigate } from "react-router";
import { DropzoneArea } from 'material-ui-dropzone'


export default function BannerImages(props) {
    var classes = useStyles()
    var navigate = useNavigate()

    const [getFiles, setFiles] = useState([])


    const handleSave = (files) => {
        //Saving files to state for further use and closing Modal.
        setFiles(files)

    }

    const handleSubmit = async () => {
        var formData = new FormData();

        getFiles.map((item, index) => {
            formData.append("picture" + index,item);

        });

        var result = await postData("products/add_new_banners", formData, true)
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
                <Grid item xs={12} style={{ display: 'flex' }}>
                    <div className={classes.headingText}>
                          Banner Interface

                    </div>
                </Grid>
                <Grid item xs={12}>
                    <DropzoneArea

                        onChange={handleSave}
                        acceptedFiles={['image/jpeg','images/jpg', 'image/png', 'image/bmp']}
                        showPreviews={false}
                        filesLimit={6}
                        maxFileSize={5000000}

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