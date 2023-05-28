const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.get("/", (req, res)=>{
    res.render("formulario")
})

router.post("/enviar", async(req, res)=>{
    const {nombre, email, mensaje} = req.body; //aca desestructuramos y viene del body

//Validar campos
            //si tenemos algo diferente a eso
if (!nombre || !email || !mensaje){
    return res.render("formulario", {error: "todos los campos son obligatorios"});
}


//Configurar transportador SMTP (ethereal.email)

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'max58@ethereal.email',
        pass: 'hCtt8MGB5rH4kBX1Ze'
    }
});

//Configurar correo electronico

const mailOptions = {
    from: email,
    to: "destinatario@gmail.com",
    subject:"Formulario de contacto",
    text:  `
    Nombre: ${nombre} /n 
    Email: ${email} /n 
    Mensaje: ${mensaje}
    `
};

//Try.catch estructura de control para manejar errores y excepciones

try{
    //Enviar correo electronico
    await transporter.sendMail(mailOptions);
    res.render("confirmacion", {
        nombre: req.body.nombre
    });
} catch (error){
    console.log(error);
    res.render("formulario", {error: "Error al enviar mensaje"});
}


})
module.exports = router;