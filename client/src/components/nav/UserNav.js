import React from 'react'
import {Link} from 'react-router-dom'

const UserNav = () => {
   return(<>
      <nav>
        <ul className="list-group">
           
            <Link className="list-group-item list-group-item-action" to="/user/history">History</Link>
            
           
            <Link className="list-group-item list-group-item-action" to="/user/password">Change Password</Link>
            
           
            <Link className="list-group-item list-group-item-action" to="/user/wishlist">My WishList</Link>
            
        </ul>
    </nav>
   </>
);
}
export default UserNav