const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "like_me",
  allowExitOnIdle: true,
});

const leerPost = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts;");
    return rows;
  } catch (error) {
    throw { code: 500, message: "Error al leer los posts: " + error.message };
  }
};

const escribirPost = async (titulo, url, descripcion) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1,$2,$3,0)";
  const values = [titulo, url, descripcion];
  try {
    await pool.query(consulta, values);
    console.log("Post agregado ");
  } catch (error) {
    throw { code: 500, message: "Error al escribir el post: " + error.message };
  }
};

const agregarLike = async (id) => {
  const consulta = "UPDATE posts SET likes = (likes + 1) WHERE id = $1;";
  const values = [id];
  try {
    const { rowCount } = await pool.query(consulta, values);
    if (rowCount == 0) {
      throw { code: 404, message: "No se consiguió ningún posts con este id" };
    }
  } catch (error) {
    throw {
      code: error.code || 500,
      message: "Error al agregar like: " + error.message,
    };
  }
};

const borrarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  try {
    await pool.query(consulta, values);
    if (rowCount == 0) {
      throw { code: 404, message: "No se encontró ningún post con este id" };
    }
  } catch (error) {
    throw {
      code: error.code || 500,
      message: "Error al borrar el post: " + error.message,
    };
  }
};

module.exports = { leerPost, escribirPost, agregarLike, borrarPost };
