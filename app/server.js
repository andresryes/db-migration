const oracledb = require('oracledb');
const config = require('./dbConfig.js');
var express = require('express');
var app = express();
app.use(express.urlencoded())

var conectionDB;
if (process.env.NODE_DB === "ORACLE"){
  conectionDB = oracledb.getConnection(config);
}

async function runTest() {
  let conn;
  try {
    if (process.env.NODE_DB === "ORACLE"){
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

app.get('/', async (req, res) => {
  res.send('Hello World!');
});


/* Conteo de todas las tablas */
app.get('/count', async (req, res) => {
  if (process.env.NODE_DB === "ORACLE"){
    let conn;
    conn = await oracledb.getConnection(config);
    const result = await conn.execute(
      'select sum(to_number(extractvalue(xmltype(dbms_xmlgen.getxml(\'select count(*) c from \'||table_name)),\'/ROWSET/ROW/C\'))) count from user_tables'
    );
    await conn.close();
    console.log(result);
    res.send(result);
  } 
  else{
    res.send("");
  }
});

/* Inserts */
app.post('/empleado', async (req, res) => {
  console.log('Got body empleado:', req.body);
});

app.post('/puesto', async (req, res) => {
  console.log('Got body puesto:', req.body);
});

app.post('/region', async (req, res) => {
  res.sendStatus(200);
});

app.post('/pais', async (req, res) => {
  console.log('Got body pais:', req.body);
});

app.post('/location', async (req, res) => {
  console.log('Got body location:', req.body);
  /*res.sendStatus(200);*/
});

/* Update empleado.salario, empleado.puesto por ID */
app.post('/empleado/:idEmpleado', async (req, res) => {
  console.log('Got body EMPLEADO:', req.body.salary);
  console.log('Got body EMPLEADO:', req.body.job_id);
  res.send(req.params.idEmpleado);
});

/* Eliminar empleado por ID*/
app.delete('/empleado/:idEmpleado', async (req, res) => {
  res.send(req.params.idEmpleado);
});

/* Consultar empleado por ID */
app.get('/empleado/:idEmpleado', async (req, res) => {
  if (process.env.NODE_DB === "ORACLE"){
    let conn;
    conn = await oracledb.getConnection(config);
    const result =  await conn.execute(
      'select * from employees where employee_id = :id',
      [req.params.idEmpleado]
    );
    await conn.close();
    console.log(result);
    res.send(result);
  } 
  else{
    res.send("");
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});