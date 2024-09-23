const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstNumber = '';
let secondNumber = '';
let result = '';
let selectedOperatorButton = null;
let newCalculation = false;

const updateDisplay = (value) => {
  display.value = value;
};

const clearCalculator = () => {
  currentInput = '';
  operator = '';
  firstNumber = '';
  secondNumber = '';
  result = '';
  newCalculation = false;
  updateDisplay('');
  if (selectedOperatorButton) {
    selectedOperatorButton.classList.remove('selected-operator');
  }
};

const calculateResult = () => {
  if (firstNumber !== '' && secondNumber !== '' && operator !== '') {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    
    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '×':
        result = num1 * num2;
        break;
      case '÷':
        result = num2 !== 0 ? num1 / num2 : 'Erro';
        break;
    }

    updateDisplay(result);
    firstNumber = result.toString(); // Armazena o resultado como o próximo "firstNumber"
    secondNumber = '';
    currentInput = '';
    operator = '';
    newCalculation = true;
    if (selectedOperatorButton) {
      selectedOperatorButton.classList.remove('selected-operator');
    }
  }
};

const markOperator = (button) => {
  if (selectedOperatorButton) {
    selectedOperatorButton.classList.remove('selected-operator');
  }
  selectedOperatorButton = button;
  selectedOperatorButton.classList.add('selected-operator');
};

document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => {
    if (newCalculation) {
      currentInput = '';
      newCalculation = false;
    }
    currentInput += button.textContent;
    updateDisplay(currentInput);
    if (selectedOperatorButton) {
      selectedOperatorButton.classList.remove('selected-operator');
    }
  });
});

document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => {
    if (currentInput !== '' || newCalculation) {
      if (firstNumber === '') {
        firstNumber = currentInput || result;
      } else if (operator !== '' && currentInput !== '') {
        secondNumber = currentInput;
        calculateResult();
      }
      operator = button.textContent;
      currentInput = '';
      markOperator(button); // Marca o operador selecionado
    }
  });
});

document.getElementById('equal-btn').addEventListener('click', () => {
  if (currentInput !== '') {
    secondNumber = currentInput;
    calculateResult();
  }
});

document.getElementById('clear').addEventListener('click', clearCalculator);

document.getElementById('backspace').addEventListener('click', () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
});
