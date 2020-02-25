//const he = require('convert-layout/he');

function findMatchBetweenAddressesAndSearch(searchOptions, addressesDB) {
	let cities = [],
		streets = [];
	searchOptions.forEach(option => {

		addressesDB.forEach((address, i) => {
			const city = address.city
			const street = address.street
			const regex=new RegExp('( |^)'+option)
			if (regex.test(street)) {
				streets.push({...address,option});
			}
			if (regex.test(city) && !cities.some(city=>city.city===address.city)) {
				cities.push({city:address.city,option});
			}
			// limit match number
			if (cities.length + streets.length > 12 && cities.length > 2 && streets.length > 2)
				return { cities, streets };
		});
	
	});
	return { cities, streets };
}

function convertSearchStringToMaxPossibleOptionsArray(searchStr) {
	let options = [];
	const cleanArray =searchStr
		.split(' ')
		.filter(str => str !== '');
		
	for (let i = cleanArray.length; i > 0; i--) {
		for (let j = 0; j + i <= cleanArray.length; j++) {
			options.push(cleanArray.slice(j, j + i).join(' '));
		}
	}
	return options;''
}
module.exports={convertSearchStringToMaxPossibleOptionsArray,findMatchBetweenAddressesAndSearch}