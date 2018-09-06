// Convert the given number into a roman numeral.
// All roman numerals answers should be provided in upper-case.
// Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

function convertToRoman(num) {
	let number = num;
	let roman = new Array();
	if (parseInt(num) == NaN) {
		console.log("Invalid input");
		return;
	} else {
		let digit,
			index = 1;
		while (parseInt(num) > 0) {
			digit = num % 10;
			index *= 10;
			num /= 10;
			console.log(parseInt(digit));
		}
	}
}

function returnRoman() {}

convertToRoman(12);
