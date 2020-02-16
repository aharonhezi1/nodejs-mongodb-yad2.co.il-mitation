const express = require('express');
const app = express();
const moment = require('moment');
const cors = require('cors');
require('./db/mongoose.js');
const { addresses, test } = require('./db/israelAddress');

const port = process.env.PORT;
app.use(cors());
app.use(express.json());
const RealEstate = require('./db/realEstateModel');

app.post('/api/real-estate/find-address', (req, res) => {
	try {
		let { address } = req.body;

		address = address
			.trim()
			.split(' ')
			.filter(ad => ad !== ''); 
		let options = [];
		const BreakException = {};
		let cities = [],
			streets = [];
		for (let i = address.length; i > 0; i--) {
			for (let j = 0; j + i <= address.length; j++) {
				options.push(address.slice(j, j + i).join(' '));
			}
		}
		console.log('options: ', options);

		options.forEach((option) => {
			const length = option.length;
			try {
				addresses.forEach((address,i) => {
					const city = address.city.slice(0, length);
					const street = address.street.slice(0, length);

					if (street === option) {
						// || (options[i+1]&&street === (option+" "+options[i+1]))) {
						streets.push(address);
					}
					if (city === option && cities.indexOf(address.city) === -1) {
						// || (options[i+1]&&city === (option+" "+options[i+1])) )&& cities.indexOf(address.city) === -1) {
						cities.push(address.city);
					}
					if (cities.length + streets.length > 12 && cities.length > 2 && streets.length > 2)
						throw BreakException;
				});
			} catch (e) {
				if (e !== BreakException) throw e;
			}
		});
		res.send({ cities, streets: streets.slice(0, 7) });
	} catch (e) {
		console.log(e);

		res.send(e);
	}
});
app.get('/api/real-estate/:id', async (req, res) => {
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

		flats = flats.map(flat => {
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
		res.send(flats);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
});
app.listen(port, () => {
	console.log('Server ' + port + ' started!');
});
