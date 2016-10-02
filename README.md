# Zehut.me

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and uses [`custom-react-scripts`](https://github.com/kitze/create-react-app) for SASS support.

## Installation

```bash
npm install -g foreman
npm install
cd client && npm install
```

## Notes

Currently the build artifacts are being tracked, until I have the time to customize a heroku buildpack to run the nested `client` build. This could be solved by flattening the client/root (server) directories, but I like the separation of concerns (and packages) here.
