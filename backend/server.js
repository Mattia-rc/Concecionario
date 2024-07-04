require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app  = express()
const PORT = 7000
const userRouter = require('./routes/app.route.js')
app.use(cookieParser())
app.use(bodyParser.json());

const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de multer


// Analizar solicitudes con datos codificados en formularios
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:4200',  // Permitir solicitudes desde este origen
    methods: ['GET', 'POST', 'DELETE', 'PUT'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],  // Encabezados permitidos
    credentials: true
  }));

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware para manejar la carga de archivos
app.post('/upload', upload.single('image'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use(session({
    secret: 'mysecretkey', // Cambia esto a una clave secreta más segura
    resave: false,
    saveUninitialized: true
}));


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.u01xb22.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
    useNewUrlParser: true,
    useUnifiedTopology: true  
})
.then(()=> console.log('Conexion establecida a la Base de Datos'))
.catch((err)=>console.error("Error al conectar con la Base de Datos",err))

app.use('/api', userRouter);

app.get('/api', (req, res) => {
    res.send("Hola mundooo"); // Esta es una ruta adicional bajo /api, si es necesaria
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})

