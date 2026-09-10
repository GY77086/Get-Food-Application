# This is my React Frontend Folder doc file (For FoodOrdering Project ...)

## Author: dbugger01

## Parcel

- It create Dev Build
- It launch local server
- It support HMR (Hot Module Replacement)
- It use File Watcing Algorithm (Written in C ++)
- It Create - Faster Build
- It perform image optimization
- It minify our file
- It support bundling and compressing of file
- It support code splitting , consistent hashing
- It also support differential bundling (for smooth app executiont in older browser)
- It perform diagnostic and support error handling as well
- It provide hosting of app in HTTPs mode and also support tree shaking (remove unused code)
- It create different dev production bundle

## Two types of Export/Import

- Default Exeport/Import
  - syntax:
    - export default component;
    - import component from "path";
- Named Export/Import
  - syntax:
    - export const component;
    - export {componrnt} from "pathh"

## React Hooks: Normal JS utility function

- one of the important utility function of react
  - useState () : use to generate super powerful variables in react
  - useEffect () :

## 2 Types of Routing in Web App

- Client Side Routing
- Server Side Routing

## Redux Toolkit

- Install @reduxjs/toolkit and reac-redux
- Build our store
- Connect our store to app
- Create Slice (Cart Slice)
- Dispatch (Action)
- Selector

## Types of testing (developer)

- Unit Testing
- Integeration Testing
- End to End Testing (e2e testing)

## Setting up Testing in our app

- Installed React Testing Library using command as : npm install -D @testing-library/dom
- Installed jest using command as : npm  install -D jest
- Installed Babel dependencies (from jest website -> get started  under "using babel" section) by copying/using command as : npm install --save-dev babel-jest @babel/core @babel/preset-env
- Write command as : npm run test to check that everything is fine or not if we get this message like : "No tests found, exiting with code 1" that means everyhting is fine
- Configured Babel by making "babel.config.cjs file" and added configuration code from jest website in "get started" under "using babel" section to the file
- Configured Parcel by making ".parcelrc" and added configuration code from parcel documentation website under javascript's "Usage with other tools" section to disable default babel transpilation.
- Created jest.config.js file by using command as : npx crate-jest (can be changed with release of newer version) so after pressing enter this command will ask cofiguration question
- Installed jsdom library using command as : npm install -D jest-environment-jsdom
- Installed @babel/preset-react library to make JSX work in test cases using command as : npm install -D @babel/preset-react
- Installed @testing-library/jest-dom using command as : npm install -D @testing-library/jest-dom
