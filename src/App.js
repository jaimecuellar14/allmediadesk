import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect } from "react";

function App() {
  let term = " (5 + 8) * 3/8 +3 + (8-2)";
  term = term.replace(/ /g,'');
  let orderOfPrecedence = [];

  const checkIfNumber = (exp) =>{
    let numbers=[];
    [...exp].forEach((x)=>{
      if(!isNaN(x)){
        let intNumber = parseInt(x);
        numbers.push(intNumber);
      }
    });
    return numbers;
  }

  const executeExpression = (numbers, exec) => {
    if(exec===('+')){
      let result = numbers[0] + numbers[1];
     // console.log(result);
      return result;
    }
    if(exec===('-')){
      let result = numbers[0] - numbers[1];
     // console.log(result);
      return result;

    }
    if(exec===('*')){
      let result = numbers[0] * numbers[1];
     // console.log(result)
      return result;

    }
    if(exec===('/')){
      let result = numbers[0] / numbers[1];
     // console.log(result)
      return result;

    }
  }

  const checkExpression = (expression) => {
    if(expression.length>1&&isNaN(expression)){
      if(expression.includes('+')){
        console.log("addition");
        let numbers = checkIfNumber(expression);
        return executeExpression(numbers,'+');
      }
      else if(expression.includes("-")){
        console.log("substraction");
        let numbers = checkIfNumber(expression);
        return executeExpression(numbers,'-');
  
      }
      else if(expression.includes("*")){
        console.log("multiplaction");
        let numbers = checkIfNumber(expression);
        return executeExpression(numbers,'*');
  
      }
      else if(expression.includes("/")){
        console.log("division");
        let numbers = checkIfNumber(expression);
        return executeExpression(numbers,'/');
  
      }
      else{
        console.log("error");
      }
    }
    else{
      return expression;
    }
  }

  const getExpression = (expression) => {
    return checkExpression(expression);
  }
  const getExpressionInsideParentheses = (term) => {
    var newTxt = term.split('(');
    for (var i = 1; i < newTxt.length; i++) {
      //console.log(newTxt[i].split(')')[0]);
      //orderOfPrecedence.push(newTxt[i].split(')')[0]);
      return checkExpression(newTxt[i].split(')')[0]);
    }
  }

  const deleteOperation = (term, operationToDelete) =>{
    let newTerm = term.replace(operationToDelete,'');
    return newTerm;
  }
  const checkOperatorsOrder = (term) => {
    let expression = "";
    for(let i =0 ; i<term.length; i++){
      if(term[i]===('(')){
        expression=expression+term[i];
        for(let j=i+1;j<term.length;j++){
          if(term[j]!==")"){
            expression=expression+term[j];
          }
          if(term[j]===")"){
            expression=expression+term[j];
            orderOfPrecedence.push(expression);
            break;
          }
        }
        let newTerm = deleteOperation(term,expression);
        checkOperatorsOrder(newTerm);
        break;
      }
      if(term[i]==="*"){
        if(!isNaN(term[i-1])&&!isNaN(term[i+1])){
          let operation = term[i-1]+term[i]+term[i+1];
          orderOfPrecedence.push(operation);
          let newTerm = deleteOperation(term,operation);
          console.log(newTerm);
          checkOperatorsOrder(newTerm);
          break;
        }else{
          orderOfPrecedence.push("*");
          let newTerm = deleteOperation(term,'*');
          console.log(newTerm);
          checkOperatorsOrder(newTerm);
          break;
        }
      }
      if(term[i]==='/'){
        console.log("/")
        if(!isNaN(term[i-1])&&!isNaN(term[i+1])){
          let operation = term[i-1]+term[i]+term[i+1];
          orderOfPrecedence.push(operation);
          let newterm = deleteOperation(term,operation);
          checkOperatorsOrder(newterm);
          break;
        }
        else{
          let newTerm = deleteOperation(term,"/");
          orderOfPrecedence.push("/");
          checkOperatorsOrder(newTerm);
          break;
        }
      }
      if(term[i]==="+"){
        if(!isNaN(term[i-1])&&!isNaN(term[i+1])){
          let operation = term[i-1]+term[i]+term[i+1];
          let newTerm = deleteOperation(term,operation);
          orderOfPrecedence.push(operation);
          if(!isNaN(term[i+1])){
            orderOfPrecedence.push(term[i+1]);
          }
          console.log(newTerm);
          checkOperatorsOrder(newTerm);
          break;
        }else{
          let newTerm = deleteOperation(term,"+");
          orderOfPrecedence.push("+");
          console.log(newTerm);
          if(!isNaN(term[i+1])){
            orderOfPrecedence.push(term[i+1]);
          }
          checkOperatorsOrder(newTerm);
          console.log(term[i]);
          break;
        }
      }
      
    }
  }

  const calculate = () => {
    for(let i=0; i<orderOfPrecedence.length;i++){
      if(orderOfPrecedence[i].includes(")")){
        orderOfPrecedence[i]=getExpressionInsideParentheses(orderOfPrecedence[i])
      }
      else{
        orderOfPrecedence[i]=getExpression(orderOfPrecedence[i]);
      }
    }
    console.log(orderOfPrecedence);
  }
  const calculator = () =>{
    if(term.includes('(')){
      let countOpening  = term.split('').filter(x=>x=="(").length;
      let countClosing = term.split('').filter(x=>x==')').length;
      if(countOpening===countClosing){
        console.log("all cool");
        //getExpressionInsideParentheses(term);
      }
    }
    checkOperatorsOrder(term);
  }

  useEffect(()=>{
    calculator();
    console.log(orderOfPrecedence);
    calculate();
  });

  return (
    <div className="App">
      <p>All Media Desk test</p>
    </div>
  );
}

export default App;

