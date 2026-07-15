import {useState} from "react";

import api from "../api/api";
import { toast } from "react-toastify";
export default function ChatBox(){

const[msg,setMsg]=useState("");

const[reply,setReply]=useState("");
const [loading, setLoading] = useState(false);
const send = async () => {

    try{

        setLoading(true);

        const res = await api.post("/agent/chat",{
            message:msg
        });

        setReply(res.data.response);

        toast.success("AI Response Generated");

    }

    catch{

        toast.error("Something went wrong");

    }

    finally{

        setLoading(false);

    }

}

return(

<div>

<h2>AI Assistant</h2>

<textarea

onChange={(e)=>setMsg(e.target.value)}

/>

<Button
variant="contained"
onClick={send}
disabled={loading}
>

{loading ? "Thinking..." : "Send"}

</Button>
<p>{reply}</p>

</div>

)

}