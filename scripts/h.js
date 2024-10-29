function formatCalculation (number, maxDigits = 10) {
    const num = Number(number);
    if (!Number.isFinite(num)) {
        return "Error"
    }

    const isWholeNumber = Number.isInteger(num);
    const numStr = num.toString();

    if (isWholeNumber && numStr.length <= maxDigits) {
        return numStr;
    }

    if (Math.abs(num) >= Math.pow(10, maxDigits) || Math.abs(num) < Math.pow(10, -maxDigits)) {
        return num.toExponential(maxDigits - 6).replace(/\.?0+e/, "e");
    }

    if (isWholeNumber) {
        const parts = numStr.split(".");
        const integerPart = parts[0].length;
        const availableDecimalPlaces = maxDigits - integerPart - 1;

        if (availableDecimalPlaces > 0) {
            const rounded = Number(num.toFixed(availableDecimalPlaces));
            return rounded.toString()
        }
    }

    return num.toPrecision(maxDigits).replace(/\.?0+$/, "");
}

console.log(formatCalculation(0.0000088888888888888));
