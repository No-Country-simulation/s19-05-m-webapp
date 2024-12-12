# Documentacion del backend - E-commerce.

</br>

## 1. Descripcion General del Proyecto

El backend de este proyecto es una API REST que permite a los usuarios registrarse, iniciar sesión, comprar videos juegos y consolas de juegos, principalmente enfocado en el rubro Gamer. El usuario podra ver una lista de productos y agregarlos al carrito para su eventual compra.
También podra ver las promociones disponibles, y filtrar las busquedas por consola, categoria, marca, entre otros.

</br>

## 2. Stack tecnologico

- **Lenguaje:** Typescript
- **Entorno de ejecucion:** Node js
- **Sistema de contenedores:** Docker
- **Base de datos:** MySQL
- **Autenticacion:** 
- **Servicios externos:** PayPal (pagos)

</br>

## 3. Configuracion del Entorno

### a) Instalacion de dependencias

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raiz del proyecto

```bash
npm install
```

### b) Variables de entorno

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=back
```

### c) Como ejecutar el proyecto

```bash
npm run dev
```

</br>

## 4. Arquitectura del sistema

### a) Estructuracion de las carpetas

```bash
src/
├── config/
├── controllers/
├── dto/
├── entity/
├── middlewares/
├── repositories/
├── routes/
├── services/
├── index.ts
├── server.ts
```

</br>

### b) Diagrama de arquitectura

![Diagra Base de datos](https://github-production-user-asset-6210df.s3.amazonaws.com/53066396/388136896-8283b137-af13-4eb9-b9e4-4bfb4bd76ae0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20241120%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241120T185820Z&X-Amz-Expires=300&X-Amz-Signature=a1b55092996c8a5fd1db685761ebcbfdb9dd9f49d9d8c13d66d188aa65b480a7&X-Amz-SignedHeaders=host)

</br>

## 5. PayPal - `Cuentas de prueba`

### Comprador:
``` bash
```

### Vendedor:
``` bash
```

</br>

## Endpoints de la API

## **Usuarios**

### **GET:** `/user`

- **Descripcion:** Metodo que devuelve un arreglo con todos los usuarios disponibles en la base de datos
- **Parametros:** No se requieren parametros

#### **Respuesta exitosa:**

- **Status:** ``
- **Contenido:** Un arreglo de objetos de tipo User, si no hay usuarios devuelve un arreglo vacio `[]`
- **Body:**
```json
[]
```

#### **Posibles errores:**

- **500 Internal Server Error:** Error al intentar conectarse a la base de datos

</br>

---

</br>

## **Product**

### **GET:** `/product`

- **Descripcion:** Metodo que devuelve un arreglo con todos los productos disponibles en la base de datos
- **Parametros:** No se requieren parametros

#### **Respuesta exitosa:**

- **Status:** ``
- **Contenido:** Un arreglo de objetos de tipo Product, si no hay product devuelve un arreglo vacio `[]`
- **Body:**
```json
[]
```

#### **Posibles errores:**

- **500 Internal Server Error:** Error al intentar conectarse a la base de datos

</br>

---

</br>

