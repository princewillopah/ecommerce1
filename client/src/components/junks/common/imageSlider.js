import React from 'react'

const imageSlider = ({images}) => {
   return(<>
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">

            {
                images.map((img,indx)=>(
                    <div key={indx} className={`carousel-item ${img[0] && 'active'}`}>
                       <img src={`http://localhost:5000/${img}`} className="d-block w-100" alt="..."/>
                    </div>
                ))
            }

          
            {/* <div className="carousel-item active">
               <img src={`http://localhost:5000/${images[0]}`} className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
               <img src={`http://localhost:5000/${images[1]}`} className="d-block w-100" alt="..."/>
            </div> */}

        </div>
        </div>
   </>
);
}
export default imageSlider