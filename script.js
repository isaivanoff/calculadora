const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstNumber = '';
let secondNumber = '';
let selectedOperatorButton = null;

const updateDisplay = (value) => {
  display.value = value;
};

const clearCalculator = () => {
  currentInput = '';
  operator = '';
  firstNumber = '';
  secondNumber = '';
  updateDisplay('');
  if (selectedOperatorButton) {
    selectedOperatorButton.classList.remove('selected-operator');
  }
};

const calculateResult = () => {
  if (firstNumber !== '' && secondNumber !== '' && operator !== '') {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    let result;

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '∗':
        result = num1 * num2;
        break;
      case '/':
        result = num2 !== 0 ? num1 / num2 : 'Erro';
        break;
    }

    updateDisplay(result);
    firstNumber = result.toString();
    secondNumber = '';
    operator = '';
    currentInput = '';
    if (selectedOperatorButton) {
      selectedOperatorButton.classList.remove('selected-operator');
    }
  }
};

// Função para desmarcar o operador anterior e marcar o atual
const markOperator = (button) => {
  if (selectedOperatorButton) {
    selectedOperatorButton.classList.remove('selected-operator');
  }
  selectedOperatorButton = button;
  selectedOperatorButton.classList.add('selected-operator');
};

document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => {
    currentInput += button.textContent;
    updateDisplay(currentInput);
    if (selectedOperatorButton) {
      selectedOperatorButton.classList.remove('selected-operator');
    }
  });
});

document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => {
    if (currentInput !== '') {
      if (firstNumber === '') {
        firstNumber = currentInput;
      } else if (operator !== '') {
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
