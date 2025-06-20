const display = document.querySelector("#display")

const naturalNumberButtonMany = document.querySelectorAll(".natural-number")
const zeroNumberButton = document.querySelector(".zero")
const numberButtonArray = [...naturalNumberButtonMany, zeroNumberButton]

const dotButton = document.querySelector(".dot")

const functionButtonMany = document.querySelectorAll(".function")

const operatorButtonMany = document.querySelectorAll(".operator")

const equalButton = document.querySelector(".equal-sign")

const operation = {
    // previousResult: null,
    firstOperandInString: null,
    operactor: null,
    secondOperandInString: null,

    trimDisplayText() {
        const displayText = this.getCurrentlyDisplayedText()

        if (!displayText) { return null }

        if (displayText.at(-1) === ".") {
            const newText = displayText.replace(".", "")
            this.handleNewText(newText)
            return newText
        }

        return displayText
    },

    calc() {
        if (!this.secondOperandInString) { return }

        this.trimDisplayText()

        const firstInNumber = Number(this.firstOperandInString)
        const secondInNumber = Number(this.secondOperandInString)
        let resultInNumber;
        switch (this.operactor) {
            case "+":
                resultInNumber = firstInNumber + secondInNumber
                break
            case "-":
                resultInNumber = firstInNumber - secondInNumber
                break
            case "/":
                const dividedResult = firstInNumber / secondInNumber
                const roundedResult = Math.round(dividedResult * 10000) / 10000
                resultInNumber = roundedResult
                break
            case "*":
                resultInNumber = firstInNumber * secondInNumber
                break
            default:
                console.error("---- UNEXPECTED ERROR:", this.operactor)
        }

        this.secondOperandInString = null
        this.operactor = null

        const roundedNumber = Math.round(resultInNumber * 10000) / 10000
        this.handleNewText(roundedNumber.toString())
    },

    convert(functionText) {
        const displayText = this.trimDisplayText()
        switch (functionText) {
            case "±":
                const reversedNumber = -1 * Number(displayText)

                this.handleNewText(reversedNumber.toString())
                break
            case "%":
                const displayTextB = this.trimDisplayText()
                const percentToDecimalNumber = 0.01 * Number(displayTextB)

                this.handleNewText(percentToDecimalNumber.toString())
                break
            default:
                console.error("---- no such function handled:", functionText, )
        }
    },

    pend(operatorText) {
        this.trimDisplayText()

        if (!this.secondOperandInString) {
            operation.operactor = operatorText
            return
        }

        this.calc()
        this.operactor = operatorText
    },

    getCurrentlyDisplayedText() {
        if (!this.firstOperandInString) { return "0" }
        if (!this.operactor) {
            return this.firstOperandInString
        }

        return this.secondOperandInString
    },

    handleNewText(newText) {
        if (!this.operactor) {
            this.firstOperandInString = newText
        } else {
            this.secondOperandInString = newText
        }

        display.innerText = newText
    },

    reset() {
        this.previousResult = null
        this.firstOperandInString = null
        this.operactor = null
        this.secondOperandInString = null

        display.innerText = "0"
    }
}

for (const button of numberButtonArray) {
    const buttonText = button.innerText
    button.addEventListener("click", () => {
        const displayText = operation.getCurrentlyDisplayedText()

        // 맨 처음엔
        if (!displayText || displayText === "0") {
            const newText = buttonText
            operation.handleNewText(newText)
            return
        }

        const newText = `${displayText}${buttonText}`
        operation.handleNewText(newText)
    })
}

dotButton.addEventListener("click", () => {
    const displayText = operation.getCurrentlyDisplayedText()
    
    // operator exists, secondOperand null
    if (!displayText) {
        operation.handleNewText("0.")
        return
    }

    if (displayText.includes(".")) { return }

    operation.handleNewText(`${displayText}.`)
})

for (const button of functionButtonMany) {
    const buttonText = button.innerText
    let eventListener;
    switch (buttonText) {
        case "C":
            eventListener = () => operation.reset()
            break
        case "%":
        case "±":
            eventListener = () => operation.convert(buttonText)
            break
        default:
            eventListener = () => console.error("---- not specified button")
    }
    button.addEventListener("click", eventListener)
}

for (const button of operatorButtonMany) {
    const buttonText = button.innerText
    let eventListener;

    switch (buttonText) {
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

equalButton.addEventListener("click", () => {
    operation.calc()
})

