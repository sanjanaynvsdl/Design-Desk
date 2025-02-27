import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import CustomersPage from "./pages/CustomersPage";
import WorkersPage from "./pages/WorkersPage";
import OrdersPage from "./pages/OrdersPage";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./components/Layout/DashboardLayout";
import SingleOrderPage from "./pages/SingleOrderPage";
import SingleCustomerPage from "./pages/SingleCustomerPage";
import SingleWorkerPage from "./pages/SingleWorkerPage";
import MyProfilePage from "./pages/MyProfilePage";
import ViewWorkPage from "./pages/ViewWorkPage";
import ErrorPage from "./pages/ErrorPage";


function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />

          <Route path="/" element={<DashboardLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/workers" element={<WorkersPage />} />
            <Route path="/myprofile" element={<MyProfilePage />} />

            {/* {data of particular id} */}
            <Route path="/orders/:id" element={<SingleOrderPage />} />
            <Route path="/customers/:id" element={<SingleCustomerPage />} />
            <Route path="/workers/:id" element={<SingleWorkerPage />} />
            <Route path="/workers/share/:id" element={<ViewWorkPage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
