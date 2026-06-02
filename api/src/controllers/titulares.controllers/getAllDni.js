const pool = require('../../database/connection.js');

module.exports = async(req, res)=>{
    console.log('ingresa a getAllDni ');
    const{dni, tipoLom} = req.body;
    console.log('Que tiene dni: ', dni);
    console.log('Que tiene tipoLom: ', tipoLom);


    //TRAE TODOS LOS TITULARES SEGUN DNI
    let armaquery = `SELECT t.legajo, t.dni, t.nombre, t.id_cargo, t.tipo_lom, esp.abreviatura, t.id_escuela, e.numero AS Nro_Escuela
        FROM titulares AS t 
        LEFT JOIN escuelas AS e ON t.id_escuela = e.id_escuela 
        LEFT JOIN especialidad AS esp ON t.id_cargo = esp.id_especialidad
        WHERE 1 = 1
        `;

        if(dni && dni!=''){
            armaquery += ` AND t.dni like '%${dni}%' `
        }
        if(tipoLom && tipoLom!=''){
            armaquery += ` AND t.tipo_lom = '${tipoLom}' `
        }

        armaquery += `ORDER BY t.dni ASC  LIMIT 10`;

    try{
        console.log('como queda armaquery: ', armaquery);
        const [result] = await pool.query(`${armaquery} `);
        //console.log('que trae result getAllTitulares: ', result);

        res.status(200).json(result);
    }catch(error){
        res.status(400).send(error.message);
    }
};