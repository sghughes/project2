USE ogs_db;

-- Locations seed data
INSERT INTO locations(zipcode,longitude,latitude,createdAt,updatedAt)
VALUES (98052,-122.1238767,47.6694141,CURRENT_DATE,CURRENT_DATE),
(98005,-122.1607932,47.6215654,CURRENT_DATE,CURRENT_DATE);

-- Listings seed data
INSERT INTO listings (title, description, image, item_quality, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('tan sweater','this is an example sweater','https://i.imgur.com/JxHDGfs.jpg',1,29.99,98052, 'temp@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);