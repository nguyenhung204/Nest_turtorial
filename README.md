<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

The project is built using a combination of popular technologies:

NestJS: NestJS is a TypeScript framework for building modern, scalable Node.js applications. It provides a structured and organized approach to development, promoting clean code and maintainability.

MongoDB: MongoDB is a NoSQL database that stores data in JSON-like documents. It offers flexibility, scalability, and high performance, making it a suitable choice for modern web applications.

Mongoose: Mongoose is an Object Document Mapper (ODM) for Node.js that provides a higher-level abstraction over MongoDB. It simplifies data modeling, queries, and operations, making it easier to work with MongoDB data in Node.js applications.

JWT (JSON Web Token): JWT is an authentication standard that allows secure transmission of user identity information between applications. It enables stateless authentication and authorization, making it a popular choice for web APIs.

Passport: Passport is an authentication middleware for Node.js that simplifies the process of implementing user authentication and authorization. It provides strategies for various authentication methods, including JWT, social login, and local authentication.

Google API: The Google API suite provides access to a wide range of Google services, including Google Search, Google Maps, and Google Analytics. The project may utilize the Google API for user authentication (Google Login) or other functionalities.

Facebook API: The Facebook API allows integration with Facebook services, such as user authentication (Facebook Login), social sharing, and accessing user data. The project may leverage the Facebook API for social login or other functionalities.

WebSocket: WebSocket is a communication protocol that enables real-time two-way communication between a client (web browser) and a server. It allows for seamless and responsive data exchange, making it ideal for applications like chat, live updates, and multiplayer gaming.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode with hot reload
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Feature

CRUD Operations: The application supports Create, Read, Update, and Delete (CRUD) operations for data management.

JWT and Passport Authentication: User authentication is implemented using JSON Web Tokens (JWT) and Passport, ensuring secure access to authorized resources.

AccessToken and RefreshToken: The system utilizes AccessTokens for regular API access and RefreshTokens to refresh expired AccessTokens, maintaining seamless user sessions.

Google and Facebook Login with Passport: Users can log in using their Google or Facebook accounts, leveraging Passport for social authentication.

Swagger Documentation: Comprehensive Swagger documentation is provided, facilitating API exploration and integration.

Real-time WebSocket Chat: The application features real-time WebSocket chat, enabling instant communication among users.

Don't forget config .env file, host and port database

If you find any bugs or have any contributions, please feel free to create a pull request for me. Thank you <3
