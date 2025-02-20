import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import useLoadData from "./hooks/useLoadData";

const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));
const Orders = lazy(() => import("./pages/Orders"));
const Tables = lazy(() => import("./pages/Tables"));
const Menu = lazy(() => import("./pages/Menu"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

import Header from "./components/shared/Header";
import FullScreenLoader from "./components/shared/FullScreenLoader";


function Layout() {
  
  const location = useLocation();
  const isLoading = useLoadData();
  const { isAuth } = useSelector(state => state.user);
  const hideHeaderRoute = ["/auth"];

  if(isLoading) return <FullScreenLoader/>
  return (
    <>
       {!hideHeaderRoute.includes(location.pathname) && <Header />}
       <Suspense fallback={<FullScreenLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path="/auth" element={isAuth ? <Navigate to="/" /> : <Auth />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoutes>
                <Orders />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/tables"
            element={
              <ProtectedRoutes>
                <Tables />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/menu"
            element={
              <ProtectedRoutes>
                <Menu />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
      
    </>
  );
}

function ProtectedRoutes({children})  {
  const { isAuth } = useSelector(state => state.user);
  return isAuth ? children : <Navigate to="/auth" />;
}

function App() {
  return (
    <Router>
       <Layout/>
    </Router>
  )
}

export default App;
