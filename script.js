// Password Checker by 3L173 H4CK3R 1337 (@imlegendadi)
// Github - github.com/ImLegendAdi


function calculateStrength(password) {
    let score = 0;
    if (!password) return 0;

    const lengthBonus = Math.min(10, password.length);
    const varietyBonus = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/]
        .reduce((acc, regex) => acc + regex.test(password), 0);

    score = lengthBonus + varietyBonus * 2;

    return Math.min(10, score);
}

function getStrengthLabel(score) {
    if (score < 7) return "Weak";
    if (score < 15) return "Moderate";
    return "Strong";
}

function estimateEntropy(password) {
    const charsetSize =
        (/[a-z]/.test(password) ? 26 : 0) +
        (/[A-Z]/.test(password) ? 26 : 0) +
        (/[0-9]/.test(password) ? 10 : 0) +
        (/[^a-zA-Z0-9]/.test(password) ? 32 : 0);

    return Math.round(Math.log2(Math.pow(charsetSize, password.length)));
}

function generateSecurePassword(length = 25) {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+-;':?><,.{}[]\\/`|";

    // Ensure at least 1 character from each category
    let password = '';
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];

    // random pass generate krega
    const allChars = upper + lower + numbers + special;
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle kr dega password ko predictable order
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}

function showSuggestionBox(inputElement, suggestion) {
    let box = document.createElement("div");
    box.textContent = "⚠️ Weak Password! Try: " + suggestion;
    box.innerHTML = `
        <b><span style="color: #b50404ff; font-size: 18px;">⚠️ Weak Password! Try: </span></b>
        <br>
        <b> <span style="color: #000000ff; font-size: 16px;"> ${suggestion}</b></span>
    `;
    box.style = `
        position: absolute;
        background: #ffffffff;
        color: #f55;
        padding: 4px;
        font-size: 12px;
        border: 3px solid #26ff00ff;
        z-index: 999999;
        border-radius: 10px;
        top: ${inputElement.offsetTop + inputElement.offsetHeight + 5}px;
        left: ${inputElement.offsetLeft}px;
    `;

    box.className = "pw-suggestion-box";
    inputElement.parentNode.appendChild(box);

    setTimeout(() => box.remove(), 8000);
}

document.addEventListener("input", (e) => {
    const el = e.target;
    if (el.tagName === "INPUT" && el.type === "password") {
        const strength = calculateStrength(el.value);
        document.querySelectorAll(".pw-suggestion-box").forEach(b => b.remove());

        // ye tabtak strong password suggest krega jabtak kam se kam 15 char se jayada password nhi hoga input field me
        if (el.value.length > 0 && (el.value.length < 15 || strength < 6)) {
            const suggestion = generateSecurePassword(25);
            showSuggestionBox(el, suggestion);
        }
    }
});
