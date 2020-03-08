const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/realEstate', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("we're connected to db!"));
// const housePicsLinks=[

// ]
const { housePics, roomPics } = require('./pics');

const RealEstate = require('./realEstateModel');
const User = require('./userModel');

const realEstates = [
	{
		owner: new mongoose.mongo.ObjectId("5e64a91e9381aa65471f4b89"),
		address: { city: 'מבוא חורון', street: 'יפה נוף', number: 345 },
		price: 2000000,
		pictures: [housePics[0], roomPics[0]],
		description:
			'דירה למגורים ולהשקעה ודאית! הדירה במתחם שאושר לעסקת פינוי-בינוי חתומה מול יזם, בליווי העירייה והמדינה בהליך מואץ לביצוע. דירת התמורה החדשה: 5 חדרים + מרפסת וחניה.',
		propertyDetails: {
			airConditioner: true,
			warhouse: true,
			balcony: true,
			accessibility: false,
			renovated: false,
			bars: false,
			elevator: true,
			parking: false,
			accessibility: true,
			kosher: true,
			furniture: ' נמכרת עם תכולה מלאה ( ריהוט, מכשירי חשמל, מזגנים בכל החדרים , גופי תאורה, ארונות קיר)',
		},
		about: {
			type: 'apartment',
			shelter: true,
			//bathroom:{...detail},
			//storeroom:{...detail},
			enteryDate: new Date('Wed Feb 15 2020 15:54:54 GMT+0200 (Israel Standard Time)'),
			//rented:,
			rooms: 9,
			enteryFromStreet: true,
			floor: 5,
			squaremeter: 100,
			//meetingRoom:{...detail},
			//  rentedTill:{type:Date,default:'not specified'},
		},
	},
	{
		owner: new mongoose.mongo.ObjectId('5e64a91e9381aa65471f4b89'),
		address: { city: 'מבוא חורון', street: 'יפה נוף', number: 345 },
		price: 0,
		pictures: [housePics[0], housePics[0]],
		description:
			'דירה למגורים ולהשקעה ודאית! הדירה במתחם שאושר לעסקת פינוי-בינוי חתומה מול יזם, בליווי העירייה והמדינה בהליך מואץ לביצוע. דירת התמורה החדשה: 5 חדרים + מרפסת וחניה.',
		propertyDetails: {
			airConditioner: true,
			warhouse: true,
			balcony: true,
			accessibility: false,
			renovated: false,
			bars: false,
			elevator: true,
			parking: false,
			accessibility: true,
			kosher: true,
			furniture: ' נמכרת עם תכולה מלאה ( ריהוט, מכשירי חשמל, מזגנים בכל החדרים , גופי תאורה, ארונות קיר)',
		},
		about: {
			type: 'apartment',
			shelter: true,
			//bathroom:{...detail},
			//storeroom:{...detail},
			enteryDate: new Date('Wed Feb 15 2020 15:54:54 GMT+0200 (Israel Standard Time)'),
			//rented:,
			rooms: 9,
			enteryFromStreet: true,
			floor: 5,
			squaremeter: 100,
			//meetingRoom:{...detail},
			//  rentedTill:{type:Date,default:'not specified'},
		},
	},
	{
		owner: new mongoose.mongo.ObjectId('5e64a91e9381aa65471f4b89'),
		address: { city: 'רחובות', street: 'חזון איש', neighborhood: 'רחובות הצעירה', number: 4 },
		price: 3000000,
		//pictures: [housePics[1], roomPics[1]],
		description:
			'למכירה בהזדמנות בעיר רחובות!! ברחובות הצעירה בנין חדש משנת 2014 דירת גן 4 חדרים 100 מ"ר ממ"ד עם חלון חצר 100 מ"ר 2 חדרי רחצה מזגנים בכל הדירה 2 שירותים 2 מעליות 2 חניות לא עוקבות',
		propertyDetails: {
			airConditioner: true,
			warhouse: true,
			balcony: true,
			accessibility: true,
			renovated: true,
			bars: true,
			elevator: true,
			parking: false,
			accessibility: true,
			kosher: true,
			// furniture:'dining table and chairs'
		},
		about: {
			type: 'apartment',
			shelter: true,
			//bathroom:{...detail},
			//storeroom:{...detail},
			enteryDate: new Date('Wed Jan 1 2020 15:54:54 GMT+0200 (Israel Standard Time)'),
			//rented:,
			enteryFromStreet: false,
			floor: 12,
			squaremeter: 80,
			rooms: 3,
			//meetingRoom:{...detail},
			//  rentedTill:{type:Date,default:'not specified'},
		},
	},
	{
		owner: new mongoose.mongo.ObjectId('5e64a91e9381aa65471f4b8a'),
		address: { city: 'רחובות', street: 'חזון איש', neighborhood: 'רחובות הצעירה', number: 4 },
		price: 3000000,
		pictures: [housePics[1], roomPics[1]],
		description:
			'למכירה בהזדמנות בעיר רחובות!! ברחובות הצעירה בנין חדש משנת 2014 דירת גן 4 חדרים 100 מ"ר ממ"ד עם חלון חצר 100 מ"ר 2 חדרי רחצה מזגנים בכל הדירה 2 שירותים 2 מעליות 2 חניות לא עוקבות',
		propertyDetails: {
			airConditioner: true,
			warhouse: true,
			balcony: true,
			accessibility: true,
			renovated: true,
			bars: true,
			elevator: true,
			parking: false,
			accessibility: true,
			kosher: true,
			// furniture:'dining table and chairs'
		},
		about: {
			type: 'apartment',
			shelter: true,
			//bathroom:{...detail},
			//storeroom:{...detail},
			enteryDate: new Date('Wed Jan 1 2020 15:54:54 GMT+0200 (Israel Standard Time)'),
			//rented:,
			enteryFromStreet: false,
			floor: 12,
			squaremeter: 80,
			rooms: 3,
			//meetingRoom:{...detail},
			//  rentedTill:{type:Date,default:'not specified'},
		},
	},
	{
		
		owner: new mongoose.mongo.ObjectId('5e64a91e9381aa65471f4b8a'),
		address: { city: 'להבים', street: 'נחל ירוחם', number: 9 },
		price: 3500000,
		pictures: [housePics[2], roomPics[2]],
		description:
			'וילה חדשה פונקציונאלית ויוקרתית בשרונית מושקעת מאוד , מרוהטת ומעוצבת סוויטת הורים ענקית ומפוארת. מחסן חיצוני בנוי עם הכנה לקליניקה/משרד 3 שירותים ומקלחות. גינה ,מערכות מיגון וחימום מים על גז.',
		propertyDetails: {
			airConditioner: true,
			warhouse: true,
			balcony: true,
			accessibility: false,
			renovated: false,
			bars: false,
			elevator: true,
			parking: 2,
			accessibility: false,
			kosher: false,
			// furniture:'dining table and chairs'
		},
		about: {
			type: 'private house',
			shelter: true,
			//bathroom:{...detail},
			//storeroom:{...detail},
			enteryDate: new Date('Wed Jan 15 2020 15:54:54 GMT+0200 (Israel Standard Time)'),
			//rented:,
			enteryFromStreet: false,
			floor: 2,
			squaremeter: 105,
			rooms: 4,
			//meetingRoom:{...detail},
			//  rentedTill:{type:Date,default:'not specified'},
		},
	},
	{
		owner: new mongoose.mongo.ObjectId('5e64a91e9381aa65471f4b8a'),
		address: { city: 'נתניה', street: 'אייר', neighborhood: 'קרית השרון', number: 4 },
		price: 100000,
		pictures: [housePics[3], roomPics[3]],
		description:
			'פנטהאוז מדהים ומושקע , פונה לשדות של אבן יהודה ללא ביניינים קרובים משום צד. מרפסת 100 מטר מדהימה ומאובזרת',
		propertyDetails: {
			airConditioner: true,
			warhouse: true,
			balcony: true,
			accessibility: false,
			renovated: true,
			bars: true,
			elevator: true,
			parking: 1,
			accessibility: false,
			kosher: true,
			furniture: 'ארונות קיר ושידות',
		},
		about: {
			type: 'penthouse',
			shelter: true,
			//bathroom:{...detail},
			//storeroom:{...detail},
			enteryDate: new Date('Wed Jan 15 2021 15:54:54 GMT+0200 (Israel Standard Time)'),
			rented: true,
			enteryFromStreet: true,
			floor: 9,
			squaremeter: 200,
			rooms: 2,
			//meetingRoom:{...detail},
			//  rentedTill:{type:Date,default:'not specified'},
		},
	},
	{
		owner: new mongoose.mongo.ObjectId('5e64a91e9381aa65471f4b8a'),
		address: { city: 'ירושלים', street: 'נשר', neighborhood: 'גילה', number: 4 },
		price: 3500000,
		pictures: [housePics[4], roomPics[4]],
		type: 'forRent',
		description:
			'3 כיווני אוויר הבית היחיד בנשר עם נוף של כל ירושלים בית אחרי שיפוץ כללי הכול כולל הכול אופציה לבניה ולהרחבה חימום מזגנים וגם יונקרס חשמל תלת פאזי תריסים חשמליים',
		propertyDetails: {
			airConditioner: true,
			warhouse: true,
			balcony: true,
			accessibility: true,
			renovated: true,
			bars: true,
			elevator: true,
			parking: 1,
			accessibility: true,
			kosher: true,
			furniture: 'לפי הקיים במלאי וללא תוספת במחיר השכירות',
		},
		about: {
			type: 'duplex',
			shelter: true,
			//bathroom:{...detail},
			//storeroom:{...detail},
			enteryDate: new Date('Wed Jan 15 2021 15:54:54 GMT+0200 (Israel Standard Time)'),
			rented: true,
			enteryFromStreet: true,
			floor: 9,
			squaremeter: 200,
			rooms: 1,
			//meetingRoom:{...detail},
			//  rentedTill:{type:Date,default:'not specified'},
		},
	},
	{
		owner: new mongoose.mongo.ObjectId('5e64a91e9381aa65471f4b89'),
		address: { city: 'דימונה', street: 'שדרות ירושלים', neighborhood: 'ממשית', number: 19 },
		price: 2700000,
		pictures: [housePics[4], roomPics[4]],
		type: 'forRent',
		description:
			'בית קרקע עם שתי חצרות, אחת מקדימה ואחת מאחור. הבית משופץ ומוכן לכניסה. שכנים טובים מאוד. כניסה באוגוסט. אפשר לקנות לפני ולהחזיק את השוכרים שנמצאים כרגע. נא להתקשר למספר טלפון השני במודעה - אורי.',
		propertyDetails: {
			airConditioner: true,
			warhouse: true,
			balcony: true,
			accessibility: true,
			renovated: true,
			bars: true,
			elevator: true,
			parking: 1,
			accessibility: true,
			kosher: true,
			furniture: 'ארונות בכל הדירה, סלון, שטיחים, מיטת עמינח, חדר שינה ועוד. כולל דברי חשמל.',
		},
		about: {
			type: 'vacation house',
			shelter: true,
			//bathroom:{...detail},
			//storeroom:{...detail},
			enteryDate: new Date('Wed Jan 15 2021 15:54:54 GMT+0200 (Israel Standard Time)'),
			rented: true,
			enteryFromStreet: true,
			floor: 9,
			squaremeter: 200,
			rooms: 1,
			//meetingRoom:{...detail},
			//  rentedTill:{type:Date,default:'not specified'},
		},
	},
];
users = [
	{
		name: 'Shimon',
		email: 'Shimon@gmail.com',
		password: 'Shimon',
		phone: '555-1234',
	},
	{
		name: 'Shimon2',
		email: 'Shimon2@gmail.com',
		password: 'Shimon2',
		phone: '666-1234',
	},
];
//  User.insertMany(users ,e => console.log(e))
//User.remove({}, () => console.log('remove'));
// realEstates.forEach(re => {	new RealEstate(re).save(e => console.log(e));});

//RealEstate.remove({}, ()=>console.log('remove'));
for(let i=0;i<10;i++){
	RealEstate.insertMany(realEstates, e => console.log(e));
}
RealEstate.insertMany(realEstates, e => console.log(e));

// async function setToken(){
// const users=await User.find()
// //console.log(users);

// users.forEach(u=>{
// 	//console.log(process.env)
// 	u.generateAuthToken()
// })}

// setToken()
