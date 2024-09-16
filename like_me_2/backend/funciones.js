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
  const consulta = "INSERT INTO posts values (DEFAULT, $1,$2,$3,0)";
  const values = [titulo, img, descripcion];
  await pool.query(consulta, values);
  console.log("Post agregado ");
};

const agregarLike = async (id) => {
  const consulta = "UPDATE posts SET likes = (likes + 1) WHERE id = $1;";
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  if (rows.length == 0) {
    console.log("el posteo no existe con el ID =", id);
    return 0;
  } else {
    console.log("Like agregado al post: ", rows);
    return 1;
  }
};

const borrarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  if (rows.length == 0) {
    console.log("Registro no existe con ID = ", id);
    return 0;
  } else {
    console.log("Registro eliminado", rows);
    return 1;
  }
};

module.exports = { leerPost, escribirPost, agregarLike, borrarPost };
