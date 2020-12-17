import React from 'react'
import {Link} from 'react-router-dom'

const UserNav = () => {
   return(<>
      <nav>
        <ul className="list-group">
           
            <Link className="list-group-item list-group-item-action" to="/admin/dashboard">Dashboard</Link>
            
           
            <Link className="list-group-item list-group-item-action" to="/user/password">Change Password</Link>
            
           
            <Link className="list-group-item list-group-item-action" to="/admin/products">All Products</Link>
            <Link className="list-group-item list-group-item-action" to="/admin/product">Product</Link>
            <Link className="list-group-item list-group-item-action" to="/admin/category">Category</Link>
            <Link className="list-group-item list-group-item-action" to="/admin/sub-category">Subcategory</Link>
            <Link className="list-group-item list-group-item-action" to="/admin/coupon">Create Coupon</Link>
            
        </ul>
    </nav>
   </>
);
}
export default UserNav