/* Insert producers */
INSERT INTO Producer (name)
VALUES ('Sebbemanne'), ('EcoGården'), ('Bondgården');

/* Insert categories */
INSERT INTO Category (name)
VALUES ('grönsaker'), ('kött'), ('frukt');

/* Insert products */
INSERT INTO Products (name, category_id, quantity, price, description, producer_id, image_url) 
VALUES ('T-bone steak', 2, 200, 299, 'Ko kött', 1, '/images/john-cameron-6-5Ul3I6vSE-unsplash.jpg');
 
INSERT INTO Products (name, category_id, quantity, price, description, producer_id, image_url) 
VALUES ('Apelsiner', 3, 19, 12, 'Ekologiska apelsiner.', 1, '/images/jen-gunter-A4BBdJQu2co-unsplash.jpg');
 
INSERT INTO Products (name, category_id, quantity, price, description, producer_id, image_url) 
VALUES ('Päron', 3, 200, 15, 'Ekologiska päron', 1, '/images/khloe-arledge-gHIABZ6roh0-unsplash.jpg');

INSERT INTO Products (name, category_id, quantity, price, description, producer_id, image_url) 
VALUES ('Red delicous, äpple', 3, 99, 15, 'Sensorisk beskrivning: Balanserad sötma viss syrlighet, fruktiga smaker av melon och blommiga toner. Krispig och frasig med spröd textur med viss saftighet.', 1, '/images/1560806887-1e4cd0b6cbd6.jpeg');

INSERT INTO Products (name, category_id, quantity, price, description, producer_id, image_url) 
VALUES ('Ryggbiff', 2, 56, 12, 'Ekologiskt griskött av bästa kvalitet.', 2, '/images/1603048297172-c92544798d5a.jpeg');

INSERT INTO Products (name, category_id, quantity, price, description, producer_id, image_url) 
VALUES ('Morötter', 1, 55, 10, 'Ekologiskt odlade morötter från mandelmanns gård.', 1, '/images/1598170845058-32b9d6a5da37.jpeg');

INSERT INTO Products (name, category_id, quantity, price, description, producer_id, image_url) 
VALUES ('Grönkål', 1, 33, 10, 'Ekologiskt grönkål odlad i Luleå, Norbotten.', 1, '/images/char-beck-5eM6sRTCCUc-unsplash.jpg');

INSERT INTO Products (name, category_id, quantity, price, description, producer_id, image_url) 
VALUES ('Gullök', 1, 25, 11, 'Ekologiskt odlad lök från Voullerim, Norbotten.', 1, '/images/lars-blankers-pmS8XSz5NU0-unsplash.jpg');

INSERT INTO Products (name, category_id, quantity, price, description, producer_id, image_url) 
VALUES ('Bananer', 3, 19, 11, 'Ekologiska bananer odlade inomhus i Luleå, Norbotten.', 1, '/images/ioana-cristiana-0WW38q7lGZA-unsplash.jpg');

INSERT INTO Products (name, category_id, quantity, price, description, producer_id, image_url) 
VALUES ('Griskött', 2, 199, 199, 'Ekologiskt griskött', 1, '/images/kyle-mackie-MEnlQv-EQvY-unsplash.jpg');