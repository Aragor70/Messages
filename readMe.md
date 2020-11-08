# Messages Application

> Full stack javascript application.

## Usage
Rename "config/config.env.env" to "config/config.env" and update environment settings to your own.

## Install dependiences
```
npm install
```
Run App
```
npm run dev
```

- Version 1.0.0
- Licence BSD

created by mikey.prus@gmail.com

# Description
Messages is a MERN stack app designed for a community of users to share messages. Users who are registered and logged in can can search their friends and send the initial request. If you are as a friend, you will get the message. Users have a personal profile and can have unlimited friend list. User as a default has no special role. Project furthermore allows to exist web service and admin roles.

Messages web application it is a project containing js full stack of technologies.

The goal is to provide the web user application to connect with people using your own chat.

Application has the reusable template of backend. \
It is ready to use in development process.

## Technologies
This project use the javascript stack technologies styled with CSS.

> <b>backend:</b>\
express, node js, mongoose, mongoDB, jsonwebtoken, cookie-parcel, sendgrid - emailAPI.

> <b>frontend:</b>\
react js, redux js, redux-thunk, typescript, CSS, axios, moment.

## Subjects

This project covers the development subjects.

> user authentication (JWT lokalStorage + cookies),\
user role access,\
data management,\
database relations,\
error handling,\
user profile,\
user notifications,\
sending messages;

## Front-end development process
This part includes a pattern to create the application site. Process has the steps of installing app dependiences. I introduce the patterns, you can choose to the setup of the app.

In this project we would like to use the site of react, redux, typescript.

* Install front-end site inside the root folder of your app.
```
npx create-react-app my-app --template typescript
```
<i>Please be aware in the last part of the document I introduce the alternative packages we can use in this step.</i>

The next important dependience is a library to handle and organise the state of the components. 
* Install redux and redux-thunk middleware
```
npm install react-redux redux redux-thunk
```
Using redux we are allowed to manual dispatch the actions. While the redux store (the box or container of the app global state) get the update, it provides the new state to the components. It doesn not mutate the values.

<i>In the last part of the document I introduce the alternative library for the redux library.</i>

* Implement proxy API

The server listen and expect the requests on specyfic port, this is the reason to use the proxy.

We set it up with the client/package.json.

```
"proxy": "http://localhost:5000"
```
<i>In the last part of the document I introduce the alternative way to organise the proxy using middleware.</i>

## Alternatives in development process
In this part we look on the alternative ways you can go along with in React.

Javascript provides other libraries to use in the development process. \
Below I want to introduce some of them.

<i>ANY PACKAGES DO NOT INSTALL IT IF YOU CHOOSE THE FIRST OPTION</i>

* Start module packages.

<i>if your application does not need to use typescript module, please cut the template.</i>
```
npx create-react-app my-app
```
<i>Only in case when your application does not need the server side. I recommend to use the package named 'parcel'.
```
npm install parcel-bundler react react-dom typescript @types/node @types/react @types/react-dom @types/jest --save
```
<i>The reason is the size of node_modules.</i>

* The alternative of redux.

<i>The alternative and popular way of the redux library is a mobX. It is also javascript library. Its actions mutate the state of the componetns and it works is automatically.</i>
<i>We do not use it in this project.
I recommend to read and try.</i>

<i>https://www.npmjs.com/package/mobx</i>

* http-proxy-middleware

```
npm install http-proxy-middleware --save
```
To implement please read the address below.

<i>https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually</i>

