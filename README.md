<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
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
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# 🧿 Clean Architecture with NestJS
- [Website Project](https://clean-architecture-nestjs-ms.vercel.app/api)  
[https://clean-architecture-nestjs-ms.vercel.app/api](https://clean-architecture-nestjs-ms.vercel.app/api){:target="_blank"}

This project implements **Clean Architecture** using the NestJS framework. The structure ensures a clear separation of concerns by organizing code into layers (Application, Domain, Infrastructure) and modules for scalability and maintainability.

This project is configured to support the following database connections:

- ### **Products Module**
    #### **The products module supports multiple database solutions:**
  - PostgreSQL using the `pg` library
  - SQL Server using the `mssql` library
  - MySQL using the `mysql2` library
  - MongoDB using `mongoose`
  - TypeORM for Object Relational Mapping (`ORM`)
  - Prisma as a modern `ORM` for database access
- ### **Users Module**
  - The users module is implemented using `Prisma` for database management.

## 🛢️ Configure Database
Create the database with the following tables and your attributes

```sql
CREATE TABLE product (
    id_product INT AUTO_INCREMENT PRIMARY KEY, -- Use SERIAL to create in PostgreSQL.
    code VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255),
    iva NUMERIC(10,2) NOT NULL,
    mark VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    percentage_increment NUMERIC(10,2) NOT NULL,
    public_price NUMERIC(10,2),
    quantity INT NOT NULL,
    supplier_price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY, -- Use SERIAL to create in PostgreSQL.
    address VARCHAR(100) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    firstname VARCHAR(100) NOT NULL,
    identification VARCHAR(13) NOT NULL,
    lastname VARCHAR(60) NOT NULL,
    password TEXT NOT NULL,
    phone VARCHAR(15) NOT NULL,
    token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

```


## 📂 Project Structure

```aiignore
📂clean-architecture-nestjs/
├──📂src/
│   ├──📂errors/               # Configuraciones para manejar errores
│   ├──📂modules/
│   │   ├──📂products/         # Módulo de productos
│   │   │   ├──📂application/
│   │   │   │   ├──📂mappers/
│   │   │   │   │   └──📜product.mapper.ts
│   │   │   │   ├──📂service/
│   │   │   │   │   └──📜product-use-case.service.ts
│   │   │   │   └──📂usecase/
│   │   │   │       └──📜product-use-case.interfacece.ts
│   │   │   ├──📂domain/
│   │   │   │   ├──📂contract/
│   │   │   │   │   └──📜product.repository.interface.ts
│   │   │   │   └──📂dto/
│   │   │   │       ├──📂request/
│   │   │   │       │   └──📜product.request.ts
│   │   │   │       ├──📂response/
│   │   │   │       │   └──📜product.response.ts
│   │   │   │       └──📂model/
│   │   │   │           └──📜product.model.ts
│   │   │   └──📂infrastructure/
│   │   │       ├──📂adapters/
│   │   │       │   └──📜product.repository.interface.ts
│   │   │       ├──📂contracts/
│   │   │       │   └──📜product.repository.interface.ts
│   │   │       ├──📂controller/
│   │   │       │   └──📜product.repository.interface.ts
│   │   │       ├──📂middlewares/
│   │   │       │   └──📜product.repository.interface.ts
│   │   │       ├──📂models/
│   │   │       │   └──📂entities/
│   │   │       │       └──📜product.entity.ts
│   │   │       ├──📂module/
│   │   │       │   ├──📜product.module.postgresql.ts
│   │   │       │   ├──📜product.module.mysql.ts
│   │   │       │   ├──📜product.module.prisma.ts
│   │   │       │   └──📜add-others.ts
│   │   │       └──📂repositories/
│   │   │           ├──📂mysql/
│   │   │           │   └──📂repository/
│   │   │           │       └──📜mysql-product.repository.ts
│   │   │           ├──📂prisma/
│   │   │           │   └──📂repository/
│   │   │           │       └──📜prisma-product.repository.ts
│   │   │           ├──📂postgresql/
│   │   │           │   └──📂repository/
│   │   │           │       └──📜pg-product.repository.ts
│   │   │           └──📂add-others/
│   │   └──📂users/            # Agregar estructura similar al módulo de productos
│   │       ├──📂application/...
│   │       ├──📂domain/...
│   │       └──📂infrastructure/..
│   ├──📂settings/
│   │   ├──📜envs.ts
│   │   └──📜index.ts
│   └──📂shared/
│       ├──📂database/
│       │   ├──📜mysql.service.ts
│       │   ├──📜postgres.service.ts
│       │   └──📜add-others.ts
│       ├──📂prisma/
│       │   ├──📂migrations/
│       │   ├──📜prisma.service.ts
│       │   └── ▲ schema.prisma
│       └──📂typeorm/
│           └──📜typeorm.database.ts
├──📜app.module.ts
├──📜main.ts
└──📂test/
└──.env
```

### 1. **Errors** (`/src/errors`)
This folder contains global error-handling utilities to manage application errors effectively.

---

### 2. **Modules** (`/src/modules`)
Modules represent the core business domains (e.g., `products`, `users`) and are structured into three layers:

#### a. **Application Layer**
Handles business logic, use cases, and mappers. It interacts with the domain layer and infrastructure.

- **Mappers:** Converts entities and models between layers (e.g., `product.mapper.ts`).
- **Service:** Implements use cases (`product-use-case.service.ts`).
- **Use Case:** Defines interfaces for services.

#### b. **Domain Layer**
Defines business rules and core concepts:

- **Contracts:** Interfaces to define repository behaviors.
- **DTOs:** Data Transfer Objects for request/response handling.
- **Models:** Business models encapsulating core logic.

#### c. **Infrastructure Layer**
Handles database operations, external services, and frameworks:

- **Adapters:** Bridges domain and infrastructure.
- **Controller:** Exposes endpoints to interact with application logic.
- **Entities:** Defines database schemas.
- **Repositories:** Implements persistence logic for databases (e.g., MySQL, PostgreSQL, Prisma).

---

### 3. **Settings** (`/src/settings`)
Contains environment configuration files and settings for different environments (`envs.ts`).

---

### 4. **Shared** (`/src/shared`)
Reusable utilities and services:

- **Database:** Provides database connection services (e.g., `mysql.service.ts`, `prisma.service.ts`).
- **Prisma/TypeORM:** Configurations for ORM tools.

---

### 5. **Application Root**
- **`app.module.ts`:** Entry point for module registration.
- **`main.ts`:** Bootstrap file for application initialization.

---

## 🔐 Environment Variables Configuration (`.env`)

This document explains the purpose of each environment variable used in the application. These variables ensure proper configuration and connection to external services and databases.

### General Variables

- **`PORT`**: Specifies the port on which the application will run.

- **`SECRET_KEY`**: A secret key used for token generation and application security.

- **`PERCENTAGE_INCREMENT`**: Represents a percentage value for specific application logic.


## Database Variables

### MongoDB

- **`MONGODB_URI`**: Connection string to connect to a MongoDB database cluster.


### PostgreSQL

- **`DB_USERNAME`**: The username for the PostgreSQL database.

- **`DB_PASSWORD`**: The password for the PostgreSQL database.

- **`DB_DATABASE`**: The name of the PostgreSQL database.

- **`DB_HOSTNAME`**: The hostname for the PostgreSQL database server.

- **`DB_PORT`**: The port for the PostgreSQL database server.


### MySQL

- **`MYSQL_HOSTNAME`**: The hostname for the MySQL database server.

- **`MYSQL_PORT`**: The port for the MySQL database server.

- **`MYSQL_DATABASE`**: The name of the MySQL database.

- **`MYSQL_USERNAME`**: The username for the MySQL database.

- **`MYSQL_PASSWORD`**: The password for the MySQL database.


### SQL Server

- **`SQLSERVER_HOSTNAME`**: The hostname for the SQL Server database.

- **`SQLSERVER_PORT`**: The port for the SQL Server database.

- **`SQLSERVER_DATABASE`**: The name of the SQL Server database.

- **`SQLSERVER_USERNAME`**: The username for the SQL Server database.

- **`SQLSERVER_PASSWORD`**: The password for the SQL Server database.


### Prisma-Specific

- **`DATABASE_URL`**: Connection string for Prisma, supporting PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, or CockroachDB. It is used by Prisma to interact with the database. Refer to the Prisma documentation for more details:

### Database Configuration with TypeORM

This project uses TypeORM to manage database connections. TypeORM supports multiple database systems such as PostgreSQL, MySQL, SQLite, and more.

**Basic Configuration Example**
```typescript
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { envs } from 'src/settings';

export const CONFIG_DATABASE_TYPEORM = async () => {
  const logger = new Logger('TypeORM');
  try {
    logger.log('🛢️  Using TypeORM to connect database 🎉!');
    return await TypeOrmModule.forRoot({
      type: 'postgres', // Change to the desired database type (mysql, sqlite, etc.)
      host: envs.db_hostname, // Database host address
      port: envs.db_port, // Database port
      username: envs.db_username, // Username
      password: envs.db_password, // Password
      database: envs.db_database, // Database name
      autoLoadEntities: true,
    });
  } catch (error) {
    logger.error('Error connecting to MySQL database:', error.message);
    throw new Error('Failed to connect to MySQL database');
  }
};
```

- Modify the type field:
  - Change the type value to the desired database system, such as:
      - `mysql`
      - `sqlite`
      - `mariadb`
      - `postgres`

**Update the credentials:** 
Adjust fields like `host`, `port`, `username`, `password`, and `database` according to your database setup.
---

### Example Module: **Products**

#### Application Layer:
- `product.mapper.ts`: Converts data between domain and infrastructure layers.
- `product-use-case.service.ts`: Implements product-specific business logic.

#### Domain Layer:
- **Contracts:** `product.repository.interface.ts` defines the repository contract.
- **DTOs:**
    - `request/product.request.ts` handles incoming data.
    - `response/product.response.ts` handles outgoing data.
- **Models:** `product.model.ts` defines the product entity's business logic.

#### Infrastructure Layer:
- **Adapters:** Adapts the product repository interface to specific implementations.
- **Repositories:**
    - `mysql-product.repository.ts`
    - `prisma-product.repository.ts`
    - `pg-product.repository.ts`
- **Controller:** Manages API requests for products.

---

### 🎯 Clean Architecture Principles

1. **Independence:** The application layer is independent of the infrastructure layer.
2. **Abstraction:** Use of interfaces to decouple logic.
3. **Testability:** Layers can be tested independently.
4. **Scalability:** Modules can be expanded or replaced without affecting other layers.

---

## Clone repository

```bash
$ git clone https://github.com/gitmariosalazar/clean-architecture-nestjs.git
```

## Project setup

```bash
$ cd clean-architecture-nestjs
$ npm install
```

## Run prisma
- If you want to use Prisma, run the following command:
```bash
$ npm run prisma:generate 
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```
- WebSite Local - [http://localhost:3000/api](http://localhost:3000/api){:target="_blank"}
## Run tests  (Not implemented yet)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Stay in touch

- Author - [Mario Salazar](https://mssalazar.com)
- Website - [https://mssalazar.com](https://mssalazar.com)
- WhatsApp - [Send message](https://wa.link/pl94td)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

