import axios from 'axios';
import { URL } from '../../varGlobal';

const fetchDNI = async(dni, tipoLom) => {
  const dataBody = {
    "dni": dni,
    "tipoLom": tipoLom
  };

  console.log('que tiene datos que pasa a fetchDNI: ', dataBody);

  try{
      const {data} = await axios.post(`${URL}/api/buscarDNI`,dataBody);
      //console.log('que trae data de fetchDNI: ', data);
      return data;
  }catch(error){
    console.log('error en fetchDNI: ', error.message);
  }
  
}

export default fetchDNI