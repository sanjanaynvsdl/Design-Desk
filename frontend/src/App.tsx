import { RecoilRoot } from "recoil";
import SignUpPage from "./pages/SignUpPage"

function App(){
  return(
    <RecoilRoot>
    <div>
      <SignUpPage/>
    </div>
    </RecoilRoot>
  )
}

export default App;