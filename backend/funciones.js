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

const escribirPost = async (titulo, url, descripcion) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1,$2,$3,0)";
  const values = [titulo, url, descripcion];
  await pool.query(consulta, values);
  console.log("Post agregado ");
};

const agregarLike = async (id) => {
  const consulta = "UPDATE posts SET likes = (likes + 1) WHERE id = $1;";
  const values = [id];
  await pool.query(consulta, values);
};

const borrarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  await pool.query(consulta, values);
};

module.exports = { leerPost, escribirPost, agregarLike, borrarPost };
