import axios from 'axios';
import { URL } from '../../varGlobal';

const fetchEscuelaID = async(id_escuela) => {
  const dataBody = {
    "escuela":id_escuela
  };

  console.log('que tiene datos que pasa a fetchEscuelaID: ', dataBody);

  try{
      const {data} = await axios.post(`${URL}/api/escuelaid`,dataBody);
      //console.log('que trae data de fetchEscuelaID: ', data);
      return data;
  }catch(error){
    console.log('error en fetchEscuelaID: ', error.message);
  }
  
}

export default fetchEscuelaID