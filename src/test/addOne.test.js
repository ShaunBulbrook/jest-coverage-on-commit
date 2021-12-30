const { addOne } = require("./addOne")

describe('A test test suite', () => {
	it('should add 1 to a provided number', () => {
		expect(addOne(1)).toBe(2)
	})
})
