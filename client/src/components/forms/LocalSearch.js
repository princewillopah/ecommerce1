import React from 'react'

const LocalSearch = ({mysearchKeyword,mysetSearchKeyword}) => {

    const handleSearchChange = e =>{
        e.preventDefault()
        mysetSearchKeyword(e.target.value.toLowerCase())
    }
   return(<>
        <input type="text"  className="col-md-6 offset-6 form-control " placeholder="Enter Search Term" value={mysearchKeyword} onChange={handleSearchChange} />
                              
   </>
);
}
export default LocalSearch