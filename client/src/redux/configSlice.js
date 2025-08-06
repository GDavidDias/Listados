import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listado:[],
    listadoCompleto:[],
    idEscuela:[],
    token:'',
    tipoLom:'d',
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
        },
        setToken:(state, action)=>{
            state.token = action.payload;
        },
        setTipoLom:(state, action)=>{
            state.tipoLom = action.payload;
        }
    }
});

export const {setListado, setIdEscuela, setListadoCompleto, setToken, setTipoLom} = configSlice.actions;
export default configSlice.reducer;
