const pool = require('../../database/connection.js');

module.exports = async(req, res)=>{
    console.log('ingresa a getConfiguracionNivel ');

    //TRAE CONFIGURACION DE NIVEL
    let armaquery = `SELECT id_configuracion, nivel, descripcion FROM configuracion where id_configuracion = 1 `;

    try{
        const [result] = await pool.query(`${armaquery} `);
        console.log('que trae configuracion nivel: ', result);

        res.status(200).json(result);
    }catch(error){
        res.status(400).send(error.message);
    }
};
