const {
  leerPost,
  escribirPost,
  agregarLike,
  borrarPost,
} = require("./funciones");
const cors = require("cors");
const express = require("express"); //importamos express
const app = express();

require("dotenv").config();
const morgan = require("morgan");
//instanciamos express

const port = 3000; //definimos puerto

app.listen(port, () => console.log("Servidor escuchado en puerto 3000!")); //levantamos el servidor

app.use(express.json()); //middleware
app.use(morgan("dev")); //morgan
app.use(cors()); //CORS

//Ruta leer posts

app.get("/posts", async (req, res) => {
  const obtenerPost = await leerPost();
  res.json(obtenerPost);
});

//Ruta crear posts

app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion } = req.body;
  try {
    await escribirPost(titulo, img, descripcion);
    res.status(201).json({ message: "El post fue agregado" });
  } catch (error) {
    res.status(500).json({ error: "Error de comunicación" });
  }
});

//Ruta dar like
app.put("/posts/like/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await agregarLike(id);
    res.send("Tenemos un like !!");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});

//Ruta borrar posts
app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await borrarPost(id);
    res.send("El posteo ha sido eliminado, pasó a mejor vida");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});
