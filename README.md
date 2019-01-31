# Graasp App Starter: React Framework

[![Codeship](https://app.codeship.com/projects/04f13a10-b05e-0136-09da-7a3da3243947/status?branch=master)](https://app.codeship.com/projects/310436)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2cfb916f3a1d4c0b8fec4634f84f5b93)](https://www.codacy.com/app/react-epfl/graasp-app-starter-react)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/2cfb916f3a1d4c0b8fec4634f84f5b93)](https://www.codacy.com/app/react-epfl/graasp-app-starter-react)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This is a starter repository for a Graasp application. This particular flavor of the starter
repository uses the React framework. It is an opinionated starter kit based on the `create-react-app`
package. Other flavors are coming.

## Getting Started

Fork this repo.

## Request Credentials

Currently, becoming a Graasp Developer and registering Graasp Apps is a manual process. Contact
juancarlos.farah@epfl.ch or andre.nogueira@epfl.ch to receive a `GRAASP_DEVELOPER_ID`. Every time
you want to release a new app, you will also have to request a `GRAASP_APP_ID`. This process is
being automated, but it's currently still in the works.

We will also give you AWS credentials, `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, which you
will need to deploy your application to the Graasp ecosystem. These keys are private, so you should
not share them with anyone.

## Environment Variables

To start developing locally, you should create a `.env.local` file in your root folder with the
following content:

```dotenv
REACT_APP_GRAASP_DEVELOPER_ID=
REACT_APP_GRAASP_APP_ID=
REACT_APP_GRAASP_DOMAIN=localhost
REACT_APP_HOST=
REACT_APP_VERSION=
REACT_APP_BASE=
```

Once you are ready to deploy your application to our development server, you will need to create
a `.env.dev` file in your root folder following the patter below. Replace the value between `<>`
with those that you received from our developers. Please make sure you do not commit or share the
values between `<>` with anyone, as they are confidential.

```dotenv
REACT_APP_GRAASP_DEVELOPER_ID=<REACT_APP_GRAASP_DEVELOPER_ID>
REACT_APP_GRAASP_APP_ID=<REACT_APP_GRAASP_APP_ID>
REACT_APP_GRAASP_DOMAIN=graasp.eu
REACT_APP_HOST=apps.dev.graasp.eu
REACT_APP_VERSION=latest
REACT_APP_BASE=//$REACT_APP_HOST/$REACT_APP_GRAASP_DEVELOPER_ID/$REACT_APP_GRAASP_APP_ID/$REACT_APP_VERSION/
NODE_ENV=production
BUCKET=graasp-apps-dev
AWS_DEFAULT_REGION=us-east-1
AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
```

Once you are ready to deploy your application to our production server, you will need to create
a `.env.prod` file in your root folder following the patter below. Replace the value between `<>`
with those that you received from our developers. Please make sure you do not commit or share the
values between `<>` with anyone, as they are confidential.

```dotenv
REACT_APP_GRAASP_DEVELOPER_ID=<REACT_APP_GRAASP_DEVELOPER_ID>
REACT_APP_GRAASP_APP_ID=<REACT_APP_GRAASP_APP_ID>
REACT_APP_GRAASP_DOMAIN=graasp.eu
REACT_APP_HOST=apps.graasp.eu
REACT_APP_VERSION=latest
REACT_APP_BASE=//$REACT_APP_HOST/$REACT_APP_GRAASP_DEVELOPER_ID/$REACT_APP_GRAASP_APP_ID/$REACT_APP_VERSION/
NODE_ENV=production
BUCKET=graasp-apps-prod
AWS_DEFAULT_REGION=us-east-1
AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
```

## Installing Dependencies

Make sure you have `node` and `yarn` installed on your local machine otherwise go
[here](https://changelog.com/posts/install-node-js-with-homebrew-on-os-x) and install them;
then run `yarn` from the project directory to install all dependencies.

## Starting the Server

Navigate to the cloned or forked project directory using the command line, type `npm start` and
the project will automatically run on `localhost:3000`.
