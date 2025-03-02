import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SignUpPage from "./pages/auth/SignUpPage";
import SignInPage from "./pages/auth/SignInPage";
import CustomersPage from "./pages/customers/CustomersPage";
import WorkersPage from "./pages/workers/WorkersPage";
import OrdersPage from "./pages/orders/OrdersPage";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./components/Layout/DashboardLayout";
import SingleOrderPage from "./pages/orders/SingleOrderPage";
import SingleCustomerPage from "./pages/customers/SingleCustomerPage";
import SingleWorkerPage from "./pages/workers/SingleWorkerPage";
import MyProfilePage from "./pages/MyProfilePage";
import ViewWorkPage from "./pages/workers/ViewWorkPage";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/Protected-route";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* Protected routes */}
          {/* <Route element={<ProtectedRoute />}> */}
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
            </Route>
          {/* </Route> */}

          {/* //workersdata- sharable link,  */}
          <Route path="/workers/share/:hash" element={<ViewWorkPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
