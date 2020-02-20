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
router.post('/api/real-estate/find-address', (req, res) => {
	try {
		let { address } = req.body;
		//convert to hebrew letters
		address = he.fromEn(address);

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
		console.log(queryParams);
		let flats;
		if (!!queryParams) {
			const { maxRooms, minRooms, minPrice, maxPrice } = queryParams;
			let { address, propertyType } = queryParams;
			address = address ? address.split(',').reverse() : '';
			propertyType = propertyType ? propertyType.split(',') : '';
			let query = {
				type: reType,
				price: {
					$gte: parseInt(!!minPrice ? minPrice : 0),
					$lte: parseInt(!!maxPrice ? maxPrice : 999999999),
				},
				'about.rooms': {
					$gte: parseInt(Boolean(minRooms) ? minRooms : 0),
					$lte: parseInt(Boolean(maxRooms) ? maxRooms : 12),
				},
				'address.city': address[0] ? address[0] : { $regex: '.*' },
				'address.street': address[1] ? address[1] : { $regex: '.*' },

				'about.type': !!propertyType ? { $in: propertyType } : { $regex: '.*' },
			};

			flats = await RealEstate.find(query);
		} else {
			flats = await RealEstate.find({ type: reType });
		}

		flats = formatEnteryDate(flats);

		res.send(flats);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});
module.exports = router;
