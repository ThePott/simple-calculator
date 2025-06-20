const display = document.querySelector("#display")

const naturalNumberButtonMany = document.querySelectorAll(".natural-number")
const zeroNumberButton = document.querySelector(".zero")
const numberButtonArray = [...naturalNumberButtonMany, zeroNumberButton]

const dotButton = document.querySelector(".dot")

const functionButtonMany = document.querySelectorAll(".function")

const operatorButtonMany = document.querySelectorAll(".operator")

const equalButton = document.querySelector(".equal-sign")

// 

const operation = {
    previousResult: null,
    firstOperandInString: null,
    operactor: null,
    secondOperandInString: null,

    trimDisplayText() {
        const displayText = this.getCurrentlyDisplayedText()

        if (!displayText) { return }

        if (displayText.at(-1) === ".") {
            const newText = displayText.replace(".", "")
            this.handleNewText(newText)
        }
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
        this.handleNewText(resultInNumber.toString())
    },

    pend(operatorText) {
        this.trimDisplayText()

        operation.operactor = operatorText

        if (!this.secondOperandInString) { return }
        this.calc(operatorText)
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
            eventListener = () => operation.reset()
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

