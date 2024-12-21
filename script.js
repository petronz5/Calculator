let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');


document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
      handleNumberInput(event.key);
    } else if (event.key === 'Backspace') {
      handleBackspace();
    }
  });

  function handleNumberInput(key) {
    buffer += key;
    screen.innerText = buffer;
  }
  
  
  function handleBackspace() {
    buffer = buffer.slice(0, -1);
    screen.innerText = buffer;
  }

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = '' + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }
            else{
                buffer = buffer.substring(0 , buffer.length - 1);
            }
            break;
        case '√': 
            buffer = Math.sqrt(parseFloat(buffer)).toString();
            break;
        case 'x²':
            buffer = (parseFloat(buffer) ** 2 ).toString();
            break;
        case 'x³': 
            buffer = (parseFloat(buffer) ** 3).toString();
            break;
        case 'x^y':
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}



function handleMath(symbol){
    if(buffer === '0'){
        return
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }else if(previousOperator === 'x^y'){
        runningTotal = Math.pow(runningTotal, intBuffer);
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }
    else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}

init();