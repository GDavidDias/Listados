const pool = require('../../database/connection.js');

module.exports = async(req, res)=>{
    console.log('ingresa a getTitular ');
    const{dni, page, limit} = req.body;
    console.log('Que tiene dni: ', dni);
    console.log('Que tiene page: ', page);
    console.log('Que tiene limit: ', limit);

    const offset = (page-1)*limit;

    //TRAE TODOS LOS INSCRIPTOS
    let armaquery = `SELECT t.legajo, t.dni, t.nombre, t.fecha_ingreso, t.id_cargo, t.orden, esp.abreviatura, t.id_escuela, e.numero AS Nro_Escuela, c.año, c.puntaje_anterior, c.item_a, c.item_b, c.item_c, c.item_d, c.item_e, c.item_f, (c.puntaje_anterior + c.item_a + c.item_b + c.item_c + c.item_d + c.item_e + c.item_f) as total
        FROM titulares AS t 
        LEFT JOIN escuelas AS e ON t.id_escuela = e.id_escuela 
        LEFT JOIN calificacion AS c ON t.legajo = c.legajo
        LEFT JOIN especialidad AS esp ON t.id_cargo = esp.id_especialidad
        WHERE c.activo = 1
        `;

        if(dni && dni!=''){
            armaquery += ` AND t.dni = ${dni} `
        }

        armaquery += `ORDER BY t.orden ASC  `;

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