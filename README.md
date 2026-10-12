# Dulce Aroma
Sitio estático (HTML, CSS y JS) sobre postres y bebidas, con selector de idioma Español / English, modo oscuro y música de fondo. Abre `index.html` para verlo.

## Estructura
```
index.html  javascript.html  jquery.html  json.html  hosting.html  herramientas.html  cuestionario.html
logo.svg
css/
  estilos.css     base: colores, tipografía, encabezado, estructura
  tema.css        modo oscuro
  extras.css      carrusel, inicio, menú, herramientas, cuestionario, avisos, responsive
js/
  main.js         demos de JS y jQuery, formulario de contacto, carrusel y cuestionario
  herramientas.js las 15 herramientas de Google (buscador, filtros y ventana)
  tema.js         botón de modo claro / oscuro
  musica.js       botón de música de fondo (usa audio/musica.mp3 si existe; si no, genera una melodía suave)
  idioma.js       botón EN / ES (los textos en inglés van en los atributos data-en de cada página)
img/              fotos opcionales (ver img/LEEME.txt)
audio/            música opcional (ver audio/LEEME.txt)
```

## Publicar
1. Crea un repositorio público en GitHub y sube estos archivos con commits periódicos.
2. En Vercel: Add New > Project > importa el repositorio > Deploy.
3. Entrega la URL del repositorio y la URL de Vercel.
