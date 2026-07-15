import {Card,CardContent,Typography} from "@mui/material";

export default function HCPCard({doctor}){

return(

<Card sx={{mb:1}}>

<CardContent>

<Typography variant="h6">

{doctor.name}

</Typography>

<Typography>

{doctor.speciality}

</Typography>

<Typography>

{doctor.hospital}

</Typography>

<Typography>

{doctor.city}

</Typography>

</CardContent>

</Card>

)

}