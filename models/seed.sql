USE ogs_db;

-- Locations seed data
INSERT INTO locations(zipcode,longitude,latitude,createdAt,updatedAt)
VALUES (98052,-122.1238767,47.6694141,CURRENT_DATE,CURRENT_DATE);

-- Listings seed data
INSERT INTO listings (title, description, image, item_quality, price, contactZip, contactEmail, ItemTypeName, createdAt, updatedAt)
VALUES ('tan sweater','this is an example sweater','https://lp2.hm.com/hmgoepprod?set=source[/cb/c5/cbc5b034e74c1475c03bf5b597d10bfb243b2696.jpg',1,29.99,98052, 'temp@email.com', 'clothing', CURRENT_DATE, CURRENT_DATE);