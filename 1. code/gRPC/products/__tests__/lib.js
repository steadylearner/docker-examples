const { isBlackFriday, dateTodayWithoutYear } = require("../lib");

describe("Test functions in lib folder", () => {
	test("isBlackFriday with month day pair of today ", () => {
		expect(isBlackFriday(dateTodayWithoutYear())).toBe(false);
	});

	test("isBlackFriday with [10, 24] and should be always true", () => {
		expect(isBlackFriday([10, 24])).toBe(true);
		expect(isBlackFriday()).toBe(true);
	});
});