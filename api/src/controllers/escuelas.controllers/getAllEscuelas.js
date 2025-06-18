const pool = require('../../database/connection.js');

module.exports = async(req, res)=>{
    console.log('ingresa a getAllEscuelas ');
    const{escuela} = req.body;
    console.log('Que tiene escuela: ', escuela);

    //TRAE TODOS LOS INSCRIPTOS
    let armaquery = `SELECT e.id_escuela, e.numero, e.nombre_escuela, e.localidad, e.departamento, e.region, e.categoria, e.modalidad, e.zona, e.tipo_escuela
        FROM escuelas AS e `;

        if(escuela && escuela!=''){
            armaquery += ` WHERE e.id_escuela = ${escuela} `
        }

        armaquery += ` ORDER BY e.numero ASC `;

    try{
        const [result] = await pool.query(`${armaquery} `);
        console.log('que trae escuelas: ', result);

        res.status(200).json(result);
    }catch(error){
        res.status(400).send(error.message);
    }
};