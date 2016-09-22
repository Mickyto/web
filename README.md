SKUKIT.COM [![Build Status](https://travis-ci.org/skukit/web.svg?branch=master)](https://travis-ci.org/skukit/web)
==========

[Skukit.com](http://skukit.com) is a global database of industrial products


# Installation

## Using Vagrant

```sh
git clone https://github.com/skukit/web.git
cd web
vagrant up
```
You can see launched application on http://192.168.33.10

## Using Docker

```sh
git clone https://github.com/skukit/web.git
cd web
docker build -t web .
docker run -d -p 3000:3000 --name webApp web
```

You can see launched application on http://localhost:3000

## Deploy

For deployment we use [shipit](https://github.com/shipitjs/shipit). 

### Hard deploy

If you deploy first time or you want to rebuild image on server after deploy:

```
docker run -t --rm -v "$PWD"/shipitfile.js:/usr/src/app/shipitfile.js -v ~/.ssh:/root/.ssh mickyto/shipit shipit staging deploy build
```


### Soft deploy

If you need only deploy and restart container:

```
docker run -t --rm -v "$PWD"/shipitfile.js:/usr/src/app/shipitfile.js -v ~/.ssh:/root/.ssh mickyto/shipit shipit staging deploy restart
```

#### Shipit file customization

1. Create `shipitfile.dev.js`
2. Run `docker run -t --rm -v "$PWD"/shipitfile.dev.js:/usr/src/app/shipitfile.js -v ~/.ssh:/root/.ssh mickyto/shipit shipit staging deploy restart`


## Test

Link your app(`webApp` in our case) to [selenium](https://hub.docker.com/r/selenium/standalone-firefox/).

```
docker run -d --name selenium --link webApp:app selenium/standalone-firefox
```

Link `selenium` container and run tests with [nightwatch container](https://hub.docker.com/r/mickyto/nightwatch/).

```
docker run --rm --link selenium -v "$PWD":/usr/src/app -w /usr/src/app mickyto/nightwatch npm test
```


