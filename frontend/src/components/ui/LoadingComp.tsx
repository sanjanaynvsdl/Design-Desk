import {Loader2} from 'lucide-react';

const LoadingComp = ()=>{
    return(
        <div className="flex justify-center">
        <div className="w-60 bg-white p-6 rounded-lg shadow-md border-1 border-[#e3e3e3]">
          <div className="flex justify-center gap-4">
            <Loader2 size={30} className="animate-spin" />
            <p className="text-xl">Laoding . . .</p>
          </div>
        </div>
      </div>
    )
}

export default LoadingComp;