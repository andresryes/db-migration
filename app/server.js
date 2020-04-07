const oracledb = require('oracledb');
const config = require('./dbConfig.js');
var express = require('express');
var app = express();

async function runTest() {
  let conn;
  try {
    if (process.env.NODE_ORACLEDB_USER == "ORACLE"){
        conn = await oracledb.getConnection(config);
        const result = await conn.execute(
          'select current_timestamp from dual'
        );
        console.log(result);
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
runTest();

app.get('/', function (req, res) {
  res.send('Hello World!');
});


/* Conteo de todas las tablas */
app.get('/count', function (req, res) {
  res.send('Este es el conteo de todas las tablas de HR');
});

/* Inserts */
app.post('/empleado', (req, res) => {
  console.log('Got body empleado:', req.body);
  res.sendStatus(200);
});

app.post('/puesto', (req, res) => {
  console.log('Got body puesto:', req.body);
  res.sendStatus(200);
});

app.post('/region', (req, res) => {
  console.log('Got body region:', req.body);
  res.sendStatus(200);
});

app.post('/pais', (req, res) => {
  console.log('Got body pais:', req.body);
  res.sendStatus(200);
});

app.post('/location', (req, res) => {
  console.log('Got body location:', req.body);
  res.sendStatus(200);
});

/* Update empleado.salario, empleado.puesto por ID */
app.post('/empleado/:idEmpleado', (req, res) => {
  console.log('Got body EMPLEADO:', req.body);
  res.sendStatus(200);
  res.send(req.params.idEmpleado);
});

/* Eliminar empleado por ID*/
app.delete('/empleado/:idEmpleado', (req, res) => {
  res.sendStatus(200);
  res.send(req.params.idEmpleado);
});

/* Consultar empleado por ID */
app.get('/empleado/:idEmpleado', (req, res) => {
  res.sendStatus(200);
  res.send(req.params.idEmpleado);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});