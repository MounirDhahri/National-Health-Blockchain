

<p align="center">
    <h3 align="center">National Health Blockchain<br></h3>
</p>


### What are using

* React 16
* Webpack 3
* React Router 4
* SASS
* Babel Cli
* Hot Module Reloading
* Jest 21
* Enzyme 3 for testing
* Node
* Express
* MongoDB
* Multichain



### Features

* Pay using a smart wallet or using money
* Your medical records are always close and authentic

### To run

* You'll need to have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed in your system.
* clone the project:

```
git clone git@github.com:MounirDhahri/Tunihack.git
```

* run and install the dependencies for each component:
###Server
```
cd server
npm install
npm start
```
###Client
```
cd client
npm install
npm start
```
###Mobile
```
cd mobile
npm install
react-native run-ios  // run-android

```
###Blockchain
you will need multichain in your cli
```
cd blockchain
multichaind NationalHealthBlockchain -daemon

```


* To Run the development server:

```
cd client
npm run dev
```

```
cd server
npm run dev
```


Open the web browser to `http://localhost:8888/`

### To test
To run unit tests:

```
npm test
```

Tests come bundled with:

* Jest
* Enzyme
* React Test Utils
* React Test Renderer

### To build the production package

```
npm run build
```

### Eslint
There is a `.eslint.yaml` config for eslint ready with React plugin.

To run linting, run:

```
npm run lint
```

### Notes on importing css styles
* styles having /src/ in their absolute path considered part of the application and exported as local css modules.
* other styles considered global styles used by components and included in the css bundle directly.

### Contribute
Please contribute to the project if you know how to make it better, including this README :)
