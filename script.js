class Calculator{
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }
    
    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.previousOperandText.innerText = '';
        this.currentOperandText.innerText = '';
        this.operation = undefined;
        this.result = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(this.currentOperand.length >= 20){
            alert('Number Overflow');
            return;
        }

        if(number === '.'){
            if(this.currentOperand.includes('.')){
                return;
            }
        }
        
        this.currentOperand += number;
    }

    chooseOperation(operation){

        if(this.previousOperandText.innerText !== ''){
            this.compute();
            previousOperandText.innerText = this.result + " " + operation;
            this.currentOperand = '';
            this.updateDisplay();
            this.operation = operation;
            return;
        }


        this.operation = operation;
        
        let operationExist = (this.previousOperandText.innerText.includes('+') || this.previousOperandText.innerText.includes('-') 
        ||this.previousOperandText.innerText.includes('÷') || this.previousOperandText.innerText.includes('×'))

        if(operationExist){
            return;
        }

        this.previousOperandText.innerText = this.currentOperand + " " + operation;
        this.currentOperand = '';
    }
    
    compute(){


        const current = parseFloat(this.currentOperand);
        const previous = parseFloat(this.previousOperandText.innerText.slice(0, -2));

        if(isNaN(current) || isNaN(previous)){
            return;
        }


        switch(this.operation){
            case '+':
                this.result = current + previous;
                break;

            case '-':
                this.result = previous - current;
                break;

            case '×':
                this.result = previous * current;
                break;

            case '÷':
                this.result = previous / current;
                break;

            default:
                return;
        }

        this.currentOperand = this.result;
        this.operation = undefined;
        this.previousOperandText.innerText = '';
    }

    updateDisplay(){
        this.currentOperandText.innerText = this.currentOperand;
    }
}


const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);

const allClearButton = document.querySelector(`[data-all-clear]`);
const deleteButton = document.querySelector(`[data-delete]`);
const equalsButton = document.querySelector(`[data-equals]`);

const currentOperandText = document.querySelector('.currentOperand');
const previousOperandText = document.querySelector('.previousOperand');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(div => {
    div.addEventListener('click', () => {
        calculator.appendNumber(div.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(div => {
    div.addEventListener('click', () => {
        calculator.chooseOperation(div.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})


function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function modulus(a, b){
    return a % b;
}
