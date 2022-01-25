<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## **Description**

The project consists of an app capable of recording the speed and position of the user 24 hours a day, in order to find, through an AI, hard braking zones in the city.

Written with Typescript the backend provides the necessary data for the <a href="https://github.com/caiquetorres/hard-braking-zones-app">application frontend</a>.

<hr />

## **Getting started**

First you must to clone the repository using:

```bash
$ git clone 'https://github.com/caiquetorres/hard-braking-zones-api.git'
```

After that install all the required dependencies with:

```bash
$ yarn global add @nestjs/cli

$ yarn add
```

This project uses <strong>husky's commit-msg hook</strong>. For using it run the following commands:

```bash
$ npx husky install

$ npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

<hr />

## **Running the app**

```bash
# development
$ nest start

# watch mode
$ nest start --watch

# production mode
$ nest start --prod
```

<hr />

## **Docker**

The application uses Docker for running some examples of databases.

> Obs: Using the ".env.{database}.example" files you can copy the configuration found in them and place it in the ".env" file.

For using Postgres

```bash
$ sudo docker-compose up -d posgres
```

For using InfluxDB

```bash
$ sudo docker-compose up -d influxdb
```

<hr />

## **Sentry**

The app is also integrated with <a href="https://sentry.io/">Sentry</a>, allowing you to track exceptions and store them.

<hr>

## **License**

Hard Braking Zones API is [MIT licensed](LICENSE).
