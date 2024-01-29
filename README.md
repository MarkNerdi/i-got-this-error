# i-got-this-error

## About

This is a online bucketlist platform to keep track of all HTTP status codes a developer encounters during their career, look at other developers profiles and compare themself.


## Stack

- Typescript
- Sveltekit
- Vite
- MongoDB
- ShadCN


## Installation and setup

#### Prerequisites

- `yarn` needs to be installed
- Have a MongoDB (either locally or hosted) and make sure you can connect to it locally
- Have a Github OAuth app created on your Github profile

### Setup

Create a `.env` file in the root folder with the following structure:

```
PRIVATE_DB_CONNECTION_STRING=
PRIVATE_DB_NAME=

# Auth.js secret
AUTH_SECRET=

# Github client OAuth credentials
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

After the intial run of:

```
yarn 
```


run the start command:

```
yarn dev
```

and the web application is reachable on `http:localhost:5173`
