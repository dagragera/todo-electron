# ToDo Electron

Aplicación de escritorio sencilla para gestionar tareas, desarrollada con Electron.

## Descripción

Este proyecto consiste en una pequeña aplicación tipo "ToDo" en la que se pueden añadir, marcar y eliminar tareas.  
Las tareas se guardan en local en formato JSON, por lo que no se pierden al cerrar la aplicación.

La aplicación está hecha con Electron, utilizando HTML, CSS y JavaScript.

---

## Funcionalidades

- Añadir tareas
- Marcar tareas como completadas
- Eliminar tareas
- Limpiar tareas completadas
- Guardado automático en el equipo

---

## Instalación y uso

### Ejecutar en desarrollo

```bash
npm install
npm start

### Instalación como aplicación (.deb)

Se ha generado un instalador para sistemas basados en Debian:

```bash
sudo dpkg -i todo-electron_1.0.0_amd64.deb
sudo apt -f install -y
```

Una vez instalado, la aplicación aparece en el menú del sistema.
