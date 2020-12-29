import React, {useState} from 'react'
import axios from 'axios'
import Resizer from 'react-image-file-resizer';
import {Avatar, Badge} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import {useSelector} from 'react-redux'
import '../../assets/css/App.css'
import {toast} from 'react-toastify';
// import Avatar from 'antd';
// import '../'

const FileUpload = ({images,setImage,photoPreview,setPhotoPreview}) => {
const [fileUloadCount, setFileUloadCount] = useState(0)
    const {userInfo} = useSelector(state=>state.userState)


  const maxSelectFile=(e)=>{
      let files = Array.from(e.target.files) // create file object
          if (files.length > 4) { 
             const msg = 'Only 4 images can be uploaded at a time'
             e.target.value = null // discard selected file
            //  console.log(msg)
             toast.error(msg)
            return false;
        }
      return true;
   
   }
   const checkMimeType=(event)=>{

    let files = event.target.files
    let err = [] // create empty array
    const types = ['image/png', 'image/jpeg', 'image/gif','image/jpg']
    for(var x = 0; x<files.length; x++) {
        if (types.every(type => files[x].type !== type)) {
        // err[x] = files[x].type+' is not a supported format\n';
        err[x] = 'Unsupported format: Only support png, git and jpg are supported\n';
       // assign message to array
      }
    };
    for(var z = 0; z<err.length; z++) { // loop create toast massage
        event.target.value = null 
        toast.error(err[z])
    }
   return true;
}

   const checkFileSize=(e)=>{
    let files = Array.from(e.target.files)
    let size = 2000000
    let err = []; 
    for(var x = 0; x<files.length; x++) {
    if (files[x].size > size) {
    //  err[x] = files[x].type+' is too large, please pick a smaller file\n';
    err[x] = 'This file is too large, please pick a smaller file of 1mb or below\n';
    }
  };
  for(var z = 0; z<err.length; z++) {
   toast.error(err[z])
   e.target.value = null
  }
  return true;
  }
// ---------------------------------------------
//          handle image
// -------------------------------------------------
const handleFileUpload = (e) => {
  const fileList = Array.from(e.target.files);//Array.from conver string to array

  if(checkMimeType(e) && checkFileSize(e) && maxSelectFile(e)  ){
    setImage(fileList);//load file to state
    // setImage({...images,fileList})
    // setImage((prev)=>fileList);
  }
  // setImage(fileList);//load file to state
  //code for image preview
  const mappedFiles = fileList.map((file) => ({//
      ...file,
      myPhotoPreview: URL.createObjectURL(file),
    }));
    setPhotoPreview(mappedFiles); 
}

   return(<>
   <div className="mb-2 ">
                  <div className="mb-2 ">
                          {images ?  <>{images.map((img,index) => (<Avatar key={index} src={img} size='100' className="m-2" shape="square"/>))} </>: ''}
                          {photoPreview  &&  <>{photoPreview .map((img,index) => (<Avatar  key={index} src={img.myPhotoPreview} size='100' className="m-2" shape="square"/>))} </>}
                          

                            </div>
                             {/* {images && <div className="mb-2 ">
                               {images.map((img,index) => (<Avatar  src={img} size='100' className="m-2" shape="square"/>))}
                               </div>
                              }
                                
                           {photoPreview && <div className="mb-2 ">
                               {photoPreview.map((img,index) => (<Badge count="X" style={{cursor:"pointer"}} key={index} >
                                <Avatar  src={img.myPhotoPreview} size='100' className="m-2" shape="square"/></Badge>
                                ))}
                            </div>
                            } */}
                            
                             <label htmlFor="" className="btn btn-outline-primary btn-file">
                               Browse
                               <input type="file" accept="image/*" multiple onChange={handleFileUpload}/>
                               {/* <input type="file" accept="image/*" multiple onChange={e => setImage(e.target.files)}/> */}
                            </label>
  </div>
</>);
}
export default FileUpload