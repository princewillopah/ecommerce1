import React from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {SearchOutlined} from '@ant-design/icons'

const SearchForm = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const {text} = useSelector(state=>state.searchState)

    const handleChange = e => {
      dispatch({
          type: "SEARCH_QUERY",
          payload: {text: e.target.value}
      })
    }

    const handleSubmit = e => {
     e.preventDefault();
     history.push(`/shop?${text}`)//text is from the redux state about
    }

   return(<>
      <form className="form-inline my-2" onSubmit={handleSubmit}>
      <div className="input-group">
      <input type="search" onChange={handleChange} value={text} className="form-control" placeholder="Search Product"/>
        <div className="input-group-append">
            <SearchOutlined style={{cursor:"pointer"}} className="input-group-text bg-success text-light" onClick={handleSubmit}/>
        </div>
        </div>
       
        
      </form>
  
   </>
);
}
export default SearchForm