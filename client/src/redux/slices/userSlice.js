import { createSlice } from '@reduxjs/toolkit'




const initialState = { // trang thai ban dau
  name: '',
  email:'',
  phone: '',
  address: '',
  avatar: '',
  id: null,
  access_token: '',
  isAdmin : false
}

export const userSlice = createSlice({ // quan ly
  name: 'user', // user nay se duoc goi nhu user?.id
  initialState,
  reducers: {
    updateUser: (state, action) =>{
      const {name, email, phone, address,avatar,_id, access_token, isAdmin} = action.payload;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.id = _id;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) =>{
      state.name ='';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.id = '';
      state.access_token = '';
      state.isAdmin = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer