![](https://img.shields.io/static/v1?label=node&message=20.4.0&color=#00ff7f&style=plastic&logo=ghost
)
# Primepass APP

Developed with [React Native](https://reactnative.dev/) and [ReduxJS](https://redux.js.org/) as main. We also have two libs of our own such as [prime-ui](https://github.com/PrimePassCinema/prime-ui/pkgs/npm/prime-ui) and [prime-connector](https://github.com/PrimePassCinema/prime-connector).

Some of the external libs:

- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/en/main)
- [Styled Components](https://styled-components.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Moment](https://momentjs.com/)

## Summary
- [Installing](#installing)
- [Run project](#run-project)
    - [yarn start](#yarn-start)
    - [yarn android](#yarn-android)
    - [yarn ios](#yarn-ios)
- [adb port setup](#adb-port-setup)
- [Deploy Commands](#deploy-commands)
- [Contributing Guide](#contributing-guide)
  - [Commits](#commits)
  - [Open a Pull Request](#open-a-pull-request)
  - [Code Reviews](#code-reviews)
  - [Deploys](#deploys)


## Installing

To start and execute the app you neead to clone our repository before using the command bellow:
```
git clone git@github.com:PrimePassCinema/app.git
```

You will also need to set up a development environment, you can use this link to help you set up: [React Native Enviroment Setup](https://reactnative.dev/docs/environment-setup?guide=native)

It is also necessary to have installed:

- Install [NVM](https://github.com/nvm-sh/nvm) and later execute

```bash
nvm use
```

- Yarn
```bash
npm install --global yarn
```

## Run project
Open the project folder in your code editor.
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
```bash
yarn start
```

### `yarn android`

Compile the app under Android platform.
```bash
yarn android
```

### `yarn ios`

Before compile to IOS run this command.
```bash
npx pod-install
```

Compile the app under IOS platform.
```bash
yarn ios
```

### `adb port setup`

If you are using an mobile under usb port you need to configure the port 8081 for auto deploy after the bundle start:
```
adb reverse tcp:8081 tcp:8081
```
For Reactotron uses the port 9090 and execute this command:
```
adb reverse tcp:9090 tcp:9090
```
For debug the communication with the Firebase Analytics, we need to configure adb with the command bellow:
```
adb shell setprop debug.firebase.analytics.app com.cinema.primepass
```

## Deploy commands

Generate an APK of the project.
```bash
yarn android:apk
```

Generate a release of the project for android.
```bash
yarn android:release
```

Generate a release of the project for IOS.
```bash
yarn ios:beta
```

## Contributing Guide
In all projects, we work using a flow called **git flow**. As you can see in the image below, this is git flow, and to understand it better you can access this [link](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow).

![200x100](https://lh3.googleusercontent.com/70jaEZnESXQ6SssU5uI4yO62JBz6xq2sNrrz8bW_ap2CuWUaQlbKs3j6NyRJnvcvYwAugkW8WzNJX21dZ2SMd9O_1TTpKZT-FsBkYSPy4rUSpJSo2C-WPTaLc2jQ8ancyj1TetXQ)

### Commits
Whenever we make a commit, we follow a standard in which the commit must always be a short message of what you did in English and always written in the present tense. As shown in the example below:
![](https://cdn.discordapp.com/attachments/778306182372524052/1154884131528904755/image.png)
### Open a Pull Request

When you finish committing your changes or features, you can open a pull request and follow the following pattern:
- Short description of what you changed or added.
- Link to the task you were working on.

As in the example below:
![](https://cdn.discordapp.com/attachments/778306182372524052/1154889698116911104/image.png)

And then, within your task you include the link to your Pull Request.

### Code Reviews

Code reviews are done in Pull Request through comments, so be aware of your pull request for possible change requests or questions about your code.

### Deploys

Deploys are made on a specific day of the week, and usually the evening after the commercial period. Then a meeting takes place during this period with everyone involved in the code that will be deployed, to analyze whether everything will work correctly and whether it will generate new bugs.
