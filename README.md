# Vinci

This application is part of my engineering thesis. It allows for creating, joining and paying for sport events.

##### Features

- view all sport objects using Google Maps
- pay for participation using Paypal
- login using Facebook

## Development server

Run `yarn run start:dev` for a dev server. Navigate to `https://localhost:8080/`. Note that server is listening on HTTPS. To enable this Angular has generated fake cert. You have to trust this cert to enter the site.   

## Build

Run `yanr run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `yarn run test:dev` to execute the unit tests via [Karma](https://karma-runner.github.io).

