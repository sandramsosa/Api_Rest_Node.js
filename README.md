# Api_Rest_Node.js
Este proyecto es una API RESTful desarrollada con Node.js y Express, que permite gestionar productos (crear, listar, actualizar y eliminar) y está protegida con autenticación JWT. Utiliza Firebase Firestore como base de datos y fue desplegada en Vercel.

# 📦 Requisitos

Para ejecutar este proyecto localmente necesitás tener instalado:

- [Node.js](https://nodejs.org/) v14 o superior
- [npm](https://www.npmjs.com/) (se instala con Node.js)
- Una cuenta de [Firebase](https://firebase.google.com/)
- Un archivo `.env` con las variables de entorno necesarias

# 🧩 Dependencias utilizadas

- **express**: Framework para crear el servidor y las rutas.
- **body-parser**: Middleware para parsear cuerpos de solicitud en formato JSON.
- **cors**: Middleware para habilitar solicitudes desde otros dominios.
- **dotenv**: Para manejar variables de entorno.
- **firebase**: Para conectarse a Firestore como base de datos.
- **jsonwebtoken**: Para generar y verificar tokens de autenticación JWT.
- **nodemon** (como dependencia de desarrollo): Para recargar el servidor automáticamente durante el desarrollo.

# 🛠 Instalación

1. Clonar el repositorio:
git clone https://github.com/sandramsosa/Api_Rest_Node.js.git
cd api_rest.
2. Instalar las dependencias:
npm install
3. Crear un archivo .env en la raíz del proyecto con el siguiente contenido (ejemplo):
JWT_SECRET_KEY=tu_clave_secreta
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...

# 🚀 Ejecución

En modo desarrollo (con recarga automática):
npm run dev

En modo producción:
npm start

# 📂 Estructura del proyecto

api_rest/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js         # Lógica para login y generación de tokens JWT
│   │   └── products.controller.js     # Controladores para CRUD de productos
│   ├── data/
│   │   └── data.js                    # Conexión a Firebase
│   ├── middlewares/
│   │   └── authentication.js         # Middleware para verificar el token JWT
│   ├── models/
│   │   └── products.model.js         # Lógica del modelo de productos
│   ├── routes/
│   │   ├── auth.router.js            # Rutas relacionadas a autenticación
│   │   └── products.router.js        # Rutas del CRUD de productos
│   ├── services/
│   │   └── .gitkeep                  # Carpeta reservada para servicios adicionales
│   └── utils/
│       └── token.js                  # Funciones auxiliares para manejar JWT
├── .env                              # Variables de entorno (no debe subirse al repo)
├── .gitignore                        # Archivos/Carpetas ignoradas por Git
├── index.js                          # Punto de entrada principal de la API
├── package-lock.json                 # Archivo de versiones exactas de dependencias
├── package.json                      # Configuración del proyecto y dependencias
├── README.md                         # Documentación del proyecto
└── vercel.json                       # Configuración para desplegar en Vercel


# 🧠 Controladores
Los controladores se encuentran en src/controllers/ y definen la lógica que se ejecuta cuando se recibe una solicitud HTTP. Se comunican con los modelos para obtener o modificar los datos.

- **products.controller.js
Gestiona todas las operaciones sobre productos. Las rutas asociadas son:
GET /products: devuelve todos los productos
GET /products/search?name=valor: busca productos por nombre
GET /products/:id: devuelve un producto por ID
POST /products: crea un nuevo producto
PUT /products/:id: actualiza un producto existente
DELETE /products/:id: elimina un producto

- **auth.controller.js
Maneja la autenticación. Las rutas implementadas son:

POST /login: valida las credenciales y devuelve un token JWT
(Opcional) POST /register: permite registrar un nuevo usuario
⚠️ Las rutas protegidas requieren el token JWT en la cabecera:
Authorization: Bearer TU_TOKEN

# 🧩 Lógica de acceso a datos (modelo)
Ubicada en src/models/products.model.js, esta capa abstrae la lógica para acceder a la base de datos Firebase Firestore.

getProductById(id): Busca un producto por su ID. Devuelve null si no existe.
getAllProducts(): Obtiene todos los productos de la colección.
createProduct(product): Agrega un nuevo producto. Devuelve el producto con su ID asignado.
updateProduct(id, trademark, name, price, categories): Actualiza un producto existente. Devuelve los datos actualizados.
deleteProduct(id): Elimina un producto. Devuelve true si fue exitoso, false en caso contrario.

📌 Todas las funciones utilizan async/await y están preparadas para manejar errores con try/catch.

# 🛣️ Rutas y conexión
Las rutas se encuentran en src/routes/ y están conectadas con los controladores:
El archivo products.router.js enlaza las rutas del recurso /products con sus funciones correspondientes del controlador.
El archivo auth.router.js enlaza la ruta /login con la función que genera el token JWT.
Ambos routers son importados y utilizados en index.js, bajo el prefijo /api, por lo tanto todas las rutas deben comenzar con /api/....

# 🔐 Autenticación
La API utiliza JSON Web Tokens (JWT) para proteger las rutas que permiten modificar los datos. Para acceder a rutas protegidas, es necesario enviar un token válido en la cabecera de la solicitud, utilizando el formato: Authorization seguido de la palabra Bearer y el token recibido.
El token se obtiene realizando una solicitud POST a la ruta /auth/login, enviando las credenciales de un usuario por defecto que está definido internamente en la API.
Este usuario por defecto tiene un correo electrónico y una contraseña predefinidos. Por lo tanto, al momento de hacer la solicitud para autenticarse, se debe enviar un cuerpo con el correo y la contraseña correctos.
Si las credenciales son válidas, la API responderá con un token JWT que debe ser usado en las siguientes solicitudes protegidas, como crear, actualizar o eliminar productos.
Es importante recordar que todas las solicitudes protegidas deben incluir este token en la cabecera de autorización para poder ejecutarse correctamente.

# 🧪 Pruebas con Postman
Podés probar esta API utilizando la herramienta Postman. A continuación se explica cómo hacerlo:
Si estás probando localmente, la URL base será http://localhost:3000.
Si estás usando la versión desplegada en Vercel, la URL será algo como https://api-rest-node-js-jet.vercel.app/.
Importante: todas las rutas están definidas con el prefijo /api, excepto la ruta para autenticación, que es /auth/login.

Ejemplos:
Obtener productos:
https://api-rest-node-js-jet.vercel.app/api/products
Autenticarse:
https://api-rest-node-js-jet.vercel.app/auth/login

Para hacer solicitudes protegidas (crear, editar o eliminar productos), primero debés hacer un POST a /auth/login para obtener el token JWT, y luego incluirlo en la cabecera de las demás solicitudes con:
Authorization: Bearer TU_TOKEN

En solicitudes POST y PUT, enviá el cuerpo en formato JSON con los campos:
trademark, name, price y categories.

# ✍️ Autor
Sandra Mabel Sosa
Proyecto desarrollado como parte del curso de Back End Node JS.





