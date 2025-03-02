interface SuccessMsgTypes{
    message:string,
}

const SuccessMsg = (props:SuccessMsgTypes)=>{
    return(
        <p className="w-60 break-words overflow-hidden text-sm text-green-500 my-2 bg-green-100 p-2 rounded-sm border-1 border-green-300">{props.message}</p>
    )
}

export default SuccessMsg;