
import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    title: "",
    message: "",
 
  },
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.title = action.payload.title || "Modal Title";
      state.message = action.payload.message || "";
      
    },
    closeModal(state) {
      state.isOpen = false;
      state.title = "";
      state.message = "";
     
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
