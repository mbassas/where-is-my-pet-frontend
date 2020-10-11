This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Runs the command:
```
react-app-rewired start
```
The page will automatically reload on saving due to the `react-app-rewired`.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />


### `yarn predeploy`

Runs the command:

```
 yarn build
```
It will automatically be triggered when running deploy script.


### `yarn deploy`

Runs the command:

```
gh-pages -d build
```
It must be executed in the master branch. It will automatically create an environment on github pages.