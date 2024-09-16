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
app.use(morgan("dev"));
app.use(cors());

app.get("/posts", async (req, res) => {
  const obtenerPost = await leerPost();
  res.json(obtenerPost);
});

app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion } = req.body;
  try {
    await escribirPost(titulo, img, descripcion);
    res.status(500).json({ message: "El post fue agregado" });
  } catch (error) {
    res.status(500).json({ error: "Error de comunicación" });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  const id = req.params.id;
  const darLike = await agregarLike(id);

  if (darLike == 0) {
    res.send("El post no existe con el ID = " + id);
  } else {
    res.send("Tenemos un like!!");
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const borrar = await borrarPost(id);

    if (borrar == 0) {
      res.send("post no existe con ID =" + id);
    } else {
      res.send("*** Post eliminado ***");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
