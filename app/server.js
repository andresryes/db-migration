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

/* Inserts 
	insert into employees  values (1,'Steven','King','SKINGa','515.123.4567',to_date('17-JUN-03','DD-MON-RR'),'AD_PRES',24000,null,null,90);
*/
app.post('/empleado', async (req, res) => {
  let b = req.body
  if (process.env.NODE_DB === "ORACLE"){
    try{
      let conn;
      conn = await oracledb.getConnection(config);
      const result =  await conn.execute(
        'insert into employees values (:0, :1, :2, :3, :4, to_date(:5,\'DD-MON-RR\'), :6, :7, :8, :9, :10, :11)',
        [b.employee_id, b.first_name, b.last_name, b.email, b.phone_number, b.hire_date,
      b.job_id, b.salary, b.comission_pct, b.manager_id, b.department_id],
      {autoCommit:true}
      );
      console.log(result);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.send(err)
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
  else{
    res.send("");
  }
});

app.post('/puesto', async (req, res) => {
  let b = req.body
  if (process.env.NODE_DB === "ORACLE"){
    try{
      let conn;
      conn = await oracledb.getConnection(config);
      const result =  await conn.execute(
        'insert into jobs values (:0, :1, :2, :3)',
        [b.job_id, b.job_title, b.min_salary, b.max_salary],
      {autoCommit:true}
      );
      console.log(result);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.send(result)
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
  else{
    res.send("");
  }
});

app.post('/region', async (req, res) => {
  let b = req.body
  if (process.env.NODE_DB === "ORACLE"){
    try{
      let conn;
      conn = await oracledb.getConnection(config);
      const result =  await conn.execute(
        'insert into regions values (:0, :1)',
        [b.region_id, b.region_name],
      {autoCommit:true}
      );
      console.log(result);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.send(result)
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
  else{
    res.send("");
  }
});

app.post('/pais', async (req, res) => {
  let b = req.body
  if (process.env.NODE_DB === "ORACLE"){
    try{
      let conn;
      conn = await oracledb.getConnection(config);
      const result =  await conn.execute(
        'insert into countries values (:0, :1, :2)',
        [b.country_id, b.country_name, b.region_id],
      {autoCommit:true}
      );
      console.log(result);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.send(result)
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
  else{
    res.send("");
  }
});

app.post('/location', async (req, res) => {
  let b = req.body
  if (process.env.NODE_DB === "ORACLE"){
    try{
      let conn;
      conn = await oracledb.getConnection(config);
      const result =  await conn.execute(
        'insert into locations values (:0, :1, :2, :3, :4, :5)',
        [b.location_id, b.street_address, b.postal_code, b.city, b.state_province, b.country_id],
      {autoCommit:true}
      );
      console.log(result);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.send(result)
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
  else{
    res.send("");
  }
  /*res.sendStatus(200);*/
});

/* Update empleado.salario, empleado.puesto por ID 
	update employees set salary = 24500, job_id = 'AD_VP' where employee_id = 100
*/
app.post('/empleado/:idEmpleado', async (req, res) => {
  if (process.env.NODE_DB === "ORACLE"){
    try{
      let conn;
      conn = await oracledb.getConnection(config);
      const result =  await conn.execute(
        'update employees set salary = :salary, job_id = :job where employee_id = :id',
        [req.body.salary, req.body.job_id, req.params.idEmpleado],
      {autoCommit:true}
      );
      console.log(result);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.send(result)
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
  else{
    res.send("");
  }
  console.log('Got body EMPLEADO:', req.body.salary);
  console.log('Got body EMPLEADO:', req.body.job_id);
  /*res.send(req.params.idEmpleado);*/
});

/* Eliminar empleado por ID
	delete from employees where employee_id = 178
*/
app.delete('/empleado/:idEmpleado', async (req, res) => {
  if (process.env.NODE_DB === "ORACLE"){
    try{
      let conn;
      conn = await oracledb.getConnection(config);
      const result =  await conn.execute(
        'delete from employees where employee_id = :id',
        [req.params.idEmpleado],
      {autoCommit:true}
      );
      console.log(result);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.send(result)
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
  else{
    res.send("");
  }
});

/* Consultar empleado por ID */
app.get('/empleado/:idEmpleado', async (req, res) => {
  if (process.env.NODE_DB === "ORACLE"){
    try{
      let conn;
      conn = await oracledb.getConnection(config);
      const result =  await conn.execute(
        'select * from employees where employee_id = :id',
        [req.params.idEmpleado]
      );
      console.log(result);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.send(result)
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
  else{
    res.send("");
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});