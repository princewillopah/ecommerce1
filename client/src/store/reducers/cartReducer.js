let initialState = []

if(localStorage.getItem('cart')){//if cart exist in localstorage
    initialState = JSON.parse(localStorage.getItem('cart')); // convert the cart(in localstorage) to normal arry/object //assign the cart in localstorage to initialState
}else{
    initialState = []
}

export const cartReducer = (state = initialState, action) => {

    switch(action.type){
        case "ADD_TO_CART":
             return action.payload;
        default:
            return state
    }

}