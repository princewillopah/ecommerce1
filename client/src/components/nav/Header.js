import React,{useState} from 'react'
import { Menu } from 'antd';
import {AppstoreOutlined, SettingOutlined,UserOutlined,UserAddOutlined,LogoutOutlined,ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import SearchForm from '../forms/SearchForm';
const Header = () => {//{history} will nnot work here since header is not a Route BUT A component//we hav to user hook's useHistory
  let history = useHistory();
  const { SubMenu,Item } = Menu;
    const [current, setCurrent] = useState('Home')
    const dispatch = useDispatch()
    const userState = useSelector(state=>state.userState)
    const {userInfo} = userState
    const cart = useSelector(state=>state.cartState)
   const handleClick = e => {
       setCurrent(e.key)
      };
      const handleLogout = () => {
        localStorage.removeItem('userInfo')
        dispatch({type:"USER_LOGOUT"})
        history.push('/login')
       };
 


   return(<>
     <div className="container">
       <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      
        <Item key="Home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>
        <Item key="Shop" icon={<ShoppingOutlined />}>
          <Link to="/shop">Shop</Link>
        </Item>
        <Item key="Cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">Cart {cart.length > 0 && <span className="badge badge-danger">{cart.length}</span>}</Link>
        </Item>

        {userInfo && (
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title={userInfo.name.split(' ')[0]} className="float-right">
            <Menu.ItemGroup title="Item">
              {userInfo.role === 'subscriber' && (  <Item key="user"><Link to="/user/history">Dahboard</Link></Item>)}
              {userInfo.role === 'admin' && (  <Item key="admin"><Link to="/admin/dashboard">Dahboard</Link></Item>)}
              <Item icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Item>
            </Menu.ItemGroup>
            </SubMenu>
          )
        }

        {!userInfo && 
          (<>
            <Item key="Register" icon={<UserAddOutlined />} className="float-right">
               <Link to="/register">Register</Link>
            </Item>
            <Item key="Login" icon={<UserOutlined />} className="float-right">
               <Link to="/login">Login</Link>
            </Item>
          </>)
        }
        <span className="float-right p-1">
        <SearchForm/>
        </span>
 
      </Menu>
      </div>
   </>
);
}
export default Header