const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "like_me",
  allowExitOnIdle: true,
});

const leerPost = async () => {
  const { rows } = await pool.query("SELECT * FROM posts;");
  return rows;
};

const escribirPost = async (titulo, img, descripcion) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1,$2,$3,0) RETURNING *";
  const values = [titulo, img, descripcion];
  const { rows } = await pool.query(consulta, values);
  console.log("Post agregado ");
  return 0;
};

const agregarLike = async (id) => {
  const consulta = "UPDATE posts SET likes = (likes + 1) WHERE id = $1;";
  const values = [id];
  const { rowCount } = await pool.query(consulta, values);
  if (rowCount === 0) {
    throw { code: 404, message: "el posteo no existe con el ID =" + id };
  }
};

const borrarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const { rowCount } = await pool.query(consulta, values);
  if (rowCount === 0) {
    throw { code: 404, message: "No existe el post con id" };
  }
};

module.exports = { leerPost, escribirPost, agregarLike, borrarPost };
