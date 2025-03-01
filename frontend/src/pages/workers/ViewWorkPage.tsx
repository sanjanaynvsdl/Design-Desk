import { useParams } from "react-router-dom";

const ViewWorkPage=()=>{

    const {id}=useParams();

    
    return(
        <div>
            <p>Workers- work!!</p>
        </div>
    )
}

export default ViewWorkPage;