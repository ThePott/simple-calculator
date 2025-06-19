const display = document.querySelector("#display")

// const buttonMany = document.querySelectorAll(".button")
// const buttonArray = [...buttonMany]

// const numberButtonArray = buttonArray.filter((button) => {
//     const classList = button.classList.value
//     console.log("---- class list:", classList, typeof classList, classList.includes("nat"))
//     return classList.includes("natural-number") || classList.includes("zero")
// })
// const functionButtonArray = buttonArray.filter((button) => button.classList.value.includes("function"))
const naturalNumberButtonMany = document.querySelectorAll(".natural-number")
const zeroNumberButton = document.querySelector(".zero")
const numberButtonArray = [...naturalNumberButtonMany, zeroNumberButton]

const functionButtonMany = document.querySelectorAll(".function")
const dotButton = document.querySelector(".dot")


for (const button of numberButtonArray) {
    button.addEventListener("click", () => {
        const buttonText = button.innerText
        const displayText = display.innerText

        if (displayText === "0") {
            display.innerText = buttonText
            return
        }

        display.innerText = `${displayText}${buttonText}`
    })
}

for (const button of functionButtonMany) {
    const buttonText = button.innerText
    let eventListener;
    switch (buttonText) {
        case "C":
            eventListener = () => {
                display.innerText = "0"
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
        display.innerText = `${displayText}0.`
        return
    }

    // 앞이 숫자
    const splitedArray = displayText.split(/[^0-9.]/)
    if (splitedArray.at(-1).includes(".")) { return }
    
    display.innerText = `${displayText}.`
})