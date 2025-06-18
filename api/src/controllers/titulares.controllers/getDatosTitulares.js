const pool = require('../../database/connection.js');

module.exports = async(req, res)=>{
    console.log('ingresa a getTitular ');
    const{dni, page, limit} = req.body;
    console.log('Que tiene dni: ', dni);
    console.log('Que tiene page: ', page);
    console.log('Que tiene limit: ', limit);

    const offset = (page-1)*limit;

    //TRAE TODOS LOS INSCRIPTOS
    let armaquery = `SELECT t.dni, t.legajo, t.nombre
        FROM titulares AS t
        
        `;

        if(dni && dni!=''){
            armaquery += ` WHERE t.dni LIKE '${dni}%' `
        }

        armaquery += `ORDER BY t.dni ASC  `;

    try{
        console.log('como queda armaquery: ', armaquery);
        const [result] = await pool.query(`${armaquery} LIMIT ${limit} OFFSET ${offset}`);
        //console.log('que trae result getAllTitulares: ', result);

        const[totalRows] = await pool.query(`SELECT COUNT(*) AS count FROM (${armaquery}) AS titulares`);

        const totalPages= Math.ceil(totalRows[0]?.count/limit);
        const totalItems=totalRows[0]?.count;

        res.status(200).json({
            result:result,
            paginacion:{
                page:page,
                limit:limit,
                totalPages:totalPages,
                totalItems:totalItems
            }
        });

    }catch(error){
        res.status(400).send(error.message);
    }
};