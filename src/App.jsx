import React, { useState, useContext } from 'react';
import "./App.css"
const CalculatorContext = React.createContext();

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);
    
    

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = evaluate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const evaluate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const clear = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const contextValue = {
    displayValue,
    inputDigit,
    inputDecimal,
    performOperation,
    clear,
  };

  return (
    <CalculatorContext.Provider value={contextValue}>
      <div className="calculator">
        <CalculatorDisplay />
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button className="key-clear" onClick={() => clear()}>AC</button>
            </div>
            <div className="digit-keys">
              {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map(digit => (
                <button key={digit} onClick={() => inputDigit(digit)}>{digit}</button>
              ))}
              <button onClick={() => inputDecimal()}>.</button>
            </div>
          </div>
          <div className="equal-key">
            <button style={{ "backgroundColor": "red" }} onClick={() => performOperation()}>=</button>
            <button onClick={() => performOperation('+')}>+</button>
            <button onClick={() => performOperation('-')}>-</button>
            <button onClick={() => performOperation('*')}>*</button>
            <button onClick={() => performOperation('/')}>/</button>
          </div>
        </div>
      </div>
    </CalculatorContext.Provider>
  );
};

const CalculatorDisplay = () => {
  const { displayValue } = useContext(CalculatorContext);
  return <div className="calculator-display">{displayValue}</div>;
};

export default Calculator;
