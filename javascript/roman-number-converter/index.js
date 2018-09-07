// Convert the given number into a roman numeral.
// All roman numerals answers should be provided in upper-case.
// Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.
var index = {
	M: 1000,
	CM: 900,
	D: 500,
	CD: 400,
	C: 100,
	XC: 90,
	L: 50,
	XL: 40,
	X: 10,
	IX: 9,
	V: 5,
	IV: 4,
	I: 1
};

function convertToRoman(num) {
	let roman = "";
	for (let i in index) {
		while (num >= index[i]) {
			roman += i;
			num -= index[i];
		}
	}
	return roman;
}

console.log(convertToRoman(200));
