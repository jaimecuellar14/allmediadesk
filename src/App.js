import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from "react";

function App() {


  const checkExpression = (expression) => {
    if(expression.includes('+')){
      console.log("addition");
    }
    else if(expression.includes("-")){
      console.log("substraction");
    }
    else if(expression.includes("*")){
      console.log("multiplaction");
    }
    else if(expression.includes("/")){
      console.log("division");
    }
    else{
      console.log("error");
    }
  }

  const getExpressionInsideParentheses = (term) => {
    var newTxt = term.split('(');
    for (var i = 1; i < newTxt.length; i++) {
      console.log(newTxt[i].split(')')[0]);
      checkExpression(newTxt[i].split(')')[0]);

    }
  }

  const calculator = () =>{
    let term = "(5+8) * 3/8 + 3 + (8-2)";
    if(term.includes('(')){
      let countOpening  = term.split('').filter(x=>x=="(").length;
      let countClosing = term.split('').filter(x=>x==')').length;
      if(countOpening===countClosing){
        console.log("all cool");

        getExpressionInsideParentheses(term);
      }
    }
  }

  useEffect(()=>{
    calculator();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

