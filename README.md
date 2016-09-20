SKUKIT.COM
==========

[Skukit.com](http://skukit.com) is a global database of industrial products


# Installation

## Using Vagrant

```sh
git clone git@github.com:skukit/web.git
cd web
vagrant up
```
You can see launched application on http://192.168.33.10

## Using Docker

```sh
git clone git@github.com:skukit/web.git
cd web
docker build -t web .
docker run -d -p 3000:3000 --name webApp -v "$PWD":/usr/src/app web
```

You can see launched application on http://localhost:3000

## Deploy

A command beyond uses docker image with shipit-cli and launch deployment 

```
docker run -t --rm -v "$PWD":/usr/src/app -v ~/.ssh:/root/.ssh mickyto/shipit shipit staging deploy build 
```
You can launch the deployment without build image

```
docker run -t --rm -v "$PWD":/usr/src/app -v ~/.ssh:/root/.ssh mickyto/shipit shipit staging deploy restart 
```

## Test

First you need to link [selenium container](https://hub.docker.com/r/selenium/standalone-firefox/) to application container

```
docker run -d -P --name selenium --link webApp:app selenium/standalone-firefox
```

Then to run tests getting access to both application and selenium containers

```
docker run --rm --link selenium -v "$PWD":/usr/src/app -w /usr/src/app mickyto/nightwatch npm test
```


