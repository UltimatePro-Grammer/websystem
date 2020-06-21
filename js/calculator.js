class Calculator {
    // ? Sometimes caculator gets wrong value
    constructor() {
        this.operation = "";
        this.lastNumber = "";
        this.currentNumber = "";
        this.oldFontSize = "";

        let win = new Window(117, 262, "Calculator", 20,35,20,2.2);
        this.window = win.getWindow();
        this.header = win.getHeader();
        this.win = win;
        this.win.setBackgroundColor("rgb(40,40,40)");
        
        // CSS Definitions
        new CSSClass("calc-screen-container", "background-color: #8c8c8c;", "width:100%;", "height: 30%;");
        new CSSClass("calc-screen", "position: absolute;", "top: 10%;", "width: 99%;", "font-size: 4em;", "text-align: right;");
        new CSSClass("calc-button", /*"padding-top:5%;", "padding-bottom:5%;",*/ "display: table-cell;", "background-color: rgba(180,180,180,0.3);", "border: 0.2em solid black;", "text-align: center;", "vertical-align: middle;", "transition: background-color 0.03s;", "font-size: 1.3em;");
        new CSSClass("calc-button:active", "background-color: rgba(255, 255, 255, 0.4);"); // on click
        new CSSClass("calc-button-container", "display:table;", "width:100%;","height:63%;");
        new CSSClass("calc-button-row", "display: table-row;", "height:20%;");
        new CSSClass("calc-modifier", "background-color: rgba(255, 159, 12, 0.8);");
        new CSSClass("calc-modifier:active", "background-color: rgba(255, 159, 12, 1);");
        new CSSClass("calc-0", "border-right:none;");
        new CSSClass("calc-0-2", "border-left:none;", "color: rgba(0,0,0,0);");

        let screenContainer = document.createElement("div");
        screenContainer.classList.add("calc-screen-container");

        let screen = document.createElement("div"); // display text
        screenContainer.appendChild(screen);
        screen.innerHTML = "0";
        screen.classList.add("calc-screen");
        this.fitText(screen);
        
        this.window.appendChild(screenContainer);

        // The button rows are a bunch of divs using table display
        let buttonContainer = document.createElement("div"); 
        buttonContainer.classList.add("calc-button-container");
        this.window.appendChild(buttonContainer);

        // Rows
        let row1 = document.createElement("div");
        row1.classList.add("calc-button-row");
        buttonContainer.appendChild(row1);

        let row2 = document.createElement("div");
        row2.classList.add("calc-button-row");
        buttonContainer.appendChild(row2);

        let row3 = document.createElement("div");
        row3.classList.add("calc-button-row");
        buttonContainer.appendChild(row3);

        let row4 = document.createElement("div");
        row4.classList.add("calc-button-row");
        buttonContainer.appendChild(row4);

        let row5 = document.createElement("div");
        row5.classList.add("calc-button-row");
        buttonContainer.appendChild(row5);

        


        // Row 1
        let clear = document.createElement("div");
        clear.classList.add("calc-button", "unselectable", "clickable");
        clear.innerHTML = "AC";
        clear.title = "All Clear (or press c)";
        row1.appendChild(clear);

        let negate = document.createElement("div");
        negate.classList.add("calc-button", "unselectable", "clickable");
        negate.innerHTML = "+/-";
        negate.title = "Negate the sign of the current value (or press shift-minus)";
        row1.appendChild(negate);

        let percent = document.createElement("div");
        percent.classList.add("calc-button", "unselectable", "clickable");
        percent.innerHTML = "%";
        percent.title = "Percent (or press %)";
        row1.appendChild(percent);

        let divide = document.createElement("div");
        divide.classList.add("calc-button", "calc-modifier", "unselectable", "clickable");
        divide.innerHTML = "/";
        divide.title = "Divide (or press /)";
        row1.appendChild(divide);


        
        // Row 2
        let seven = document.createElement("div");
        seven.classList.add("calc-button", "unselectable", "clickable");
        seven.innerHTML = "7";
        row2.appendChild(seven);

        let eight = document.createElement("div");
        eight.classList.add("calc-button", "unselectable", "clickable");
        eight.innerHTML = "8";
        row2.appendChild(eight);

        let nine = document.createElement("div");
        nine.classList.add("calc-button", "unselectable", "clickable");
        nine.innerHTML = "9";
        row2.appendChild(nine);

        let multiply = document.createElement("div");
        multiply.classList.add("calc-button", "calc-modifier", "unselectable", "clickable");
        multiply.innerHTML = "x";
        multiply.title = "Multiply (or press x or *)";
        row2.appendChild(multiply);




        // Row 3
        let four = document.createElement("div");
        four.classList.add("calc-button", "unselectable", "clickable");
        four.innerHTML = "4";
        row3.appendChild(four);

        let five = document.createElement("div");
        five.classList.add("calc-button", "unselectable", "clickable");
        five.innerHTML = "5";
        row3.appendChild(five);

        let six = document.createElement("div");
        six.classList.add("calc-button", "unselectable", "clickable");
        six.innerHTML = "6";
        row3.appendChild(six);

        let subtract = document.createElement("div");
        subtract.classList.add("calc-button", "calc-modifier", "unselectable", "clickable");
        subtract.innerHTML = "-";
        subtract.title = "Subtract (or press -)"
        row3.appendChild(subtract);


        // Row 4
        let one = document.createElement("div");
        one.classList.add("calc-button", "unselectable", "clickable");
        one.innerHTML = "1";
        row4.appendChild(one);

        let two = document.createElement("div");
        two.classList.add("calc-button", "unselectable", "clickable");
        two.innerHTML = "2";
        row4.appendChild(two);

        let three = document.createElement("div");
        three.classList.add("calc-button", "unselectable", "clickable");
        three.innerHTML = "3";
        row4.appendChild(three);

        let add = document.createElement("div");
        add.classList.add("calc-button", "calc-modifier", "unselectable", "clickable");
        add.innerHTML = "+";
        add.title = "Add (or press +)"
        row4.appendChild(add);


        // Row 5
        let zero = document.createElement("div");
        zero.classList.add("calc-button", "calc-0", "unselectable", "clickable");
        zero.innerHTML = "0";
        row5.appendChild(zero);
        let zero2 = document.createElement("div");
        zero2.classList.add("calc-button", "calc-0-2", "unselectable", "clickable");
        zero2.innerHTML = "0";
        row5.appendChild(zero2);

        let decimal = document.createElement("div");
        decimal.classList.add("calc-button", "unselectable", "clickable");
        decimal.innerHTML = ".";
        decimal.title = "Add a decimal point (or press .)";
        row5.appendChild(decimal);

        let equals = document.createElement("div");
        equals.classList.add("calc-button", "calc-modifier", "unselectable", "clickable");
        equals.innerHTML = "=";
        equals.title = "Equal (or press enter or =)";
        row5.appendChild(equals);
        
        // button click
        this.window.querySelectorAll(".calc-button").forEach((element)=>{
            element.onclick = ()=>{
                this.pressButton(element.innerHTML);
            }
        });
        this.screen = screen;


        // KEYBOARD SHORTCUTS
        document.addEventListener("keydown", event => {
            if(this.win.focused()) { // only count if focused
                let key = event.key;
                this.pressButton(key);
                if(key == "c"||key == "C") {
                    if((event.ctrlKey||event.metaKey)) { // tried to copy/paste
                        event.preventDefault();
                        navigator.clipboard.writeText(this.currentNumber);
                    } else { // tried to clear
                        this.pressButton("AC");
                    }
                }
                else if(key == "Enter") {
                    this.pressButton("=");
                }
                else if(key == "_") {
                    this.pressButton("+/-");
                }
                else if(key == "*") {
                    this.pressButton("x");
                }
            }
          });
    }
    updateScreen(text="") {
        if(text) {
            this.screen.innerHTML = text;
        } else {
            this.screen.innerHTML = this.currentNumber;
        }
        this.fitText(this.screen);
    }
    pressButton(button) {
        if(button.isNumber()) {
            this.currentNumber += button;
            this.updateScreen();
            //console.log(parseInt(button));
        } else {
            if(button == ".") { // TODO change to switch statement
                if(!this.currentNumber.includes(".")) {
                    if(this.currentNumber == "") {
                        this.currentNumber = 0;
                    }
                    this.currentNumber += button;
                }
                this.updateScreen();
            }
            else if(button == "+") {
                this.setOperation("+");
            }
            else if(button == "-") {
                this.setOperation("-");
            }
            else if(button == "x") {
                this.setOperation("x");
            }
            else if(button == "/") {
                this.setOperation("/");
            }
            else if(button == "=") {
                this.getAnswer();
            }
            else if(button == "AC") {
                this.operation = "";
                this.lastNumber = "";
                this.currentNumber = "";
                this.updateScreen("0");
            } else if(button == "+/-") {
                this.currentNumber = (parseFloat(this.currentNumber)*-1).toString();
                this.updateScreen();
            } else if(button == "%") {
                this.currentNumber = (parseFloat(this.currentNumber)/100).toString();
                this.updateScreen();
            }
            //console.log(button +' is not a number.');
        }
    }

    getAnswer() {
        let last = parseFloat(this.lastNumber);
        let current = parseFloat(this.currentNumber);
        switch(this.operation) {
            case "+":
                this.currentNumber = last+current;
                break;
            case "-":
                this.currentNumber = last-current;
                break;
            case "x":
                this.currentNumber = last*current;
                break;
            case "/":
                this.currentNumber = last/current;
                break;
            default:
                break;
        }
        this.currentNumber = (this.currentNumber).toString();
        this.updateScreen();
    }

    setOperation(operation) {
        if(this.currentNumber) {
            this.lastPressed = this.currentNumber;
        }
        
        if(!this.currentNumber || isNaN(this.currentNumber)) {
            this.currentNumber = this.lastPressed;
        }
        if(this.operation != "") {
            this.getAnswer();
            var old = this.currentNumber;
        }
        
        
        this.operation = operation;
        this.lastNumber = this.currentNumber;
        
        this.currentNumber = "";
        if(old) {
            this.updateScreen(old);
        } else {
            this.updateScreen(this.lastNumber);
        }
        this.resetScreen();
    }

    resetScreen() {
        var oldScreenContent = this.screen.innerHTML;
        this.screen.innerHTML = "";
        setTimeout(()=>{
            this.screen.innerHTML = oldScreenContent;
        }, 100);
    }


    /**
    * Fit text to div (from https://github.com/ricardobrg/fitText/)
    * @param {Element to select (changed from link above to not be id based)} outputSelector 
    */
    fitText(output) {
        // max font size in pixels
        if(!this.oldFontSize) {
            this.oldFontSize = parseFloat(getComputedStyle(output).fontSize);
        }
        output.style.fontSize = this.oldFontSize;
        const maxFontSize = this.oldFontSize;
        // get the DOM output element by its selector
        let outputDiv = output;
        // get element's width
        let width = outputDiv.clientWidth;
        // get content's width
        let contentWidth = outputDiv.scrollWidth;
        // get fontSize
        let fontSize = parseInt(window.getComputedStyle(outputDiv, null).getPropertyValue('font-size'),10);
        // if content's width is bigger then elements width - overflow
        if (contentWidth > width){
            fontSize = Math.ceil(fontSize * width/contentWidth,10);
            fontSize =  fontSize > maxFontSize  ? fontSize = maxFontSize  : fontSize - 1;
            outputDiv.style.fontSize = fontSize+'px';   
        }else{
            // content is smaller then width... let's resize in 1 px until it fits 
            while (contentWidth === width && fontSize < maxFontSize){
                fontSize = Math.ceil(fontSize) + 1;
                fontSize = fontSize > maxFontSize  ? fontSize = maxFontSize  : fontSize;
                outputDiv.style.fontSize = fontSize+'px';   
                // update widths
                width = outputDiv.clientWidth;
                contentWidth = outputDiv.scrollWidth;
                if (contentWidth > width){
                    outputDiv.style.fontSize = fontSize-1+'px'; 
                }
            }
        }
    }


}

function makeCalculator() {
    new Calculator;
}

appImagePaths["Calculator"] = "assets/calc.png";