const sum = (a, b) => {
	return a + b;
}

test('Adds 1 to 2 and checks for 3', () => {
	expect(sum(1, 2)).toBe(3);
});
