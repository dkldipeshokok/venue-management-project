import { BrowserRouter,Route, Routes } from "react-router-dom"
import Layout from "@/components/common/AuthLayout"
import Dashboard from "@/views/Dashboard"
import Customers from "@/pages/customers/customers"
import Create from "@/pages/customers/create"
import Read from "@/pages/customers/read"
import Update from "@/pages/customers/update"

import Venue from "@/pages/venue/venue"
import CreateVenue from "@/pages/venue/create"
import UpdateVenue from "@/pages/venue/edit"

import Booking from "@/pages/booking/booking"
import CreateBooking from "@/pages/booking/create"
import UpdateBooking from "@/pages/booking/update"
import ReadBooking from "@/pages/booking/read"

import Category from "@/pages/menu/categories/categories"
import CreateCategory from "@/pages/menu/categories/create"
import UpdateCategory from "@/pages/menu/categories/update"

import SubCategory from "@/pages/menu/subcategories/subcategories"
import CreateSubCategory from "@/pages/menu/subcategories/create"
import UpdateSubCategory from "@/pages/menu/subcategories/update"

import Item from "@/pages/menu/items/items"
import CreateItem from "@/pages/menu/items/create"
import UpdateItem from "@/pages/menu/items/update"

import Package from "@/pages/menu/packages/packages"
import CreatePackage from "@/pages/menu/packages/create"
import UpdatePackage from "@/pages/menu/packages/update"


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
            <Route path="/venue/edit/:id" element={<UpdateVenue/>} />

            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/create" element={<CreateBooking />} />
            <Route path="/booking/update/:id" element={<UpdateBooking />} />
            <Route path="/booking/read/:id" element={<ReadBooking />} />

            <Route path="/menu/categories" element={<Category />} />
            <Route path="/menu/categories/create" element={<CreateCategory />} />
            <Route path="/menu/categories/update/:id" element={<UpdateCategory />} />

            <Route path="/menu/subcategories" element={<SubCategory />} />
            <Route path="/menu/subcategories/create" element={<CreateSubCategory />} />
            <Route path="/menu/subcategories/update/:id" element={<UpdateSubCategory />} />

            <Route path="/menu/items" element={<Item />} />
            <Route path="/menu/items/create" element={<CreateItem />} />
            <Route path="/menu/items/update/:id" element={<UpdateItem />} />

            <Route path="/menu/packages" element={<Package />} />
            <Route path="/menu/packages/create" element={<CreatePackage />} />
            <Route path="/menu/packages/update/:id" element={<UpdatePackage />} />

            </Route>
            
        </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;