# CheckId Web APP

Aplicación web de CheckID para el proceso de validación de identidad, enrolamiento y gestión de acceso de un usuario

## Development server

Run for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
````bash
ng server -o
````

## Running documentation

Run for view documentation
````bash
compodoc -p tsconfig.doc.json -s
````

## Build

Run to build the project. The build artifacts will be stored in the `dist/` directory.
````bash
ng build --build-optimizer
````

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
