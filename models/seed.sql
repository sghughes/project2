USE ogs_db;

INSERT INTO listings (title, description, image, item_quality, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('tan sweater','this is an example sweater','https://i.imgur.com/JxHDGfs.jpg',1,29.99,98052, 'temp@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);