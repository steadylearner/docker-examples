// Use jest for general tests. Tape is much faster for end to end tests.

test('Testing to see if Jest works', () => {
	const message = "Hello from www.steadylearner.com";
	expect(message).toBe(message);
});