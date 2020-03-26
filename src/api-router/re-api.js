const express = require('express');
const router = new express.Router();
const { addresses, test } = require('../db/israelAddress');
const RealEstate = require('../db/realEstateModel');
const moment = require('moment');
const he = require('convert-layout/he');
const Address =require('../db/addressModel')
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
// let=lastPageNum;
router.post('/api/real-estate/mongo-find-address', async (req, res) => {
	try {
		let { address } = req.body;
		//convert to hebrew letters
		address = he.fromEn(address.trim().replace(',', ' '));

		const options=await Address.find({

$or: [
{ street: {
'$regex': address,$options: 'i'
}},
{ city: {
'$regex': address,
$options: 'i'
}}
]

});
let cities=[],streets=[]
options.forEach(element => {
	cities.push({city:element.city});
	streets.push({element})
});
// const cities=await Address.find({
//  city: {
// '$regex': address,
// $options: 'i'
// }}
// ).map();
// const streets=await Address.find({
//  street: {
// '$regex': address,$options: 'i'
// }
// });
		//console.log('options',options);
console.log(cities, streets.slice(0, 10));

		res.send({ cities: cities.slice(0, 4), streets: streets.slice(0, 10) });
	} catch (e) {
		console.log(e);

		res.send(e);
	}
});
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
router.post('/api/real-estate/:id',async(req,res)=>{
console.log(req.body);

})

router.get('/api/real-estate/:id', async (req, res) => {
	try {
		const reType = req.params.id;
		const queryParams = req.query;
		const page = req.header('page');
		const sortOptions = JSON.parse(req.header('sortOptions'));
		console.log(sortOptions);
		console.log(queryParams);
		let flats;
		//if (!!queryParams) {
		const query = createFindQuery(queryParams, reType, sortOptions);
		const factor = 10;
		const pageNum = await RealEstate.countDocuments(query);
		flats = await RealEstate.find(query)
			.sort(sortby[sortOptions.sortBy])
			.skip(page * factor - factor)
			.limit(factor);
		// } else {
		// 	flats = await RealEstate.find({ type: reType }).sort('-updatedAt');
		// }

		flats = formatEnteryDate(flats);

		res.send({ re: flats, pageNum: pageNum / factor });
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});
module.exports = router;
