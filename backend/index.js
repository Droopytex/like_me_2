const {
  leerPost,
  escribirPost,
  agregarLike,
  borrarPost,
} = require("./funciones");
const cors = require("cors");
const express = require("express"); //importamos express
const app = express(); //instanciamos express

const port = 3000; //definimos puerto

app.listen(port, () => console.log("Servidor escuchado en puerto 3000!")); //levantamos el servidor

app.use(express.json()); //middleware
app.use(cors());

app.get("/posts", async (req, res) => {
  const obtenerPost = await leerPost();
  res.json(obtenerPost);
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;

    if (!titulo || !url || !descripcion) {
      return res
        .status(400)
        .send("Todos los campos (titulo, url, descripcion) son obligatorios.");
    }
    await escribirPost(titulo, url, descripcion);
    res.send("El post fue agregado");
  } catch (error) {
    const { code } = error;
    if (code == "23502") {
      res
        .status(400)
        .send("Se ha violado la restricción NOT NUL en uno de los campos");
    } else {
      res.status(500).send(error);
    }
  }
});

app.put("/posts/like/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await agregarLike(id);
    res.send("tenemos tu like");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await borrarPost(id);
    res.send("El post fue eliminado");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});
