import { BrowserRouter,Route, Routes } from "react-router-dom"
import Layout from "@/components/common/AuthLayout"
import Dashboard from "@/views/Dashboard"
import Customers from "@/pages/customers/customers"
import Create from "@/pages/customers/create"
import { Toaster } from "sonner"


function AppRoutes(){
    return(
        <BrowserRouter>
        <Toaster />
        <Routes>
            <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer" element={<Customers />} />
            <Route path="/create" element={<Create/>} />
            </Route>
            
        </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;