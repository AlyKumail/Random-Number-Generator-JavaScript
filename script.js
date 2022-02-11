"strict-mode";
const lengthElement = document.getElementById("length");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const numberElement = document.getElementById("number");
const symbolElement = document.getElementById("symbols");
const generateElement = document.getElementById("generate");
const outputElement = document.getElementById("output");
const clipElement = document.getElementById("icon");

generateElement.addEventListener("click", () => {
    const length = +lengthElement.value;
    const hasLower = lowercaseElement.checked;
    const hasUpper = uppercaseElement.checked;
    const hasNumber = numberElement.checked;
    const hasSymbol = symbolElement.checked;
    console.log(length);

    outputElement.textContent = generatePassword(
        length,
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol
    );
});

//copy password to clipboard
clipElement.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = outputElement.textContent;

    if (!password) return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password Copied!!!");
});

const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const getRandomSymbol = () => {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const randomFunctions = {
    hasLower: getRandomLower,
    hasUpper: getRandomUpper,
    hasNumber: getRandomNumber,
    hasSymbol: getRandomSymbol,
};

function generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol) {
    let passwordGenerated = "";

    const typesCount = hasLower + hasUpper + hasNumber + hasSymbol;

    const typesArr = [
        { hasLower },
        { hasUpper },
        { hasNumber },
        { hasSymbol },
    ].filter((item) => Object.values(item)[0]);
    console.log(typesArr);

    if (typesCount === 0) {
        return "";
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach((item) => {
            const funcName = Object.keys(item)[0];

            passwordGenerated += randomFunctions[funcName]();
            // console.log(funcName);
            // console.log(randomFunctions[funcName]);
        });
    }

    const finalPassword = passwordGenerated.slice(0, length);
    console.log(finalPassword);
    return finalPassword;
}

console.log(getRandomNumber());
