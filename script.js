let calStates = ['default','first','operator','second']
let calState = calStates[0];
let keyInput = document.querySelector('.display .input');
let equation = document.querySelector('.display .equation');
let isDecimal = false;
let firstNum = '';
let operator = '';
let secondNum = '';
let answer;

const calculate = (num1, num2, operator) => {
    return operator === '+' ? num1 + num2 :
           operator === '-' ? num1 - num2 :
           operator === 'x' ? num1 * num2 :
           operator === '÷' ? num1 / num2 :
           'Invalid operator';
}

document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
        text = button.innerText;
        switch (calState) {
            case 'default':
                if (!isNaN(text)) {
                    firstNum += text;
                    keyInput.textContent = firstNum;
                    calState = calStates[1]; 
                    equation.textContent = Number(firstNum);                
                }
                break;
            case 'first':
                if (!isNaN(text)) {
                    firstNum += text;
                    keyInput.textContent = firstNum;
                    equation.textContent = Number(firstNum);                
                } else if (text === '.' && !isDecimal) {
                    isDecimal = true;
                    firstNum += text;
                    keyInput.textContent = firstNum;
                } else if (text !== '=' && text !== '.') {
                    isDecimal = false;
                    operator = text;
                    keyInput.textContent = operator;
                    calState = calStates[2];
                    equation.textContent = Number(firstNum) + " " + operator;     
                }
                break;
            case 'operator':
                if (!isNaN(text)) {
                    secondNum += text;
                    keyInput.textContent = secondNum;
                    calState = calStates[3]; 
                    equation.textContent = Number(firstNum) + " " + operator + " " + Number(secondNum);        
                }
                break;
            case 'second':
                if (!isNaN(text)) {
                    secondNum += text; 
                    keyInput.textContent = secondNum;
                    equation.textContent = Number(firstNum) + " " + operator + " " + Number(secondNum)     
                } else if (text === '.' && !isDecimal) {
                    isDecimal = true;
                    secondNum += text;
                    keyInput.textContent = secondNum;
                } else if (text === '=' && text !== '.') {
                    answer = calculate(Number(firstNum), Number(secondNum), operator);
                    if (answer%1 != 0) {
                        answer = answer.toFixed(3);
                    }
                    keyInput.textContent = answer;
                    calState = calStates[0];
                    isDecimal = false;
                    firstNum = '';
                    operator = '';
                    secondNum = '';
                }
                break;
            default:
                break;
            }
    });
});