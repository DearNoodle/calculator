let calStates = ['default','first','operator','second']
let calState = calStates[0];
let keyInput = document.querySelector('.display .input');
let equation = document.querySelector('.display .equation');
let isNum1Decimal = false;
let isNum2Decimal = false;
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
        switch (text) {
            case 'CLEAR':
                equation.textContent = '0';
                keyInput.textContent = '';
                calState = calStates[0];
                isNum1Decimal = false;
                isNum2Decimal = false;
                firstNum = '';
                operator = '';
                secondNum = '';
                break;

            default:
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
                        } else if (text === 'DELETE') {
                            if (firstNum[firstNum.length-1] === '.') {
                                isNum1Decimal = false;
                            }
                            firstNum = firstNum.slice(0,-1);
                            keyInput.textContent = firstNum;
                            equation.textContent = Number(firstNum);
                            if (firstNum.length === 0) {
                                calState = calStates[0];
                            } 
                        } else if (text === '.' && !isNum1Decimal) {
                            isNum1Decimal = true;
                            firstNum += text;
                            keyInput.textContent = firstNum;
                        } else if (text !== '=' && text !== '.') {
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
                        } else if (text === 'DELETE') {
                            operator = '';
                            keyInput.textContent = firstNum;
                            calState = calStates[1];
                            equation.textContent = Number(firstNum);
                        }
                        break;

                    case 'second':
                        if (!isNaN(text)) {
                            secondNum += text; 
                            keyInput.textContent = secondNum;
                            equation.textContent = Number(firstNum) + " " + operator + " " + Number(secondNum);     
                        } else if (text === 'DELETE') {
                            if (secondNum[secondNum.length-1] === '.') {
                                isNum2Decimal = false;
                            }
                            secondNum = secondNum.slice(0,-1);
                            if (secondNum.length === 0) {
                                calState = calStates[2];
                                keyInput.textContent = operator;
                                equation.textContent = Number(firstNum) + " " + operator;
                            } else {
                                keyInput.textContent = secondNum;
                                equation.textContent = Number(firstNum) + " " + operator + " " + Number(secondNum); 
                            }
                        } else if (text === '.' && !isNum2Decimal) {
                            isNum2Decimal = true;
                            secondNum += text;
                            keyInput.textContent = secondNum;
                        } else if (text === '=' && text !== '.') {
                            answer = calculate(Number(firstNum), Number(secondNum), operator);
                            if (answer%1 != 0) {
                                answer = answer.toFixed(3);
                            }
                            keyInput.textContent = answer;
                            calState = calStates[0];
                            isNum1Decimal = false;
                            isNum2Decimal = false;
                            firstNum = '';
                            operator = '';
                            secondNum = '';
                        }
                        break;

                    default:
                        break;
                    }
                break;
        }


    });
});