# Zehut.me

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and uses [`custom-react-scripts`](https://github.com/kitze/create-react-app) for SASS support.

## Installation

```bash
npm install -g foreman
npm install
cd client && npm install
```

## Notes

The [`build`](https://github.com/zehutsf/zehut.me/tree/build) branch is what is used to deploy to Heroku. It contains the static build artifacts. The need to commit build files at all can be fixed by customizing a heroku buildpack, or flattening the client/root (server) directories.
