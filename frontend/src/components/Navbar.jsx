import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";

export default function Navbar() {

return(

<AppBar position="static">

<Toolbar>

<Typography sx={{flexGrow:1}}>

AI First CRM

</Typography>

<Avatar>U</Avatar>

</Toolbar>

</AppBar>

)

}