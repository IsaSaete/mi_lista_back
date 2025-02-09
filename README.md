# Launch starter TypeScript

Aquí tienes un starter para tus primeros proyectos con TypeScript.

## ¿Cómo utilizarlo?

### Clona el repo

Primero clona el repositorio desde GitHub a tu disco duro, y luego ya puedes abrir el proyecto local en VS Code.

### Cambia el nombre del proyecto

Abre el archivo `package.json` y cambia el nombre "launch-starter-ts" por el nombre de tu proyecto.

### Instala las dependencias

Lanza el siguiente comando para instalar las herramientas que tu proyecto necesita. Asegúrate de que la terminal está abierta en la carpeta raíz de tu proyecto.

```bash
npm install
```

Después de lanzar este comando se te debe haber creado una carpeta llamada `node_modules`. Por ahora no es necesario entender qué es, pero es importante que esté.

### Crea la carpeta para tu código

Ahora que usas TypeScript, necesitas separar entre código fuente y código compilado, por tanto crea la carpeta `src` e incluye tus archivos de TS dentro (los archivos de TypeScript tienen **extensión `.ts`**). La carpeta de código compilado se llamará `dist` y se creará automáticamente cuando lances el comando de compilación.

### Configura el script de compilación

Para que tu código fuente se compile a JavaScript, necesitas lanzar un comando. Te hemos dejado un script en el archivo `package.json` que se llama `build` y que por ahora está vacío. Tienes que configurarlo para que compile tu código fuente. Busca qué comando necesitas para compilar TypeScript y añádelo al script `build`.

**IMPORTANTE**: Ahora, cada vez que quieras ejecutar tu programa, previamente tendrás que lanzar el comando de compilación, porque si no tus cambios en el código fuente no se verán reflejados en el código compilado.

Para lanzar el comando de compilación desde la terminal, escribe:

```bash
npm run build
```

### Configura el script de inicio

Tu programa necesita un punto de entrada. Al tener un único archivo por ahora, será ése. Este punto de entrada lo tienes que configurar en el archivo `package.json`, en la propiedad `"main"`. Ahora está configurado para que el punto de entrada sea `index.js`, situado en la raíz del proyecto. Pero tú no tienes el archivo en el raíz, por tanto tienes que cambiarlo para que apunte al archivo **ejecutable** en su ruta actual.

Para probar el punto de entrada, haz un programa que imprima "Hola, mundo" por consola y lanza el siguiente comando desde la terminal:

```bash
node .
```

Ese comando significa "ejecuta el archivo que está en el punto de entrada de este proyecto" (`.` significa _el directorio actual_).

Si todo ha ido bien, deberías ver la frase "Hola, mundo" en la consola.

### Añade un script de lanzamiento

Los programas hechos para ejecutar en Node.js se lanzan con el comando `npm start`. Si te fijas en el archivo `package.json`, verás que hay una propiedad llamada `"scripts"`, donde ya hemos creado el script `start` pero está vacío. Rellénalo para que ejecute tu archivo principal con Node.js.
