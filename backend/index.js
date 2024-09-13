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
  const { titulo, url, descripcion } = req.body;
  await escribirPost(titulo, url, descripcion);
  res.send("El post fue agregado");
});

app.put("/posts/like/:id", async (req, res) => {
  const id = req.params.id;
  await agregarLike(id);
  res.send("ok ...");
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  await borrarPost(id);
  res.send("CHAO ...");
});
