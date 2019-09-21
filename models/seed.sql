USE ogs_db;

TRUNCATE locations;
TRUNCATE listings;

-- Locations seed data
INSERT INTO locations(zipcode,longitude,latitude,name,createdAt,updatedAt)
VALUES (98052,-122.1238767,47.6694141,'Redmond, WA',CURRENT_DATE,CURRENT_DATE),
(98005,-122.1607932,47.6215654,'Bellevue, WA',CURRENT_DATE,CURRENT_DATE);

-- Listings seed data
INSERT INTO listings (title, description, image, itemQuality, properties, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('tan sweater','Supreme brand sweater that says COMME des GARCONS SHIRT SUPREME. Not sure what that means, but the shirt is pretty nice.','https://i.imgur.com/JxHDGfs.jpg', 3, '{"color":"tan","size":"m","type":"sweater","gender":"mens"}', 17.00, 98052, 'supreme-commander@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('denim Jacket','Like-new denim jacket just waiting for you to bedazzle it.','https://i.imgur.com/aGF0jqg.jpg',2, '{"color": "blue", "size":"m","type":"coat","gender":"womens"}', 20.00, 98004, 'robinsparkles@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('polo shirt','Orange polo shirt I wore only once to the Jonas Brothers concert last month.','https://i.imgur.com/CITZ0I1.jpg', 2, '{"color": "orange", "size":"m","type":"shirt","gender":"mens"}',15.00,98004, 'nickandjoeandkevin@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('black T-shirt','My favorite black shirt that I unfortunately have outgrown.','https://i.imgur.com/NR8uV1Z.jpg',4, '{"color": "black", "size":"l","type":"shirt","gender":"mens"}', 5.00, 98004, 'ozzyosb@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('blue dress','Selling this dress that I wore to senior prom. Prom sucked which is why I am getting rid of this gorgeous dress. Posting stock photo of the dress.', 'https://i.imgur.com/87jtKwV.jpg', 2, '{"color": "blue", "size":"s","type":"dresses","gender":"womens"}', 30.00, 98004, 'adamisaloser@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('black and white dress','This is a used dress that I need to sell as I have just too many dresses and not enough space in my closet.','https://i.imgur.com/20a5UF2.jpg', 1, '{"color": "white", "size":"l","type":"dresses","gender":"womens"}', 32.00, 98101, 'jlawrence@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('denim pants','New pair of pants. Never worn outside. They are very comfortable.','https://i.imgur.com/XSLDj2p.jpg', 1, '{"color": "blue", "size":"l","type":"pants","gender":"mens"}', 13.00, 98382, 'temp8@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('board shorts','One pair of board shorts purchased on the Santa Cruz Boardwalk. Worn in the ocean a number of times but they are in pretty sweet condition.','https://i.imgur.com/1ATBOVX.jpg', 2, '{"color": "blue", "size":"m","type":"shorts","gender":"mens"}', 10.00, 95060, 'scottsvalley@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('shirt', 'White shirt with mustard stain', 'https://i.imgur.com/sn4nccn.jpg', 5, '{"color": "white", "size":"l","type":"shirt","gender":"na"}', 5.00, 98055, 'marinersfan55@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('harry potter shirt', 'Gryffindor Quidditch shirt. Comes with the clothes hanger. Buy this shirt to be cool like Harry, Ron and Hermione', 'https://imgur.com/yLTNZDM.jpg', 3, '{"color": "red", "size":"l","type":"shirt","gender":"mens"}', 10.00, 98225, 'wizard-4-life@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('garnder minshew mustache shirt', 'Crimson Gardner Minshew mustache shirt from 2018. This shirt is no longer available and as you can see, it is rad. Selling because I have 3 of them.', 'https://imgur.com/H461Soz.jpg', 2, '{"color": "red", "size":"m","type":"shirt","gender":"na"}', 75.00, 98072, 'mustachemafia13@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('north face jacket', 'Black North Face jacket. Perfect the the rainy weather that we get here in WA. Good condition. No rips, no stains.', 'https://imgur.com/1LM6SpP.jpg', 3, '{"color": "black", "size": "l", "type": "coat","gender":"mens"}', 90.00, 98272, 'biketowork@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('long down coat', 'Brown down coat. Keeps you nice and warm. Selling becuase I just got a newer, nicer one.', 'https://imgur.com/D058NdZ.jpg', 3, '{"color": "brown", "size": "l", "type": "coat","gender":"womens"}', 50.00, 98221, 'pippylongstocking@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('pink donal duck shirt', 'Short sleeve Donald Duck tshirt. Purchased at Disney Land in FL.', 'https://i.imgur.com/YaePNXk.jpg', 3, '{"color": "pink", "size": "s", "type": "shirts","gender":"womens"}', 10.00, 98375, '2chainz@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('gold hammer (parachute) pants', 'Classic Hammer pants from the early 90s. Buying these will just about guarantee you a date next weekend.', 'https://i.imgur.com/kUcyDrl.jpg', 3, '{"color": "other", "size": "l", "type": "pants","gender":"na"}', 15.00, 98188, 'icecube@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('purple track shorts', 'No longer need these.', 'https://i.imgur.com/8lGYJCr.jpg', 4, '{"color": "purple", "size": "m", "type": "shorts","gender":"womens"}', 5.00, 98188, 'joggingmcjogster@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('sweater','Striped sweater for sale','https://i.imgur.com/IBtkDeS.jpg',4, '{"color": "blue", "size":"s","type":"sweaters","gender":"womens"}', 30, 98007, 's.johnson@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('Dress Shirt','Lightly used mens Shirt','https://i.imgur.com/bv3W65f.png',2, '{"color": "blue", "size":"l","type":"shirts","gender":"mens"}', 15, 50310, 'shirt@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('Purple T-Shirt','Shirt shrunk in the wash and does not fit anymore.','https://i.imgur.com/JUmlnAK.png',3, '{"color": "purple", "size":"l","type":"shirts","gender":"mens"}', 15, 98011, 'shirt@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('Pink Skirt','Perfect party skirt','https://i.imgur.com/seQ5Z7n.jpg',2, '{"color": "pink", "size":"m","type":"skirts","gender":"womens"}', 15, 98011, 'skirt1234@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('Prom Dress','Bought this dress for prom, but found one I like better. This is brand new!','https://i.imgur.com/gylfhv7.png',1, '{"color": "black", "size":"xs","type":"dresses","gender":"womens"}', 50, 98020, 'sell1234@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('Womens Running Shorts','Almost new pink running shorts','https://i.imgur.com/Jf0xr6z.png',2, '{"color": "pink", "size":"s","type":"shorts","gender":"womens"}', 5, 98046, 'runner@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('Womens Ski Pants','Well worn, but still perfectly usable.','https://i.imgur.com/vvE69qC.png',4, '{"color": "black", "size":"l","type":"pants","gender":"womens"}', 5, 98059, 'j.smith@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('Womens Coat','Warm coat for sale!','https://i.imgur.com/ZHpY2jG.jpg',4, '{"color": "black", "size":"xs","type":"coat","gender":"womens"}', 5, 98059, 'l.smith@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('Plaid shirt','Warm by local legend while destroying his competition in a LEGO MINDSTORMS EV3 contest','https://i.imgur.com/02BlezI.png', 2, '{"color": "other", "size":"l","type":"shirt","gender":"mens"}', 22, 98005, 'theBroCoder@msn.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('red pea coat','Red, long peacoat. Size small, really good condition.','https://i.imgur.com/cNVyrjN.jpg', 2, '{"color": "red", "size":"s","type":"coat","gender":"womens"}', 35, 98290, 'leslieKnope@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('UW Husky shirt', 'Commemorative University of Washington long sleeve shirt from their historic 2008 football season.', 'https://i.imgur.com/oMVWCrY.jpg', 1, '{"color": "purple", "size": "l", "type": "shirt","gender":"mens"}', 20.00, 98034, 'dbledsoe@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE);


-- Free Listings seed data
INSERT INTO listings (title, description, image, itemQuality, properties, isFree, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('free angry shorts','These shorts are just too angry to hold onto...','https://i.imgur.com/kR5kfEO.jpg',3, '{"color": "tan", "size":"l","type":"shorts","gender":"mens"}', true,98375, 'shorts-master@yahoo.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('free ugly Christmas sweater', 'I have too many ugly Christmas sweaters. You can have it if you come get it.' ,'https://i.imgur.com/XPRn6i8.jpg',3, '{"color": "black", "size":"s","type":"sweaters","gender":"womens"}', true, 98040, 'vegasin07@yahoo.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('free vintage jean skirt', 'Channel your inner Madonna and buy this gently used skirt today (snap bracelets not included).', 'https://i.imgur.com/iAzS7tg.jpg', 3, '{"color": "blue", "size": "l", "type": "skirts","gender":"womens"}', true, 98101, 'punkrawkgirl88@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('Work our tshirts','3 very nice workout shirts that I no longer need/want. They are yours for free if you want them.','https://i.imgur.com/ai8RVX0.jpg', 2, '{"color": "other", "size":"xl","type":"shirts","gender":"womens"}', true, 98201, 'panther18@gmail.com', 'clothing', CURRENT_DATE, CURRENT_DATE);

-- Distance seed data
insert into distances (zipSrc,zipDest,milesText,milesValue,createdAt,updatedAt)
values (98052,99901,"674 mls",674.238,CURRENT_DATE,CURRENT_DATE);
