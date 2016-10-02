import mysql from 'mysql';

const pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection)  => {
      err ? reject(err) : resolve(connection);
    });
  });
};

export const query = async (...args) => {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query(...args, (err, rows, fields) => {
      err ? reject(err) : resolve({ rows, fields });
    });
  });
};
