import React from 'react'
import AdminNav from '../../components/nav/AdminNav'

const Dashboard = () => {
   return(<>
          <div className="container ">
                <div className="row mt-5">
                <div className="col-md-3">
                    <AdminNav/>
                </div>
                <div className="col-md-9">
                    <h1>user Dashboard page</h1>
                </div>
                </div>
            </div>
   </>
);
}
export default Dashboard