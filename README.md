Reproduction setup:

Have Java JRE installed before running `yarn install`.

You might also need AWS credentials available in your environment, via env vars or a default profile. This example doesn't deploy anything but I think Serverless likes to have them available.

Postinstall script will install local Dynamodb and setup Prisma.

Create the database:

```
CREATE ROLE foo WITH PASSWORD 'foo';
CREATE DATABASE foo;
GRANT ALL PRIVILEGES ON DATABASE foo TO foo;
ALTER ROLE "foo" WITH LOGIN CREATEDB;
```

Run `yarn install` and `yarn dev` in `/.backend` to run the Serverless backend.

Run `yarn install` `yarn dev` in `./app` to run client.
