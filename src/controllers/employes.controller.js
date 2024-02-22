import {pool} from "../db.js"

export const getEmployees = async(req, res) => {
    const [rows] = await pool.query('SELECT * FROM employee')
    res.send(rows)
}

export const getEmploye = async(req, res) => {
    const {id} = req.params

    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        if(rows.length <= 0) return res.status(404).json({error: 'Empleado no encontrado'})
        res.status(200).send(rows)
    }catch(error) {
        res.status(500).json({error: 'Hubo un problema en el servidor'})
    }   
}

export const postEmployees = async(req, res) => {
    const {name, salary} = req.body
    const [rows] = await pool.query('INSERT INTO employee(name, salary) VALUES (?, ?)', [name, salary])
    res.send({
        id: rows.insertId,
        name,
        salary,
    })
}

export const updateEmployees = async(req, res) => {
    const {id} = req.params
    const {name, salary} = req.body
    await pool.query('UPDATE employee SET name = IFNULL(?, name) , salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id])

    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
    res.json(rows[0])
}

export const deleteEmployees = async(req, res) => {
    const {id} = req.params
    await pool.query('DELETE FROM employee WHERE id = ?', [id])
    res.send(`Se eliminó el empleado con el id ${id}`)
}
