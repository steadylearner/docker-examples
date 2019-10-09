// or util for folder name
// const moment = require("moment");
// date_of_birth = moment(toNumber).format("DD-MM-YYYY");
// console.log(date_of_birth);

// let today = Date.now()
// today = moment(today).format("DD-MM-YYYY");
// console.log(today)

const dateTodayWithoutYear = () => {
	const today = new Date();
	// console.log(today);
	const monthFromToday = today.getMonth();
	const dateFromToday = today.getDate();
	const monthDatePairFromToday = [monthFromToday, dateFromToday];
	// console.log(dateFromToday, monthFromToday);
	return monthDatePairFromToday;
};

const isBlackFriday = (monthDatePair = [10, 24]) => {
	// const monthDatePairFromToday = dateTodayWithoutYear();
	const monthDatePairFromBlackfriday = [10, 24]; // month and day start from 0 11/25

	const conclusion = (monthDatePair[0] === monthDatePairFromBlackfriday[0]) && (monthDatePair[1] === monthDatePairFromBlackfriday[1]);

	if (conclusion) {
		console.log("Today is the black friday. Give 10% discount anyway.");
	} else {
		console.log("Today is not black friday. No discount from this.");
	}
	return conclusion;
};

const isBirthday = (date_of_birth) => {
	const toNumber = new Number(date_of_birth);
	date_of_birth = new Date(toNumber);
	// console.log(date_of_birth);
	const monthFromBirthday = date_of_birth.getMonth();
	const dateFromBirthday = date_of_birth.getDate();
	const monthDatePairFromUser = [monthFromBirthday, dateFromBirthday];
	// console.log(monthDatePairFromUser)

	const monthDatePairFromToday = dateTodayWithoutYear();
	// console.log(monthDatePairFromToday)

	const conclusion = (monthDatePairFromUser[0] === monthDatePairFromToday[0]) && (monthDatePairFromUser[1] === monthDatePairFromToday[1]);

	if (conclusion) {
		console.log("Today is his birthday. Give 5% discount.");
	} else {
		console.log("Today is not his birthday. No discount from this.");
	}
	return conclusion;
};

module.exports = {
	isBirthday,
	isBlackFriday,
	dateTodayWithoutYear,
};
