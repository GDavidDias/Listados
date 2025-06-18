const pool = require('../../database/connection.js');

module.exports = async(req, res)=>{
    console.log('ingresa a getAllEspecialidades ');
    const{especialidad} = req.body;
    console.log('Que tiene especialidad: ', especialidad);

    //TRAE TODOS LOS INSCRIPTOS
    let armaquery = `SELECT esp.id_especialidad, esp.descripcion, esp.abreviatura
        FROM especialidad AS esp `;

        if(especialidad && especialidad!=''){
            armaquery += ` WHERE esp.id_especialidad = ${especialidad} `
        }

        armaquery += ` ORDER BY esp.id_especialidad DESC `;

    try{
        const [result] = await pool.query(`${armaquery} `);
        // console.log('que trae inscriptos: ', result);

        res.status(200).json(result);
    }catch(error){
        res.status(400).send(error.message);
    }
};