const display = document.querySelector("#display")

const naturalNumberButtonMany = document.querySelectorAll(".natural-number")
const zeroNumberButton = document.querySelector(".zero")
const numberButtonArray = [...naturalNumberButtonMany, zeroNumberButton]

const dotButton = document.querySelector(".dot")

const functionButtonMany = document.querySelectorAll(".function")

const operatorButtonMany = document.querySelectorAll(".operator")


const operation = {
    previousResult: null,
    firstOperandInString: null,
    operactor: null,
    secondOperandInString: null,

    calc() {
        let result;
        switch (this.operactor) {
            case "+":
                result = this.firstOperandInString + this.secondOperandInString
                break
            case "-":
                result = this.firstOperandInString - this.secondOperandInString
                break
            case "/":
                const dividedResult = this.firstOperandInString / this.secondOperandInString
                const roundedResult = Math.round(dividedResult * 10000) / 10000
                result = roundedResult
                break
            case "*":
                result = this.firstOperandInString * this.secondOperandInString
            default:
                console.error("---- UNEXPECTED ERROR")
        }
        this.operactor = null
        localDisplay.updateDisplay(result.toString())
    },

    pend(operatorText) {
        console.log("pending operator:", operatorText)
        // operation.firstOperandInString = localDisplay.currentDisplayText
        operation.operactor = operatorText
    },

    getCurrentlyDisplayedText() {
        if (!this.firstOperandInString) { return "0" }
        if (!this.operactor) { return this.firstOperandInString.toString() }

        return this.secondOperandInString.toString()
    },

    handleNewText(newText) {
        if (!this.operactor) {
            console.log("---- im here")
            this.firstOperandInString = newText
            display.innerText = newText
        }
    }
}



for (const button of numberButtonArray) {
    const buttonText = button.innerText
    button.addEventListener("click", () => {
        const displayText = operation.getCurrentlyDisplayedText()

        if (displayText === "0") {
            const newText = buttonText
            operation.handleNewText(newText)
            return
        }

        const newText = `${displayText}${buttonText}`
        operation.handleNewText(newText)
    })
}

dotButton.addEventListener("click", () => {
    // const sampleText = "123.09+0.789-123"
    const displayText = display.innerText
    const lastChar = displayText.at(-1)
    const lastCharInNumber = Number(lastChar)

    if (lastChar === ".") { return }

    // 앞이 연산 기호면 0. 붙임
    if (Number.isNaN(lastCharInNumber)) {
        const newText = `${displayText}0.`
        operation.handleNewText(newText)
        return
    }

    // 앞이 숫자
    const splitedArray = displayText.split(/[^0-9.]/)
    if (splitedArray.at(-1).includes(".")) { return }

    operation.handleNewText(`${displayText}.`)
})

for (const button of functionButtonMany) {
    const buttonText = button.innerText
    let eventListener;
    switch (buttonText) {
        case "C":
            eventListener = () => {
                localDisplay.updateDisplay("0")
            }
            break
        default:
            eventListener = () => console.log("---- not specified button")
    }
    button.addEventListener("click", eventListener)
}

for (const button of operatorButtonMany) {
    const buttonText = button.innerText
    let eventListener;

    switch (buttonText) {
        case "=":
            eventListener = () => operation.calc()
            break
        case "+":
        case "-":
        case "*":
        case "/":
            eventListener = () => operation.pend(buttonText)
            break
        default:
            eventListener = () => console.error("---- what operator is this?:", buttonText)
    }

    button.addEventListener("click", eventListener)
}


