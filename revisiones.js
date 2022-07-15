const express = require('express');
const routes = express.Router();

//OBTENER TODAS LAS REVISIONES
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query(`SELECT numeroRevision, descripcion,dosis, medicacion, fecha, paciente FROM revisiones`,(err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})
 
//OBTENER LAS REVISIONES DE UN PACIENTE EN ESPECIFICO
routes.get('/:idpacientes1', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        const { idpacientes1 } = req.params;
        conn.query(`SELECT numeroRevision, descripcion,dosis, medicacion, fecha, paciente FROM revisiones INNER JOIN pacientes1 ON revisiones.paciente = pacientes1.idpacientes1 WHERE idpacientes1 = ?`,idpacientes1,(err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

//BORRAR UNA REVISION POR SU NUMERO DE REVISION
routes.delete('/:numeroRevision', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM revisiones WHERE numeroRevision = ?', [req.params.numeroRevision], (err, rows)=>{
            if(err) return res.send(err)

            res.send('revision excluded!')
        })
    })
})

//AGREGAR UNA REVISION
routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO revisiones set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)
            res.send('revision added!')
        })
    })
})

module.exports = routes