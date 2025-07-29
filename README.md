# Pokemon SSR

Aplicación web de Pokémon desarrollada con Angular y Server-Side Rendering (SSR) para mejorar SEO y rendimiento inicial.

## Características

- Server-Side Rendering con Angular Universal
- Navegación entre páginas de Pokémon
- Optimizado para SEO
- Interfaz adaptativa con TailwindCSS
- Optimizaciones de rendimiento con Caddy Server

## Requisitos previos

- Node.js 18.x o superior
- npm 9.x o superior
- Docker y Docker Compose (para despliegue)

## Desarrollo local

Para iniciar el servidor de desarrollo:

```bash
npm install
npm start
```

La aplicación estará disponible en `http://localhost:4200/` y se recargará automáticamente cuando modifiques los archivos fuente.

## Servidor SSR en desarrollo

Para probar el renderizado del lado del servidor durante el desarrollo:

```bash
npm run build
npm run serve:ssr:pokemon-ssr
```

La aplicación estará disponible en `http://localhost:4000/`.

## Estructura del proyecto

El proyecto incluye:
- Componentes de páginas en `src/app/pages/`
- Componentes reutilizables de Pokémon en `src/app/pokemons/`
- Servicios y modelos de datos en `src/app/pokemons/services/` e `interfaces/`

## Despliegue con Docker

```bash
npm test
```

## Despliegue con Docker

El proyecto incluye configuración completa para despliegue con Docker:

```bash
# Construir y levantar los contenedores
docker-compose up -d --build
```

La aplicación estará disponible en:
- HTTP: `http://localhost:80/`
- HTTPS: `https://localhost:443/` (con certificado autofirmado)

### Componentes del despliegue

- **Aplicación Angular SSR**: Ejecutada en Node.js
- **Servidor Caddy**: Proxy inverso con limitación de tasa, compresión y seguridad mejorada

## Configuración de producción

El archivo `docker-compose.yml` define dos servicios:

- **app**: Contenedor para la aplicación Angular SSR
- **caddy**: Proxy inverso y servidor web

## Contribuciones

Las contribuciones son bienvenidas. Por favor, crea un Pull Request o abre un Issue para discutir los cambios propuestos.
