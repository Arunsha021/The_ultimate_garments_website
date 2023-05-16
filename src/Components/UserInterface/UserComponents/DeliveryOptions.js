import { TextField, Button } from "@mui/material"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"

export default function DeliveryOptions() {

    return (
        <div>
            <div style={{ display: 'flex', fontSize: 20, fontWeight: 500, padding: 10 }}>
                DELIVERY OPTIONS  &nbsp;&nbsp;<LocalShippingIcon />
            </div>
            <div style={{ border: '1px solid #ddd',marginTop:'2%',padding:'1%' }}>
            <div style={{ fontSize: '16px', padding: '2%' }}>   Enter your Pincode to check the delivery time and free pick up options</div>
            <div style={{ padding: '2%', display: 'flex', position: 'relative' }}> <TextField id="standard-basic" variant="outlined"  inputProps={ {maxLength: 6 ,  style: { height: "6px"}}} placeholder='Enter Pincode' style={{ width: "50%", height: '10%' }} /><Button style={{ position: 'relative', right: '70px', color: '#51cbcc', textDecoration: 'underline' }}>Check</Button></div>

            <div style={{ display: 'flex', flexDirection: 'row' }}><img src='cod.png' width='45px' /><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '1%',fontWeight:'bold',fontSize:'16' }}>Cash On Delivery</div></div>
            <div style={{ display: 'flex', flexDirection: 'row' }}><img src='express.png' width='55px' /><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '1%', fontWeight:'bold',fontSize:'16' }}>Express Shipping</div></div>
        </div>
    </div>)
}
