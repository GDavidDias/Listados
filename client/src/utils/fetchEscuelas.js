import axios from 'axios';
import { URL } from '../../varGlobal';

const fetchEscuelas = async(id_escuela) => {
  const dataBody = {
    "id_escuela":''
  };

  //console.log('que tiene datos que pasa a fechtEscuelas: ', dataBody);

  try{
      const {data} = await axios.post(`${URL}/api/allescuelas`,dataBody);
      //console.log('que trae data de fechAllEscuelas: ', data);
      return data;
  }catch(error){
    console.log('error en fechAllEscuelas: ', error.message);
  }
  
}

export default fetchEscuelas