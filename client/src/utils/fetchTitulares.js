import axios from 'axios';
import { URL } from '../../varGlobal';

const fetchTitulares = async(id_escuela, page, id_cargo, legajo, limit) => {
  //console.log('como ingresa id_escuela: ',id_escuela);
  //console.log('como ingresa page: ',page);
  //console.log('como ingresa limit: ',limit);

  const dataBody = {
    "escuela":id_escuela,
    "page":page,
    "cargo":'',
    "legajo":'',
    "limit":limit,
  };

  //console.log('que tiene datos que pasa a fechTitulares: ', dataBody);

  try{
      const {data} = await axios.post(`${URL}/api/alltitulares`,dataBody);
      //console.log('que trae data de fechAllTitulares: ', data);
      return data;
  }catch(error){
    console.log('error en fechAllTitulares: ', error);
  }
  
}

export default fetchTitulares