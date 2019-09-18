use ogs_db;
INSERT INTO listings (title, description, image, item_quality, properties, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('dress','this is an example red dress','https://i.imgur.com/ej08wfU.jpg',2, '{"color": "red", "size":"s","type":"dress","gender":"womens"}', 21.99,98007, 'temp11@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);

INSERT INTO listings (title, description, image, item_quality, properties, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('dennim Jacket','this is an example dennim','https://i.imgur.com/aGF0jqg.jpg',2, '{"color": "blue", "size":"m","type":"jacket","gender":"womens"}',09.99,98004, 'temp3@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);

INSERT INTO listings (title, description, image, item_quality, properties, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('Polo Shirt','this is an example polo tshirt','https://i.imgur.com/CITZ0I1.jpg',2, '{"color": "yellow", "size":"m","type":"t-shirt","gender":"womens"}',15.99,98004, 'temp5@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);


INSERT INTO listings (title, description, image, item_quality, properties, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('Black T-shirt','this is an example black tshirt','https://i.imgur.com/ps3GKHJ.jpg',3, '{"color": "black", "size":"l","type":"t-shirt","gender":"womens"}', 15.99,98004, 'temp5@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);

INSERT INTO listings (title, description, image, item_quality, properties, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('Blue dress','this is beautiful dress','https://i.imgur.com/d4QWF4R.jpg',1, '{"color": "blue", "size":"m","type":"dress","gender":"womens"}', 25.99,98004, 'temp6@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);

INSERT INTO listings (title, description, image, item_quality, properties, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('party dress','this is beautiful dress','https://i.imgur.com/9fD6kpo.jpg',1, '{"color": "black", "size":"xl","type":"dress","gender":"womens"}', 20.99,98004, 'temp7@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);

INSERT INTO listings (title, description, image, item_quality, properties, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('denim pant','this is denim pant','https://i.imgur.com/XSLDj2p.jpg',6, '{"color": "light blue", "size":"l","type":"pant","gender":"mens"}', 10.99,98052, 'temp8@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);

INSERT INTO listings (title, description, image, item_quality, properties, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('Relax pant','this is like new pant','https://i.imgur.com/UItMtDy.jpg',2, '{"color": "tan", "size":"xl","type":"pant","gender":"mens"}', 12.99,98052, 'temp9@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);

INSERT INTO listings (title, description, image, item_quality, price, properties, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('tan sweater','this is an example sweater','https://i.imgur.com/jmi0xGs.jpg',1, '{"color": "tan", "size":"l","type":"sweater","gender":"mens"}', 29.99,98052, 'temp@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);

INSERT INTO listings (title, description, image, item_quality, properties, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('cargo pant','this is an example pant','https://i.imgur.com/sQmPkWr.jpg',2, '{"color": "dark blue", "size":"m","type":"pant","gender":"mens"}', 11.99,98053, 'temp12@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);
select * from listings;