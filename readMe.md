<img src="./typesReadMe.png" width="100%" />

# Types - Messages Application

The Full stack MERN application with typescript and mongoDB.

Backend Node js with express js.
Frontend site contains React and typescript, redux, thunk middleware and CSS.

## Usage
Rename "config/config.env.env" to "config/config.env" and update environment settings to your own.

## Install dependiences
``` bash
npm install
```
Run App
``` bash
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


As optional - To run the application in dev mode using not two terminals but just one we need to add the script into the <i>package.json</i> in Messages folder.

In this project we would like to use the site of react, redux, typescript.

* Install front-end site inside the root folder of your app.
``` bash
npx create-react-app my-app --template typescript
```
<i>Please be aware I introduce the alternative packages we can use in this step. Look on the last part of the document.</i>

The next important dependience is a library to handle and organise the state of the components. 
* Install redux and redux-thunk middleware
``` bash
npm install react-redux redux redux-thunk redux-devtools-extension @types/react-redux @types/redux @types/redux-thunk --save
```
Using redux we are allowed to manual dispatch the actions. While the redux store (the box or container of the app global state) get the update, it provides the new state to the components. It doesn not mutate the values.

<i>I introduce the alternative library of the redux library. Look on the last part of the document.</i>

* Implement proxy API

The server listen and expect the requests on specyfic port, this is the reason to use the proxy.

We set it up with the client/package.json.

``` json
"proxy": "http://localhost:5000"
```
<i>I introduce the alternative way to organise the proxy using middleware. Look on the last part of the document </i>


## Alternatives in development process
In this part we look on the alternative ways you can go along with in React.

Javascript provides other libraries to use in the development process. \
Below I want to introduce some of them.

<i>IT IF YOU HAVE CHOOSEN THE FIRST OPTION, DO NOT INSTALL PACKAGES FROM THIS PART </i>

* Start module packages.

<i>if your application does not need to use typescript module, please cut the template.</i>
``` bash
npx create-react-app my-app
``` 
<i>Only in case when your application does not need the server side. I recommend to use the package named 'parcel'.
``` bash
npm install parcel-bundler react react-dom typescript @types/node @types/react @types/react-dom @types/jest --save
``` 
<i>The reason is the size of node_modules.</i>

* The alternative of redux.

<i>The alternative and popular way of the redux library is a mobX. It is also javascript library. Its actions mutate the state of the componetns and it works is automatically.</i>
<i>We do not use it in this project.
I recommend to read and try.</i>

[MobX documentation](https://www.npmjs.com/package/mobx
"MobX library documentation address")

* http-proxy-middleware

``` bash
npm install http-proxy-middleware --save
```
To implement please read the address below.

[Http proxy middleware documentation](https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
"Proxy documentation address")

___
