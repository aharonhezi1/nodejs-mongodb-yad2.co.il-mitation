const express = require('express');
const router = new express.Router();
const { addresses, test } = require('../db/israelAddress');
const RealEstate = require('../db/realEstateModel');
const moment = require('moment');
const he = require('convert-layout/he');
const {
	convertSearchStringToMaxPossibleOptionsArray,
	findMatchBetweenAddressesAndSearch,
} = require('../assests/search-funcs');
const { createFindQuery } = require('../assests/guery-funcs');
function formatEnteryDate(flats) {
	return flats.map(flat => {
		if (!flat.about.enteryDate) return flat;
		let f = {
			...flat.toObject(),
			about: {
				...flat.about.toObject(),
				enteryDate: moment(flat.about.enteryDate).format('DD/MM/YYYY'),
			},
		};
		return f;
	});
}
const sortby = {
	byDate: 'updatedAt',
	fromLowPrice: 'price',
	fromHighPirce: '-price',
};
router.post('/api/real-estate/find-address', (req, res) => {
	try {
		let { address } = req.body;
		//convert to hebrew letters
		address = he.fromEn(address.trim().replace(',', ' '));

		const options = convertSearchStringToMaxPossibleOptionsArray(address);

		const { cities, streets } = findMatchBetweenAddressesAndSearch(options, addresses);

		res.send({ cities: cities.slice(0, 4), streets: streets.slice(0, 10) });
	} catch (e) {
		console.log(e);

		res.send(e);
	}
});
router.get('/api/real-estate/:id', async (req, res) => {
	try {
		const reType = req.params.id;
		const queryParams = req.query;
		const page = req.header('page');
		const sortOptions = JSON.parse(req.header('sortOptions'))
		console.log(sortOptions);
		console.log(queryParams);
		let flats;
		//if (!!queryParams) {
		const query = createFindQuery(queryParams, reType,sortOptions);

		flats = await RealEstate.find(query).sort(sortby[sortOptions.sortBy]);
		// } else {
		// 	flats = await RealEstate.find({ type: reType }).sort('-updatedAt');
		// }

		flats = formatEnteryDate(flats);
		const factor = 10;
		res.send({ re: flats.slice(page * factor - factor, page * factor), pageNum: flats.length / factor });
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});
module.exports = router;
