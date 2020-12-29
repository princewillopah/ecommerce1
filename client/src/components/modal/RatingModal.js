import React,{useState} from 'react'
import {Modal, Button} from 'antd'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {StarOutlined} from '@ant-design/icons'
import {useHistory, useParams} from 'react-router-dom'//

const RatingModal = ({children}) => {

   const [modalVisible, setModalVisible] =useState(false)
   const {userInfo} = useSelector(state=>state.userState)
      let history = useHistory()//using useHistory hook instead of history in router because this modal is not controlled by react router
      let {slug} = useParams()//getting the slug from the url via params hook
      const handleLogin = () => {
         if(userInfo && userInfo.token){
            setModalVisible(true)
     }else{
      //   history.push('/login')
      //to redirect to the intended page after login
      history.push({
          pathname:'/login',//where this is going right now//redirect to login 
          state: {from: `/products/${slug}`}// wher we want the app to redirect user back after login// which is the page he was asked to login
      })
     }
   }

   return(<>
      <div onClick={handleLogin}>
         <StarOutlined className="text-danger"/>{' '}{userInfo ? "Live a Review" : "Login to rate this product"}
      </div>
      <Modal 
      title="Live Your Riview"
      cenetered
      visible={modalVisible}
      onOk={()=>{setModalVisible(false)
          toast.success("Thanks for for review")}
         }
      onCancel={()=>{setModalVisible(false)}}
      >
         {children}</Modal>
   </>
);
}
export default RatingModal