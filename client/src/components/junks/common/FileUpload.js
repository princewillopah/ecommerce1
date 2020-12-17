import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import '../styles/common.css'
import Axios from 'axios'


const FileUpload = (props) => { //this props is to pass props back to perent component to save the image where the image  and other related info can be submited to server together 
  const [Images, setImages] = useState([]) //TO CAPTURE MULTIPLE IMAGES


//this function will keep storing the image one by one in server and keep updating state with [...Images, res.data.image] and sed the arrray of images via refreshFunction(() to parent
    const handleOnDrop = (files) => {
        const config = {
            headers:{'Content-Type': 'multipart/form-data'}
        }
        let formData = new FormData();
        formData.append("fileFormFrontend",files[0])
         Axios.post('http://localhost:5000/api/products/uploadImage',formData,config)//REQUEST TO SAVE THE IMAGES
        .then(res => {
            if(res.data.success){//if success is true//success is one of the properties sent from server after request made to endpoint
                setImages([...Images, res.data.image])//update Image in state//res.data.image is from server//for single file upload we use  setImages(res.data.image) without []/ ...Image means save spread what we already have in Image and the add res.data.image to the array
                 props.refreshFunction([...Images, res.data.image])//sending the images to parent component// child to parent props sending//[...Image, res.data.image] is an array that carries all 
                 console.log(res)
              
         }else{
             alert('Failed to save image')
             console.log(res.data.success)// here success is false
         }
        })
//       or
        //  try {
        //      const res = Axios.post('http://localhost:5000/api/products/uploadImage',formData,config)//REQUEST TO SAVE THE IMAGES
        //     console.log(res)
        //     if(res.data.success){//if success is true//success is one of the properties sent from server after request made to endpoint
        //            setImages([...Images, res.data.image])//update Image in state//res.data.image is from server//for single file upload we use  setImages(res.data.image) without []/ ...Image means save spread what we already have in Image and the add res.data.image to the array
        //             props.refreshFunction([...Images, res.data.image])//sending the images to parent component// child to parent props sending//[...Image, res.data.image] is an array that carries all 
                 
                 
        //     }else{
        //         alert('Failed to save image')
        //         console.log(res.data.success)// here success is false
        //     }
        //  } catch (err) {
        //      console.log(err)
        //  }
    }// end handleOnDrop

    const handleOnDelete = (imageSelected) => {
        const indexOfImageSelected = Images.indexOf(imageSelected)//get the index of imageSelected in array Image(in state)
        let newImageArray = [...Images]//create a new array from Images
        newImageArray.splice(indexOfImageSelected,1)//remove the image whose index is passed
        setImages(newImageArray)//update Images with this info// so Image will now be this new array
        props.refreshFunction(newImageArray)//send to parent comonent the updated version to update his side
    }


   return(
   <div className="d-flex">
    <div className="dropzone">
        <Dropzone onDrop={handleOnDrop} multiple={false} maxSize={8000000}>
            {({getRootProps,getInputProps})=>(
               <div className="dropzone-inner" {...getRootProps()}>
                   <input {...getInputProps()} alt=" " />
                   <i className="fa fa-plus"></i>  Upload
               </div>
            )}
           
        </Dropzone>
    </div>
    <div className="dropzone" >
          <div className="dropzone-delete-inner">
              {
              Images.map((image,index) =>(
                 <div key={index} onClick={e =>handleOnDelete(image)}>
                      <img src={`http://localhost:5000/${image}`} className="img-fluid" alt={`productImage-${image}`}/>
                 </div>
              ))}
              
          </div>
    </div>
   </div>
);
}
export default FileUpload