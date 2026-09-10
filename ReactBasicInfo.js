import React from "react";
import ReactDOM from "react-dom/client";

/** Creating Hello World program using React */
// const heading1 = React.createElement("h1", {id : "heading1"}, "Hello World! from React"); // first argument is tag name, second argument is attributes and third argument is content
// const container = document.getElementById("root"); 
// const root = ReactDOM.createRoot(container); // 
// root.render(heading1);
// console.log(heading1);


// Creating nested elements structure in React
/* <div id = "paernt">
        <div id = "child">
            <h1> I'm H1 Tag</h1>
            <h2> I'm H2 Tag</h2>
        </div>
</div> */
// const parent = React.createElement("div", {id : "parent"}, // ReactElement is an object which is created by React.createElement() method that browser can understand and render on the screen
//     React.createElement("div", {id : "child"},
//         [React.createElement("h1", {}, "I'm H1 Tag") , React.createElement("h2", {}, "I'm H2 Tag")]));
// console.log(parent);
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(parent);



/* <div id = "parent">
        <div id = "child1">
                <h1> I'm an H1 Tag </h1>
                <h2> I'm an H2 Tag </h2>
        </div>
        <div id = "child2">
                <h1> I'm an H1 Tag </h1>
                <h2> I'm an H2 Tag </h2>
        </div>
</div> */
// const parent1 = React.createElement("div", {id : "parent"}, 
//     [React.createElement("div", {id : "child1", key : "child1"},
//         [React.createElement("h1", {key: "child1-h1"}, "I'm an H1 Tag") , React.createElement("h2", {key: "child1-h2"}, "I'm an H2 Tag")]),
//     React.createElement("div", {id : "child2" , key : "child2"},
//         [React.createElement("h1", {key: "child2-h1"}, "I'm an H1 Tag") , React.createElement("h2", {key: "child2-h2"}, "I'm an H2 Tag")])]);
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(parent1);



// jsx => react element => javascript object => html element (DOM) => UI on the screen
// const heading = <h1 id = "jsxHeading" className = "heading"> Hello World! from JSX </h1>; // JSX is a syntax extension for JavaScript that looks similar to HTML and is used in React to describe the UI. It allows us to write HTML-like code within JavaScript, which makes it easier to create and manage UI components.
// console.log(heading);
const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);





// React component is a function that returns a React element (JSX) and can be reused in different parts of the application. 
// It can also accept props (properties) to make it more dynamic and flexible. 
// React components can be either functional components or class components, but functional components are more commonly used in modern React development due to their simplicity and performance benefits.
// Type of React components:
// 1. Functional components: These are simple JavaScript functions that return JSX. 
// They are stateless and do not have lifecycle methods. They are also known as stateless components.
// 2. Class components: These are ES6 classes that extend the React.Component class and have a render method that returns JSX. 
// They can have state and lifecycle methods, but they are less commonly used in modern React development due to their complexity and performance issues compared to functional components with hooks.
// example of functional component



function TitleComponent ()
{
    return <h1 id = "jsx-Heading" className = "heading"> Hello World! Using JSX 🚀 </h1>;
} 
const elem = <span> Hello World! from React Element </span>;
const title = 
(
    <h3 id= "title" className="title">
        {elem}
        Hello World! from Title Element
    </h3>
);


// Component composition is a technique in React where we can combine multiple components together to create a new component.
//  It allows us to build complex UIs by breaking them down into smaller, reusable components.
function HeadingComponent  ()
{
    return (
                <div id = "parent">
                    {100 + 200}
                    {title}
                    <TitleComponent />
                    {TitleComponent()}
                    <h1 id = "jsx-Heading"> Hello World! From Heading Component</h1>
                </div>
            );
}
root.render(<HeadingComponent />); // we can also write <HeadingComponent /> instead of <jsxHeading /> because the name of the function is HeadingComponent and it is a convention to start the name of the component with a capital letter.




