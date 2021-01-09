import React from 'react'
import {Drawer,Button} from 'antd'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import defaultImg from '../../assets/img/default.jpg'

const SideDrawer = () => {

    let dispatch = useDispatch();
    const {cartState,drawerState} = useSelector(state=>({...state}))//spread redux state
    // const {userInfo} = useSelector(state=>state.userState) // /// ///  ///  //

   return(<>
      <Drawer className="text-center" placement="right" title={`Cart | ${cartState.length} product(s)`} onClose={()=>{dispatch({type:"SET_VISIBILITY", payload: false})}} visible={drawerState}>
         {cartState.map(cart =>(<div key={cart._id} className="row mb-2">
           <div className="col">
               <img src={cart.images.length > 0? cart.images[0] : defaultImg } alt="" className="img-fluid"/>
               <h5>{cart.title}</h5>
           </div>
         </div>))}
         <Link to="/cart"><button onClick={()=>{dispatch({type:"SET_VISIBILITY", payload: false})}} className="text-center btn btn-primary mt-5 w-100 d-block m-auto">Go To Cart</button></Link>
          </Drawer>
   </>
);
}
export default SideDrawer