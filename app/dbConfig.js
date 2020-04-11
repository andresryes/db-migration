module.exports = {
    user          : process.env.NODE_DB_USER,
    password      : process.env.NODE_DB_PASSWORD,
    connectString : process.env.NODE_DB_CONNECTIONSTRING,
    poolMax: 2,
    poolMin: 2,
    poolIncrement: 0
  };