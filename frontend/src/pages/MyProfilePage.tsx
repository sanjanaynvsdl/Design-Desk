import { useRecoilValueLoadable } from "recoil";
import { userAtom } from "../store/user-store";
import LoadingComp from "../components/ui/LoadingComp";
import ErrorComp from "../components/ui/ErrorComp";

const MyProfilePage = ()=>{

    const adminData = useRecoilValueLoadable(userAtom);

    if(adminData.state=="loading") {
        return <LoadingComp/>
    }

    if(adminData.state=="hasError") {
        return <ErrorComp
            message={adminData.contents?.message}
         />
    }
    return(


        <div className="flex justify-center">
            <div className="bg-white rounded-lg p-6 m-4 shadow-ld border-1 border-[#e3e3e3]">
                <div className="flex flex-col gap-2">
                    <p>Hello {adminData.contents.name}</p>
                </div>
            </div>


        </div>
    )
}

export default MyProfilePage;