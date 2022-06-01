import { Testimonial } from "./../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {
  // Validar los datos
  const { nombre, correo, mensaje } = req.body;
  const errores = [];

  if (nombre.trim() === "") {
    errores.push({ mensaje: "Agrega tu nombre" });
  }

  if (correo.trim() === "") {
    errores.push({ mensaje: "Agrega tu correo" });
  }

  if (mensaje.trim() === "") {
    errores.push({ mensaje: "Agrega tu mensaje" });
  }

  if (errores.length > 0) {
    // Consultar testimoniales de la BD
    const testimoniales = await Testimonial.findAll();

    // Mostrar la vista con errores
    res.render("testimoniales", {
      pagina: "Testimoniales",
      errores,
      nombre,
      correo,
      mensaje,
      testimoniales,
    });
  } else {
    // Guardar en la base de datos
    try {
      await Testimonial.create({
        nombre,
        correo,
        mensaje,
      });

      res.redirect("/testimoniales");
    } catch (error) {
      console.log(error);
    }
  }
};

export { guardarTestimonial };
