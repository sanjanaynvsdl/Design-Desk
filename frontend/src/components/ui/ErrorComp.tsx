interface ErrMsgTypes{
    message:string,
}

const ErrorComp = (props:ErrMsgTypes)=>{
    return(
        <div className="flex justify-center">
        <div className="w-60 p-6 bg-red-100 border-1 border-red-400 rounded-lg shadow-lg text-center">
          <p>{props.message}</p>
        </div>
      </div>

    )
}

export default ErrorComp;