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

        
        if(this.currentOperandText.innerText == '' && this.previousOperandText.innerText != ''){
            this.currentOperand = this.previousOperandText.innerText.slice(0, -2);
            this.previousOperandText.innerText = '';
            return;
        }
    }

    appendNumber(number){
        if(this.currentOperand === 'Math Error'){
            this.clear();
            this.currentOperand += number;
            return;
        }

    
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
            case 'x':
                this.result = previous * current;
                break;

            case '÷':
            case '/':
                if(current === 0){
                    this.clear();
                    this.result = 'Math Error';
                    break;
                }
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

//adding keyboard input functionality
document.onkeydown = function(event) {

    console.log(event.keyCode);

    const notInRange = (event.keyCode < 8) || (event.keyCode > 8 && event.keyCode < 13) ||
    (event.keyCode > 13 && event.keyCode < 46) || (event.keyCode === 47) ||
    (event.keyCode > 57 && event.keyCode < 88) || (event.keyCode > 88 && event.keyCode < 96) || 
    (event.keyCode === 108) || (event.keyCode === 110) || (event.keyCode > 111 && event.keyCode < 187) || 
    (event.keyCode === 188) || (event.keyCode === 190) || (event.keyCode > 191);


    if(notInRange){
        console.log('notinrange');
        return;
    }

    if(event.keyCode === 13){
        calculator.compute();
        calculator.updateDisplay();
        return;
    }

    if(event.keyCode === 46){
        calculator.clear();
        calculator.updateDisplay();
        return;
    }

    if(event.keyCode === 8){
        calculator.delete();
        calculator.updateDisplay();
        return;
    }

    if(event.keyCode === 111 || event.keyCode === 191 || event.keyCode === 109 || event.keyCode === 189
        ||event.keyCode === 88 || event.keyCode === 106 || event.keyCode === 107 || event.keyCode === 187){
        calculator.chooseOperation(event.key);
        calculator.updateDisplay();
        return;
    }

    


	calculator.appendNumber(event.key);
    calculator.updateDisplay();
	
}