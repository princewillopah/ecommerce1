import React,{useState} from 'react'
import '../styles/myform.css'
import FileUpload from '../common/FileUpload';
import {connect} from 'react-redux'
import Axios from 'axios'
import {  toast } from 'react-toastify';

const Continents = [
    {key:1,value: "Africa"},
    {key:2,value: "Europe"},
    {key:3,value: "Asia"},
    {key:4,value: "North America"},
    {key:5,value: "South America"},
    {key:6,value: "Australia"},
    {key:7,value: "Antarctica"},
    


]

const UploadProductPage = ({auth: {user,loading}, history}) => {
    const [TitleValue, setTitleValue] = useState('')
    const [DescriptionValue, setDescriptionValue] = useState('')
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1)
    const [Images, setImages] = useState([])//for multiple images

 const updateImage = (newImageArray) =>{//updateFunction is the function props from child 
     setImages(newImageArray)//[...Images, res.data.image] is arrays of images passed from child component(FileUpload) to parent(UploadProductPage) to save in Images
    //  console.log(newImageArray);
    }
    
const handleOnsubmit = (e) => {
    e.preventDefault();
    if(TitleValue === "" || DescriptionValue ===" " || PriceValue ==="" || ContinentValue ==="" || Images === []){
       return  toast.error("Please fill all fields",{ position: "top-right",autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,})
    //   return alert('fill all fields')   
    }else{

        const formData = {
            writer: user._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue*1,//convert to numer
            continents: ContinentValue,//convert to number 
            images: Images
        }
        console.log(typeof('continent',formData.continents))
         Axios.post('http://localhost:5000/api/products/uploadProduct',formData)
         .then(response =>{
             if(response.data.success){// if success is true
                 toast.success("Product Created Successfully",{ position: "top-right",autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,})
                history.push('/landing-page')//redirect to home page if successful
             }else{// if success is false
     
                 toast.error("Error Creating Product",{ position: "top-right",autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,})
             }
         })

    }

}

   return(<>
     

   <div className="row">
        <div className="col-md-6 offset-md-3 myform" >
          
            <p className="lead"><i className="fa fa-user"></i> Create Your Account</p>
            
                <form onSubmit={handleOnsubmit}>
               <FileUpload refreshFunction={updateImage}/>

                       <div className="form-group" >
                            <label htmlFor="title" >Title</label>
                            <input type="text" name="title" id="title"  className="form-control" placeholder="Enter Title"  value={TitleValue} onChange={e =>setTitleValue(e.currentTarget.value)} /> 
                        </div>
                        <div className="form-group" >
                            <label htmlFor="DescriptionValue" >Description</label>
                            <textarea name="DescriptionValue" id="DescriptionValue"  className="form-control"  placeholder="Enter Description" row="5"  value={DescriptionValue} onChange={e =>setDescriptionValue(e.currentTarget.value)}></textarea>
                        </div>
                        <div className="form-group" >
                            <label htmlFor="PriceValue" >Price</label>
                            <input type="number" name="PriceValue" id="PriceValue" cols="30"  className="form-control" placeholder="Enter Price"  value={PriceValue} onChange={e =>setPriceValue(e.currentTarget.value)} /> 
                        </div>
                        <div className="form-group" >
                            <label htmlFor="ContinentValue" >Containent</label>
                            <select name="ContinentValue" className="form-control"  id="ContinentValue" value={ContinentValue} onChange={e =>setContinentValue(e.currentTarget.value)}>
                                {Continents.map(continent =>(
                                   <option key={continent.key} value={continent.key}>{continent.value}</option> 
                                ))}
                            </select>
                        </div>
                    
                        <div className="form-group" >
                        <button type="submit" className="btn btn-primary btn-sm text-center mr-1" >Submit</button> 
                      </div>
                </form>
                                                 
                                 
   </div>
   </div>
   </>
);
}

const mapStateToProps = (state) => ({
auth: state.auth
})
export default connect(mapStateToProps)(UploadProductPage)