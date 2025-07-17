import axios from 'axios';
import { URL } from '../../varGlobal';

const fetchTitularesToken = async(token, page, id_cargo, legajo, limit) => {
  console.log('como ingresa token: ',token);
  console.log('como ingresa page: ',page);
  console.log('como ingresa limit: ',limit);

  const dataBody = {
    "page":page,
    "cargo":'',
    "legajo":'',
    "limit":limit,
  };

  //console.log('que tiene datos que pasa a fechTitulares: ', dataBody);

  try{
      const {data} = await axios.post(`${URL}/api/lomtoken/${token}`,dataBody);
      console.log('que trae data de fechAllTitularesToken: ', data);
      return data;
  }catch(error){
    console.log('error en fechAllTitularesToken: ', error);
  }
  
}

export default fetchTitularesToken