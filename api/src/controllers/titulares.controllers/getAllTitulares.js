const pool = require('../../database/connection.js');

module.exports = async(req, res)=>{
    console.log('ingresa a getAllTitulares ');
    const{escuela, page, cargo, legajo, limit} = req.body;
    console.log('Que tiene escuela: ', escuela);
    console.log('Que tiene cargo: ', cargo);
    console.log('Que tiene legajo: ', legajo);
    console.log('que trae limit: ', limit);
    console.log('que trae page: ', page);

    const offset = (page-1)*limit;

    //TRAE TODOS LOS INSCRIPTOS
    let armaquery = `SELECT t.legajo, t.dni, t.nombre, t.fecha_ingreso, t.id_cargo, t.orden, esp.abreviatura, t.id_escuela, e.numero AS Nro_Escuela, c.año, c.puntaje_anterior, c.item_a, c.item_b, c.item_c, c.item_d, c.item_e, c.item_f, (c.puntaje_anterior + c.item_a + c.item_b + c.item_c + c.item_d + c.item_e + c.item_f) as total
        FROM titulares AS t 
        LEFT JOIN escuelas AS e ON t.id_escuela = e.id_escuela 
        LEFT JOIN calificacion AS c ON t.legajo = c.legajo
        LEFT JOIN especialidad AS esp ON t.id_cargo = esp.id_especialidad
        WHERE c.activo = 1
        `;

        if(escuela && escuela!=''){
            armaquery += ` AND t.id_escuela = ${escuela} `
        }

        if(cargo && cargo!=''){
            armaquery += ` AND t.cargo = ${cargo} `
        }

        if(legajo && legajo!=''){
            armaquery += ` AND t.legajo = ${legajo} `
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