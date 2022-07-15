const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM pacientes', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO pacientes set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('paciente added!')
        })
    })
})

routes.delete('/:idpacientes1', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM pacientes WHERE idpacientes1 = ?', [req.params.idpacientes1], (err, rows)=>{
            if(err) return res.send(err)

            res.send('paciente excluded!')
        })
    })
})

routes.put('/:idpacientes1', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE pacientes set ? WHERE idpacientes1 = ?', [req.body, req.params.idpacientes1], (err, rows)=>{
            if(err) return res.send(err)

            res.send('paciente updated!')
        })
    })
})

module.exports = routes