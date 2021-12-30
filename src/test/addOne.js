const addOne = (someNumber) => {
	//Untested branch
	if(someNumber === 3.14) {
		return "This line isn't covered by tests"
	}
	return someNumber + 1;
}

module.exports = {addOne};
