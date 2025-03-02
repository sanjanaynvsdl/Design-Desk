interface ErrorMsgTypes{
    message:string,
}

const ErrorMsg = (props:ErrorMsgTypes)=>{
    return(
        <p className="w-60  break-words overflow-hidden text-sm text-red-500 my-2 bg-red-100 p-2 rounded-sm border-1 border-red-300">{props.message}</p>
    )
}

export default ErrorMsg