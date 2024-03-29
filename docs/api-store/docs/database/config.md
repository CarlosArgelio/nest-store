---
sidebar_label: 'Configuracion'
sidebar_position: 1
---

# Configuracion

tenemos en la raiz del proyecto un archivo llamado docker-compose el cual tiene los servicios que necesitamos para configurar la base de datos

```jsx title="Configuracion en docker-compose.yaml"
version: '3.3'

services:
  postgres:
    image: postgres:${POSTGRES_VERSION}
    environment:
     - POSTGRES_DB=${POSTGRES_NAME}
     - POSTGRES_USER=${POSTGRES_USER}
     - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    ports:
      - '${POSTGRES_PORT}:${POSTGRES_PORT}'
    volumes:
      - postgres_data:/var/lib/postgresql/data
  pgadmin:
    image: dpage/pgadmin4
    environment:
     - PGADMIN_DEFAULT_EMAIL=${PGADMIN_EMAIL}
     - PGADMIN_DEFAULT_PASSWORD=${PGADMIN_PASSWORD}
    ports:
      - "${PGADMIN_PORT_INSTANCE}:${PGADMIN_PORT_IMAGE}"
    depends_on:
      - postgres
```

Como podemos ver hay vairables que necesitamos configurar en el .env dentro del archivo .env.example hay ejemplos de configuracion de la misma igual te las explico aqui

## Configuracion de la DB

| Variable | Uso |
|----------|----------|
| POSTGRES_VERSION   | Version del Postgres a utilizar, para el proyecto recomendamos la v15 |
| POSTGRES_NAME    | Nombre del usuario de postgres   |
| POSTGRES_PASSWORD   | Contrasena del usuario de postgres   |
| POSTGRES_PORT   | El puerto donde esta corriendo la DB de postgres|

## Configuracion del Pgadmin

Pgadmin es una motor de base de datos web, su configuracion es completamente opcional por lo cual no sera necesario agregar las variables en caso de no usarlo, ya que puedes correr el motor de base de datos en un cliente externo como DBAVER PHPMYADMIN etc

| Variable | Uso |
|----------|----------|
| PGADMIN_EMAIL   | Email del usuario que podra ingresar |
| PGADMIN_PASSWORD    | Contrasena del usuario para ingresar   |
| PGADMIN_PORT_INSTANCE   | El puerto donde estara corriendo recomendamos usar 5050   |
| PGADMIN_PORT_IMAGE   | El puerto donde va a correr en la imagen de docker recomendamos el 80|

# Comandos a usar

Tienes que tener instalado docker y docker-compose en la instancia donde vayas a correr el proyecto, una vez lo tengas debes correr estos comandos:

```bash title="Comandos para levantar el postgres"
docker-compose up -d postgres
```

```bash title="Comandos para levantar el pgadmin"
docker-compose up -d pgadmin
```

# Extra

Dentro del proyecto puedes configurar otro motor de base de datos que no sea postgres, como por ejemplo mysql solo entra en el archivo docker-compose.yaml y descomenta la configuracion del mysql y usalo, claro, tendras que hacer configuraciones dentro de la carpeta docker para que se pueda usar ese motor de base de datos, esa parte de la guia no lo colocaremos aqui ya que solo desarrolladores deben de conocer el metodo para hacerlo
