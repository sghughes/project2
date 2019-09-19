use ogs_db;

-- Locations seed data
INSERT INTO locations(zipcode,longitude,latitude,createdAt,updatedAt)
VALUES (98052,-122.1238767,47.6694141,CURRENT_DATE,CURRENT_DATE),
(98005,-122.1607932,47.6215654,CURRENT_DATE,CURRENT_DATE);

-- Listings seed data
INSERT INTO listings (title, description, image, itemQuality, properties, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('tan sweater','this is an example sweater','https://i.imgur.com/JxHDGfs.jpg',1, '{"color":"white","size":"xl","type":"sweater","gender":"mens"}',29.99,98052, 'temp@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('dennim Jacket','this is an example dennim','https://i.imgur.com/aGF0jqg.jpg',2, '{"color": "blue", "size":"m","type":"jacket","gender":"womens"}',09.99,98004, 'temp3@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('Polo Shirt','this is an example polo tshirt','https://i.imgur.com/CITZ0I1.jpg',2, '{"color": "yellow", "size":"m","type":"shirt","gender":"womens"}',15.99,98004, 'temp5@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('Black T-shirt','this is an example black tshirt','https://i.imgur.com/ps3GKHJ.jpg',3, '{"color": "black", "size":"l","type":"shirt","gender":"womens"}', 15.99,98004, 'temp5@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('Blue dress','this is beautiful dress','https://i.imgur.com/d4QWF4R.jpg',1, '{"color": "blue", "size":"m","type":"dress","gender":"womens"}', 25.99,98004, 'temp6@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('party dress','this is beautiful dress','https://i.imgur.com/9fD6kpo.jpg',1, '{"color": "black", "size":"xl","type":"dress","gender":"womens"}', 20.99,98004, 'temp7@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('denim pant','this is denim pant','https://i.imgur.com/XSLDj2p.jpg',5, '{"color": "blue", "size":"l","type":"pants","gender":"mens"}', 10.99,98052, 'temp8@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('Relax pant','this is like new pant','https://i.imgur.com/UItMtDy.jpg',2, '{"color": "tan", "size":"xl","type":"pants","gender":"mens"}', 12.99,98052, 'temp9@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('tan sweater','this is an example sweater','https://i.imgur.com/jmi0xGs.jpg',1, '{"color": "tan", "size":"l","type":"sweater","gender":"mens"}', 29.99,98052, 'temp@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('cargo pant','this is an example pant','https://i.imgur.com/sQmPkWr.jpg',2, '{"color": "blue", "size":"m","type":"pants","gender":"mens"}', 11.99,98053, 'temp12@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE),
('dress','this is an example red dress','https://i.imgur.com/ej08wfU.jpg',4, '{"color": "red", "size":"s","type":"dress","gender":"womens"}', 21.99,98007, 'temp11@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);

-- Free Listings seed data
-- TODO!