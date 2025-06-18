import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listado:[],
    listadoCompleto:[],
    idEscuela:[]
};

export const configSlice = createSlice({
    name:'config',
    initialState,
    reducers:{
        setListado:(state, action)=>{
            state.listado = action.payload;
        },
        setListadoCompleto:(state, action)=>{
            state.listadoCompleto = action.payload;
        },
        setIdEscuela:(state, action)=>{
            state.idEscuela = action.payload;
        }
    }
});

export const {setListado, setIdEscuela, setListadoCompleto} = configSlice.actions;
export default configSlice.reducer;
