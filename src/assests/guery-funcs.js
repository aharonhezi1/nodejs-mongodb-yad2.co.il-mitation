
 function createFindQuery(queryParams,reType,sortOptions){
	 const {isOnlyWithPic,isOnlyWithPrice}=sortOptions
    const { maxRooms, minRooms, minPrice, maxPrice } = queryParams;
			let { address, propertyType } = queryParams;
			address = address ? address.split(', ').reverse() : '';
		
			propertyType = propertyType ? propertyType.split(',') : '';
			const query = {
				type: reType,
				pictures:isOnlyWithPic?{ $regex: '.*' }:{"$exists": true } ,
				price: {
					$gte: parseInt(!!minPrice ? minPrice :Boolean(isOnlyWithPrice) ?1:0),
					$lte: parseInt(!!maxPrice ? maxPrice : 999999999),
				},
				'about.rooms': {
					$gte: parseFloat(Boolean(minRooms) ? minRooms : 0),
					$lte: parseFloat(Boolean(maxRooms) ? maxRooms : 12),
				},
				'address.city': address[0] ? address[0] : { $regex: '.*' },
				'address.street': address[1] ? address[1] : { $regex: '.*' },

				'about.type': !!propertyType ? { $in: propertyType } : { $regex: '.*' },
			};
    return query;
}
module.exports={createFindQuery}