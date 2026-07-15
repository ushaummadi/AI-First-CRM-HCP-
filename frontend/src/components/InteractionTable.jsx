import {

Table,

TableBody,

TableCell,

TableHead,

TableRow

}

from "@mui/material";

export default function InteractionTable({

rows

}){

return(

<Table>

<TableHead>

<TableRow>

<TableCell>Date</TableCell>

<TableCell>Product</TableCell>

<TableCell>Sentiment</TableCell>

</TableRow>

</TableHead>

<TableBody>

{

rows.map((r)=>(

<TableRow key={r.id}>

<TableCell>

{r.created_at}

</TableCell>

<TableCell>

{r.products}

</TableCell>

<TableCell>

{r.sentiment}

</TableCell>

</TableRow>

))

}

</TableBody>

</Table>

)

}