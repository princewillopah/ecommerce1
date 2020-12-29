import React from 'react'
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
import TextEffect from '../components/others/TextEffect'



const Home = () => {


  
   return(<>
    {/* {JSON.stringify(products)} */}
    <div className="jumbotron">
       <h2 className="text-center text-danger"><TextEffect textArr={["we sell wears","... shoes","...stuff"]}/></h2>
    </div>

      <NewArrivals/>
       
      <BestSellers/>
  

   </>
);
}
export default Home