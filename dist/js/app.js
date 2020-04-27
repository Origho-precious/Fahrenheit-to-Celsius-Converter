
// UI Variables
const welcomeMsg = document.querySelector('#greeting'),
      userName = document.querySelector('#user'),
      inputLabel = document.querySelector('#input-label'),
      input = document.querySelector('#name-input'),
      form = document.querySelector('.form-group'),
      formBtn = document.querySelector('#submit-btn'),
      loader = document.querySelector('#loader'),
      fromConvert = document.querySelector('#temp-from'),
      toConvert = document.querySelector('#temp-to'),
      result = document.querySelector('.result'),
      modal = document.querySelector('.modal'),
      exitBtn = document.querySelector('.result button')
      


    // Hide Welcome msg and Loader
    welcomeMsg.style.display = 'none';
    loader.style.display = 'none';
    result.style.display = 'none';
    modal.style.display = 'none';


// Event function
loadEventListeners();

// All Eventlisteners
function loadEventListeners(){
    // Get UserName and Change Form Input
    form.addEventListener('submit', getName);
    // Get Convert
    formBtn.addEventListener('click', getConvert);
    // Exit Modal
    exitBtn.addEventListener('click', exitModal);
}

let select;

// Get UserName
function getName(e){
    // validate input
    if(input.value === ''){
        // Give User feedback
        setMessage('Please enter your Name!', 'red')
    } else{
        input.disabled = true;
        setMessage('Success!', 'yellow')

        // Initialize Loading
        setTimeout(function(){
            loader.style.display = 'block';
        }, 1000);

        // Set Interval Before Changing Input
        setTimeout(function(){
            loader.style.display = 'none';
            // Set username
            userName.textContent = input.value;
            // Show Welcome message
            welcomeMsg.style.display = 'block';
            
            // Change Form data
            inputLabel.textContent = 'What are you converting from?';
            // Create Select form
            select = document.createElement('select');
            // Add Class
            select.className = 'form-select';
            // Add Options to select
            const opt1 = document.createElement('option'),
                  opt2 = document.createElement('option');
            // Add content to options
            opt1.textContent = 'Fahrenheit to Celsius';
            opt1.setAttribute('value', 'F-C')
            opt2.textContent = 'Celsius to Fahrenheit';
            opt2.setAttribute('value', 'C-F')
            // Append Options to select element
            select.appendChild(opt1);
            select.appendChild(opt2);
        
            // Replace Input With Select
            input.replaceWith(select);

            // Add class to btn
            formBtn.className = 'calc-btn';
            // Change type
            formBtn.setAttribute('type', 'button');
        }, 3000);

    }
    e.preventDefault();
}

let numInput;

// Get Convert
function getConvert(){
    // Check for Calc-btn Class
    if(formBtn.classList.contains('calc-btn')){
        let convert = select;
            convert = convert.options[convert.selectedIndex];

        formBtn.style.display = 'none'

        // Initialize Loading
        setTimeout(function(){
            loader.style.display = 'block';
        }, 1000);

        // Set Interval Before Changing Input
        setTimeout(function(){
            loader.style.display = 'none';
            
            // Change Form data
            if(convert.value === 'F-C'){
                inputLabel.textContent = 'Enter Temperature';
                // Create Input form
                numInput = document.createElement('input');
                // Add Class
                numInput.id = 'num-input';
                // Add content to options
                numInput.setAttribute('type', 'number')
                numInput.setAttribute('placeholder', 'fahrenheit')
            
                // Replace Input With Select
                select.replaceWith(numInput);

                numInput.addEventListener('keyup', function(){
                    if(numInput.value !== ''){
                        // Get Input value
                        calc('F', numInput.value);
    
                        // Initialize Loading
                        setTimeout(function(){
                            loader.style.display = 'block';
                        }, 1000);
    
                        setTimeout(function(){
                            loader.style.display = 'none';
                            // Show result
                            result.style.display = 'block';
                            modal.style.display = 'block';
                            fromConvert.textContent = `${numInput.value} degree FAHRENHEIT`;
                            toConvert.textContent = `${calcResult} CELSIUS`;
                        }, 3000);
                    }
                })

            }else {
                inputLabel.textContent = 'Enter Temperature';
                // Create Input form
                numInput = document.createElement('input');
                // Add Class
                numInput.id = 'num-input';
                // Add content to options
                numInput.setAttribute('type', 'number')
                numInput.setAttribute('placeholder', 'Celsius')
            
                // Replace Input With Select
                select.replaceWith(numInput);

                numInput.addEventListener('keyup', function(){
                    if(numInput.value !== ''){
                        // Get Value
                        calc('C', numInput.value);
    
                        // Initialize Loading
                        setTimeout(function(){
                            loader.style.display = 'block';
                        }, 1000);
    
                        setTimeout(function(){
                            loader.style.display = 'none';
                            // Show result
                            result.style.display = 'block';
                            modal.style.display = 'block';
                            fromConvert.textContent = `${numInput.value} degree CELSIUS`;
                            toConvert.textContent = `${calcResult} FAHRENHEIT`;
                        }, 3000);
                    }
                });
            }
        }, 3000);

    }
}

// set Message
function setMessage(msg, color){
    const message = document.querySelector('.message');
    // Give User feedback
    message.style.color = color;
    message.style.fontWeight = '700';
    message.textContent = msg;
    input.style.borderColor = color;
    message.style.display = 'block';

    setTimeout(function(){
        message.style.display = 'none';
        input.style.borderColor = 'transparent';
    }, 1000)
}

let calcResult;
    
// CALCULATING TEMPERATURE
function calc(temp, num){
    if(temp === 'F'){
        calcResult = ((num - 32) * 0.5556);
        calcResult = Math.floor(calcResult);
        calcResult = `${calcResult} degree`;
    }else{
        calcResult = ((num * 1.8) + 32);
        calcResult = Math.floor(calcResult);
        calcResult = `${calcResult} degree`;
    }
}

// Exit Modal
function exitModal(){
    window.location.reload();
}