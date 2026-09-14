import { BrowserRouter,Route, Routes } from "react-router-dom"
import Layout from "@/components/common/AuthLayout"
import Dashboard from "@/views/Dashboard"
import Customers from "@/pages/customers/customers"
import Create from "@/pages/customers/create"
import Read from "@/pages/customers/read"
import Update from "@/pages/customers/update"

import Venue from "@/pages/venue/venue"
import CreateVenue from "@/pages/venue/create"
import UpdateVenue from "@/pages/venue/update"
import ViewVenue from "@/pages/venue/read"

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
            <Route path="/customer/create" element={<Create/>} />
            <Route path="/customer/read/:id" element={<Read/>} />
            <Route path="/customer/update/:id" element={<Update/>} />

            <Route path="/venue" element={<Venue />} />
            <Route path="/venue/create" element={<CreateVenue/>} />
            <Route path="/venue/update/:id" element={<UpdateVenue/>} />
            <Route path="/venue/read/:id" element={<ViewVenue/>} />
            </Route>
            
        </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;