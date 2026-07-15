import {useState} from "react";

import api from "../api/api";
import { toast } from "react-toastify";
import {

TextField,

Button,

Paper,

Typography

}

from "@mui/material";

export default function AIChat(){
const [msg, setMsg] = useState("");
const [reply, setReply] = useState("");
const [loading, setLoading] = useState(false);
const send = async () => {

    try {

        setLoading(true);

        const res = await api.post("/agent/chat", {
            message: msg
        });

        setReply(res.data.response);

    } catch (err) {

        console.log(err);

    } finally {

        setLoading(false);

    }

}

return(

<Paper sx={{p:2}}>

<Typography variant="h5">

AI Assistant

</Typography>

<TextField

fullWidth

multiline

rows={5}

value={msg}

onChange={(e)=>setMsg(e.target.value)}

/>

<Button
variant="contained"
onClick={send}
disabled={loading}
>

{loading ? "Sending..." : "Send"}

</Button>

<Typography sx={{mt:3}}>

{reply}

</Typography>

</Paper>

)

}