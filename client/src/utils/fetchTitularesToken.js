import axios from 'axios';
import { URL } from '../../varGlobal';

const fetchTitularesToken = async(token, page, id_cargo, legajo, limit, tipoLom) => {
  //console.log('como ingresa token: ',token);
  //console.log('como ingresa page: ',page);
  //console.log('como ingresa limit: ',limit);
  //console.log('como ingresa tipoLom: ',tipoLom);

  const dataBody = {
    "page":page,
    "cargo":'',
    "legajo":'',
    "limit":limit,
    "tipoLom":tipoLom,
  };

  console.log('que tiene datos que pasa a fetchTitularesToken: ', dataBody);

  try{
      const {data} = await axios.post(`${URL}/api/lomtoken/${token}`,dataBody);
      //console.log('que trae data de fechAllTitularesToken: ', data);
      return data;
  }catch(error){
    console.log('error en fechAllTitularesToken: ', error);
  }
  
}

export default fetchTitularesToken