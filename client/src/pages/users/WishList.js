import React from 'react'
import NavLink from '../../components/nav/UserNav'

const WishList = () => {
   return(<>
          <div className="container ">
                <div className="row mt-5">
                <div className="col-md-3">
                    <NavLink/>
                </div>
                <div className="col-md-9">
                    <h1>user WishList page</h1>
                </div>
                </div>
            </div>
   </>
);
}
export default WishList