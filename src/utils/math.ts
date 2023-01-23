function getDecimalPointIndex(num: number): number {
	const str = String(Number(num));
	return str.indexOf(".");
}

function getPowerOfTen(num: number): number {
	// get the number that multiplies the number to be a whole number
	// i.e. if number is 1, return 0; if number is 1.1, return 1, if number is 1.12345, return 5
	const dotIndex = getDecimalPointIndex(num);
	const str = String(Number(num));
	return dotIndex === -1 ? 0 : str.length - str.indexOf(".") - 1;
}

// basically converts a floating point number to an integer.
// Multiply a floating point number by a power of ten - by moving the decimal point left or right
function multiplyByPowerOfTen(num: number, power: number): number {
	if (power === 0) {
		return num;
	}

	let dotIndex = getDecimalPointIndex(num);
	if (dotIndex === -1) {
		// should be a whole number
		if (power >= 0) {
			return num * Math.pow(10, power);
		} else {
			// if power is a negative number, then set the dotIndex to be after the numbers, so we can move it
			dotIndex = String(Number(num)).length;
		}
	}

	const numberDigits = String(Number(num)).split("");

	// move dot from dotIndex to dotIndex + power + 1 (add one because we have to move the decimal to after the digit, not before the digit)
	let newDotIndex = dotIndex + power + (power < 0 ? 0 : 1);

	// first check if the newDotIndex is greater than the length
	if (newDotIndex > numberDigits.length) {
		// add zeros to the array
		numberDigits.push(...Array.from({length: newDotIndex - numberDigits.length}, () => "0"));
	} else if (newDotIndex < 0) {
		// add zeros to the array
		const numBitsToAdd = 0 - newDotIndex;
		numberDigits.unshift(...Array.from({length: numBitsToAdd}, () => "0"));

		newDotIndex += numBitsToAdd;
		dotIndex += numBitsToAdd;
	}

	const addNewDot = (): void => {
		// add the dot at the new index
		numberDigits.splice(newDotIndex, 0, ".");
	};

	const removePreviousDot = (): void => {
		// remove the previous dot
		numberDigits.splice(dotIndex, 1);
	};

	if (newDotIndex > dotIndex) {
		// add new dot before removing the previous one
		addNewDot();
		removePreviousDot();
	} else {
		// remove previous dot before adding the new one
		removePreviousDot();
		addNewDot();
	}

	return Number(numberDigits.join(""));
}

export function add(...args: number[]): number {
	const power = Math.max(...args.map((val) => getPowerOfTen(val)));

	let result = 0;

	for (const val of args) {
		result += multiplyByPowerOfTen(val, power);
	}

	return multiplyByPowerOfTen(result, 0 - power);
}

export function subtract(val1: number, val2: number): number {
	const power = Math.max(getPowerOfTen(val1), getPowerOfTen(val2));

	const result = multiplyByPowerOfTen(val1, power) - multiplyByPowerOfTen(val2, power);
	return multiplyByPowerOfTen(result, 0 - power);
}

export function multiply(...args: number[]): number {
	const power = Math.max(...args.map((val) => getPowerOfTen(val)));

	let result = 1;

	for (const val of args) {
		result *= multiplyByPowerOfTen(val, power);
	}

	const divisorPower = power * args.length;
	return multiplyByPowerOfTen(result, 0 - divisorPower);
}

export function divide(dividend: number, divisor: number): number {
	const power = Math.max(getPowerOfTen(dividend), getPowerOfTen(divisor));
	return multiplyByPowerOfTen(dividend, power) / multiplyByPowerOfTen(divisor, power);
}

export class Num {
	private value: number;

	constructor(val = 0) {
		this.value = Number(val);
	}

	add(val: number): Num {
		this.value = add(this.value, val);
		return this;
	}

	subtract(val: number): Num {
		this.value = subtract(this.value, val);
		return this;
	}

	multiply(val: number): Num {
		this.value = multiply(this.value, val);
		return this;
	}

	divide(val: number): Num {
		this.value = divide(this.value, val);
		return this;
	}

	valueOf(): number {
		return this.value;
	}
}
