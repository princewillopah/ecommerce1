import React, {useState} from 'react'
import axios from 'axios'
import Resizer from 'react-image-file-resizer';
import {Avatar, Badge} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import {useSelector} from 'react-redux'
import '../../App.css'
// import Avatar from 'antd';
// import '../'

const FileUpload = ({values, setValues,setLoading,loading}) => {
const [fileUloadCount, setFileUloadCount] = useState(0)
    const {userInfo} = useSelector(state=>state.userState)

const handleFileUploadAndResize = (e) =>{
  //1 resize imge
  let files = e.target.files //for single file = e.target.file[0]
  let allUloadedFiles = values.images//the files we already have in the state//initially 0
  if(files){
    setLoading(true)//set loading true when file is uploading
    for(let i = 0; i < files.length; i++){
        Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0,
            (uri) => { 
              // console.log(uri)
             //after resize, we send the uploaded image to server//uri is the binary img//image is the value from server
             const config = { headers:{Authorization: `Bearer ${userInfo.token}`}} 
             axios.post(`${process.env.REACT_APP_URL}/uploadimage`,{image: uri},config)
            //  axios.post(`${process.env.REACT_APP_URL}/uploadimage`,{image: uri},config)
             .then(res =>{//at this point the server has return the uploaded image url
               setLoading(false)//set the loading to stop after this upload
               allUloadedFiles.push(res.data)//push this uploaded file to the variable containing all uploaded files
                setValues({...values, images: allUloadedFiles})//updade the images array in state with the files url stored in allUloadedFiles array
              console.log(res.data)
              })
             .catch(err => {
              setLoading(false)// since image is not uploading//note//loading set false means no spinning/loading
               console.log('err from cloudinary',err)
             })
            },
            'base64'
            );
    }
    setFileUloadCount(files.length) //my custom//to count the file uploaded and placed beside button
  }
  //2 send img to server to upload to cloudinary

  //3 set url recieved from server to images[] in the parent component(Create)
}

const handleRemoveImage = (id) => {
  setLoading(true)
  const config = { headers:{Authorization: `Bearer ${userInfo.token}`}} 
  axios.post(`${process.env.REACT_APP_URL}/removeimage`,{public_id: id},config)
.then(res => {
  setLoading(false)
  let filteredimage = values.images.filter((item) => {return item.public_id !== id})
  setValues({...values, images: filteredimage})
})
.catch(err =>{
  setLoading(false)
  console.log(err)
})
}

   return(<>
   <div className="mb-2 ">
          {loading && (<LoadingOutlined className="text-danger"/>)}
          {values.images && <div className="mb-2 ">{values.images.map(img => (<Badge count="X" style={{cursor:"pointer"}} key={img.public_id} onClick={() =>handleRemoveImage(img.public_id)}>
            <Avatar  src={img.url} size='100' className="m-2" shape="square"/></Badge>
              ))}</div>}
           <label htmlFor="" className="btn btn-outline-primary btn-file">
           Browse
          <input type="file" multiple  accept="image/*" onChange={handleFileUploadAndResize}/>
          </label>
          {fileUloadCount > 0 && <>{fileUloadCount} 'file(s) to be uploaded'</>}
   </div> 
</>);
}
export default FileUpload