import axios from 'axios'

// export const getSubCategories = async () => {
//    await axios.get('http://localhost:5000/api/sub-categories')
// }

export const create = async (product,token) => {
    const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${token}`}}
    await axios.post('http://localhost:5000/api/products',product,config)
 }