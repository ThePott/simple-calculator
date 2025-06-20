const display = document.querySelector("#display")

const naturalNumberButtonMany = document.querySelectorAll(".natural-number")
const zeroNumberButton = document.querySelector(".zero")
const numberButtonArray = [...naturalNumberButtonMany, zeroNumberButton]

const functionButtonMany = document.querySelectorAll(".function")
const dotButton = document.querySelector(".dot")

const localDisplay = {
    previousDisplayText: "0",
    currentDisplayText: "0",
    updateDisplay(newText) {
        localDisplay.previousDisplayText = localDisplay.currentDisplayText
        localDisplay.currentDisplayText = newText

        display.innerText = newText
    }
}


for (const button of numberButtonArray) {
    const buttonText = button.innerText
    button.addEventListener("click", () => {
        const displayText = localDisplay.currentDisplayText

        if (displayText === "0") {
            const newText = buttonText
            localDisplay.updateDisplay(newText)
            return
        }

        const newText = `${displayText}${buttonText}`
        localDisplay.updateDisplay(newText)
    })
}

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

dotButton.addEventListener("click", () => {
    // const sampleText = "123.09+0.789-123"
    const displayText = display.innerText
    const lastChar = displayText.at(-1)
    const lastCharInNumber = Number(lastChar)

    if (lastChar === ".") { return }

    // 앞이 연산 기호면 0. 붙임
    if (Number.isNaN(lastCharInNumber)) {
        localDisplay.updateDisplay(`${displayText}0.`)
        return
    }

    // 앞이 숫자
    const splitedArray = displayText.split(/[^0-9.]/)
    if (splitedArray.at(-1).includes(".")) { return }

    localDisplay.updateDisplay(`${displayText}.`)
})
