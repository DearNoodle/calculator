let calStates = ['default','first','operator','second']
let calState = calStates[1];
let display = document.querySelector('.display');
let isDecimal = false;
let firstNum = '';
let operator = '';
let secondNum = '';

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
        if (calState === 'default') {
            if (!isNaN(text) || text === '.') {
                firstNum += text;
                display.textContent = Number(firstNum);
                calState = calStates[1];                   
            }  
        } else if (calState === 'first') {
            if (!isNaN(text) || text === '.') {
                firstNum += text;
                display.textContent = Number(firstNum);               
            } else if (text !== '=') {
                operator = text;
                calState = calStates[2];      
            }  
        } else if (calState === 'operator') {
            if (!isNaN(text) || text === '.') {
                secondNum += text;
                display.textContent = Number(secondNum);
                calState = calStates[3];        
            } else if (text !== '=') {
                operator = text;
                display.textContent = display.textContent.slice(0, -1) + text;              
            } 
        } else if (calState === 'second') {
            if (!isNaN(text) || text === '.') {
                secondNum += text; 
                display.textContent = Number(secondNum);      
            } else if (text === '=') {
                display.textContent = calculate(Number(firstNum), Number(secondNum), operator);
                calState = calStates[0];
                firstNum = '';
                operator = '';
                secondNum = '';
            }
        }
    });
});