import axios from 'axios'

export const getSubCategories = async () => {
   await axios.get('http://localhost:5000/api/sub-categories')
}

export const createCategories = async (name,token) => {
    const config = { headers:{'Content-Type':'application/json', Authorization: `Bearer ${token}`}}
    await axios.post('http://localhost:5000/api/categories',{name},config)
 }