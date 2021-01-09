import React from 'react'
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
import TextEffect from '../components/others/TextEffect'
import CategoryListComponent from '../components/category/CategoryListComponent'
import SubCategoryListComponent from '../components/category/SubCategoryListComponent'


const Home = () => {


  
   return(<>
    {/* {JSON.stringify(products)} */}
    <div className="jumbotron">
       <h2 className="text-center text-danger"><TextEffect textArr={["we sell wears","... shoes","...stuff"]}/></h2>
    </div>

      <NewArrivals/>
       
      <BestSellers/>
      <section>
         <div className="container-fluid" style={{background:"#eee"}}>
            <div className="row py-3">
               <div className="col-md-12">
                  <h3 className="text-center">Categories</h3>
               </div>
            </div>
         </div>
         <div className="container">
            <div className="row">
               <CategoryListComponent/>
            </div>
         </div>
      </section>

      <section>
         <div className="container-fluid" style={{background:"#eee"}}>
            <div className="row py-3">
               <div className="col-md-12">
                  <h3 className="text-center">Sub Categories</h3>
               </div>
            </div>
         </div>
         <div className="container">
            <div className="row">
               <SubCategoryListComponent/>
            </div>
         </div>
      </section>


  

   </>
);
}
export default Home