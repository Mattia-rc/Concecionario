require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Ruta para obtener todos los vehículos (pública)
/* router.get('/', async (req, res) => {
    try {
        // Encuentra todos los usuarios y sus vehículos
        const users = await User.find();
        let allVehicles = [];

        // Recopila todos los vehículos de todos los usuarios
        users.forEach(user => {
            allVehicles = allVehicles.concat(user.vehiculos);
        });

        res.status(200).json(allVehicles);
    } catch (error) {
        res.status(400).send("Error al obtener vehículos");
    }
}); */
router.get('/', async (req, res) => {
    try {
        // Obtener parámetros de consulta (filtros)
        const { marca, modelo, transmicion, precioDesde, precioHasta, kmDesde, kmHasta, anoDesde, anoHasta } = req.query;

        // Crear una consulta base para encontrar todos los usuarios
        const users = await User.find();
        let allVehicles = [];

        // Recopila todos los vehículos de todos los usuarios
        users.forEach(user => {
            allVehicles = allVehicles.concat(user.vehiculos);
        });

        // Aplicar filtros
        if (marca) allVehicles = allVehicles.filter(v => v.marca === marca);
        if (modelo) allVehicles = allVehicles.filter(v => v.modelo === modelo);
        if (transmicion) allVehicles = allVehicles.filter(v => v.transmicion === transmicion);
        if (precioDesde) allVehicles = allVehicles.filter(v => v.precio >= precioDesde);
        if (precioHasta) allVehicles = allVehicles.filter(v => v.precio <= precioHasta);
        if (kmDesde) allVehicles = allVehicles.filter(v => v.kilometraje >= kmDesde);
        if (kmHasta) allVehicles = allVehicles.filter(v => v.kilometraje <= kmHasta);
        if (anoDesde) allVehicles = allVehicles.filter(v => v.ano >= anoDesde);
        if (anoHasta) allVehicles = allVehicles.filter(v => v.ano <= anoHasta);

        res.status(200).json(allVehicles);
    } catch (error) {
        res.status(400).send("Error al obtener vehículos");
    }
});


// Ejemplo de una ruta POST
router.post('/register', async (req, res) => {
    const {email, username, password} = req.body
    if(!email || !username || !password){
        res.status(400).send("todos los campos son obligatorios");
    }
    try {
        const usuario = new User({email, username, password})
        console.log("datos recibidos: ", {email, username, password})
        await usuario.save()
        res.status(201).send("Usuario creado correctamente")
    } catch (error) {
        res.status(400).send("Error al crear el usuario")
    }
});


router.post('/login', async (req,res)=>{
    const {email, username, password} = req.body
    if(!username||!password || !email){
        return res.status(401).send("usuario o contraseña son requeridos.",  {email, username, password})
    }
    try {
        const user = await User.findOne({username: username})

        if(!user){
            res.status(401).send("No se encuentra el usuario")
        }
    
        const validatePassword = await bcrypt.compare(password, user.password);
    
        if(!validatePassword){
            res.status(403).send("las contraseñas no coinciden");
        }
    
        const token = jwt.sign(
            {id: user._id, username: username},
            process.env.JWTSECRET,
            {
                expiresIn:'1h'
            })
            res
            .cookie('jwt', token,{
                httpOnly: true, 
                secure: false, // Usa `secure: true` en producción con HTTPS
                sameSite: 'Lax' // Configura esto según tu necesidad (Lax, Strict, None)
            })
            .send({user, token})
    } catch (error) {
        res.status(401).send(error.message)
    }

})




router.post('/vista_create_vehicle', upload.array('images', 10), async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send("Token no proporcionado");
        }
        const data = jwt.verify(token, process.env.JWTSECRET);
        const { marca, modelo, precio, kilometraje, transmicion, descripcion, ano } = req.body;
        const imageFiles = req.files;

        const imagePaths = imageFiles.map(file => file.path); // Paths of uploaded images

        const user = await User.findById(data.id);

        user.vehiculos.push({ marca, modelo, precio, kilometraje, transmicion, descripcion, images: imagePaths, ano });
        await user.save();

        res.status(200).send("Vehículo agregado correctamente");
    } catch (error) {
        res.status(400).send("Error al agregar el vehículo: " + error.message);
    }
});

router.get('/vista_viewAll', async (req,res)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).send("token no proporcionado")
        }
        const data = jwt.verify(token, process.env.JWTSECRET);

        const user = await User.findById(data.id)
        await user.save()

        console.log("el user vehiculos del back es: ", user.vehiculos)
        res.status(200).json(user.vehiculos)

    } catch (error) {
        res.status(400).send("error al ver vehiculos")
    }
})

router.get('/vista_Admin', async (req,res)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).send("token no proporcionado");
        }
        const data = jwt.verify(token, process.env.JWTSECRET);
        console.log("la data es en obtener usuario backkend: ",data)
        
        const user = await User.findById(data.id)
        if(!user){
            res.status(401).send("user no encontrado");
        }
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).send(error)
    }
})

router.put('/vehiculo/:id', async (req,res)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
           return res.status(401).send("Token no proporcionado");
        }

        const data = jwt.verify(token, process.env.JWTSECRET);

        const user = await User.findById(data.id);

        if(!user){
           return res.status(401).send("usuario no proporcionado")
        }
        const vehiculo = user.vehiculos.find(v=> v._id.toString()=== req.params.id)

        if(!vehiculo){
            return res.status(401).send("vehiculo no encontrado");
        }
        vehiculo.marca = req.body.marca || vehiculo.marca;
        vehiculo.modelo = req.body.modelo || vehiculo.modelo;
        vehiculo.precio = req.body.precio || vehiculo.precio;
        vehiculo.kilometraje = req.body.kilometraje || vehiculo.kilometraje;
        vehiculo.transmicion = req.body.transmicion || vehiculo.transmicion;
        vehiculo.descripcion = req.body.descripcion || vehiculo.descripcion;
        vehiculo.ano = req.body.ano || vehiculo.ano;
        vehiculo.image = req.body.image || vehiculo.image;

        await user.save();
        res.status(200).send("Vehículo actualizado correctamente");

    } catch (error) {
        res.status(400).send("Error al actualizar vehículo: " + error.message);
    }
})


router.get('/vehiculo/:id', async (req, res) => {
    try {
      const user = await User.findOne({ 'vehiculos._id': req.params.id });
      if (!user) {
        return res.status(404).send("Vehículo no encontrado");
      }
      const vehiculo = user.vehiculos.id(req.params.id);
      if (!vehiculo) {
        return res.status(404).send("Vehículo no encontrado");
      }
      res.status(200).json(vehiculo);
    } catch (error) {
      res.status(400).send("Error al obtener el vehículo: " + error.message);
    }
  });
  

router.delete('/vehiculo/:id', async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send("Token no proporcionado");
        }

        const data = jwt.verify(token, process.env.JWTSECRET);
        const user = await User.findById(data.id);

        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        // Filtrar los vehículos y guardar el usuario
        user.vehiculos = user.vehiculos.filter(vehiculo => vehiculo._id.toString() !== req.params.id);
        await user.save();

        res.status(200).send("Vehículo eliminado correctamente");
    } catch (error) {
        res.status(400).send("Error al eliminar vehículo: " + error.message);
    }
});


module.exports = router;