function createFindQuery(queryParams, reType, sortOptions) {
	const { isOnlyWithPic, isOnlyWithPrice } = sortOptions;
	const {
		maxRooms,
		minRooms,
		minPrice,
		maxPrice,
		enteryDate,
		minSize,
		maxSize,
		minFloor,
		maxFloor,
		freeSearch,
	} = queryParams;
	let { address, propertyType, characteristics } = queryParams;
	console.log(queryParams);

	address = address ? address.split(', ').reverse() : '';

	propertyType = propertyType ? propertyType.split(',') : '';
	characteristics = characteristics ? characteristics.split(',') : '';
	let query = {
		type: reType,
		pictures: isOnlyWithPic ? { $regex: '.*' } : { $exists: true },
		price: {
			$gte: parseInt(!!minPrice ? minPrice : Boolean(isOnlyWithPrice) ? 1 : 0),
			$lte: parseInt(!!maxPrice ? maxPrice : 999999999),
		},
		'about.enteryDate': enteryDate ? { $lte: new Date(enteryDate) } : { $exists: true },
		'about.rooms': {
			$gte: parseFloat(Boolean(minRooms) ? minRooms : 0),
			$lte: parseFloat(Boolean(maxRooms) ? maxRooms : 12),
		},
		'about.floor': {
			$gte: parseInt(Boolean(minFloor) ? minFloor : -1),
			$lte: parseInt(Boolean(maxFloor) ? maxFloor : 100),
		},
		'about.squaremeter': {
			$gte: parseInt(Boolean(minSize) ? minSize : 0),
			$lte: parseInt(Boolean(maxSize) ? maxSize : 999999999),
		},
		'address.city': address[0] ? address[0] : { $regex: '.*' },
		'address.street': address[1] ? address[1] : { $regex: '.*' },

		'about.type': !!propertyType ? { $in: propertyType } : { $regex: '.*' },
		//$text:{$search:freeSearch}
	};
	query = Object.assign(query, createFreeSearchQuery(freeSearch));
	query = Object.assign(query, createPropertyDetailsQuery(characteristics));
	//console.log(query);
	
	return query
}
function createPropertyDetailsQuery(characteristics) {
	let query = {};
	if (!!characteristics) {
		characteristics.forEach(characteristic => {
			query = { ...query, ['propertyDetails.' + characteristic]: true };
		});
	}
	return query;
}
function createFreeSearchQuery(serchStr) {
	if (serchStr) return { $text: { $search: serchStr } };
}
module.exports = { createFindQuery };
