-- Insert producers
INSERT INTO Producer (
    name,
    image_url,
    description,
    location,
    contact
)
VALUES
    ('Sebbemannen', '/images/PhotoFunia-1638809703.jpg', 'Med tio år inom den ekologiska branschen ser vi oss som en ledande kraft i kampen att rädda världen. Våran ledare Sebastian "SebbeMannen" styr oss mot ett mer fridfullt samhälle där ekologisk kost är en grundsten. Våra produkter är helt utan konserveringsmedel och bekämpningsmedel.', 'Luleå', 'sebbe@sebbeseko.se'), 
    ('EcoGården', '/images/rajesh-ram-HOOKgN_zIY8-unsplash.jpg', 'På Ecogården är vårt mål att göra ekologisk mat lika billig som oekologisk mat. Att genomföra detta är inte lätt men till vår hjälp har vi vårat högteknologiska växthus i Vuollerim som gör att vi kan producera grönsaker och frukt året om!', 'Vuollerim', 'ecogården@sebbeseko.se'), 
    ('Bondgården', '/images/gregory-hayes-QFmNQXLPbZc-unsplash.jpg', 'Hos oss ser vi varje djur som en egen individ som har rättigheter. Vi tycker att djur ska ha samma förutsättningar som människor att leva ett bra liv innan de slaktas. Detta gör att vi kan producera ekologiskt kött med gott samvete.', 'Silicon Valley', 'bonden@sebbeseko.se');

-- Insert categories
INSERT INTO Category (name)
VALUES
    ('grönsaker'),
    ('kött'),
    ('frukt');

-- Insert products
-- Frukt
INSERT INTO Products (
    name,
    category_id,
    quantity,
    price,
    description,
    producer_id,
    image_url
)
VALUES
    ('Apelsiner', 3, 19, 12, 'Ekologiska apelsiner. Smakrikt och saftigt med en fin balans mellan sötma och syra. Matt, tämligen tjockt skal och med ett fast gult fruktkött som ibland ha rinslag av rosaröd färg.', 1, '/images/jen-gunter-A4BBdJQu2co-unsplash.jpg'),
    ('Päron', 3, 200, 15, 'Ekologiska päron. Ett päron med hög doftintensitet med både gräsiga och jordiga dofter. Mjölig konsistens och relativ hög smakintensitet med tydlig sötma. ', 1, '/images/khloe-arledge-gHIABZ6roh0-unsplash.jpg'),
    ('Red delicous, äpple', 3, 99, 15, 'Ekologiska äpplen. Balanserad sötma viss syrlighet, fruktiga smaker av melon och blommiga toner. Krispig och frasig med spröd textur med viss saftighet.', 1, '/images/1560806887-1e4cd0b6cbd6.jpeg'),
    ('Bananer', 3, 19, 11, 'Ekologiska bananer odlade inomhus i Luleå, Norbotten. Smaken är väldigt söt med lite inslag av beskhet också.', 1, '/images/ioana-cristiana-0WW38q7lGZA-unsplash.jpg');

-- Kött
INSERT INTO Products (
    name,
    category_id,
    quantity,
    price,
    description,
    producer_id,
    image_url
)
VALUES
    ('Ryggbiff', 2, 56, 12, 'Ekologiskt griskött av bästa kvalitet. Torrt, trådigt och smuligt kött, upplevs som mört. Doft av kryddor och örter och tydlig sötma.', 3, '/images/1603048297172-c92544798d5a.jpeg'),
    ('Griskött', 2, 199, 199, 'Ekologiskt griskött. Ett saftigt kött med högt tuggmotstånd. Både hög doft- och smakintensitet, gör sig bäst till en kall Norrlands.', 3, '/images/kyle-mackie-MEnlQv-EQvY-unsplash.jpg'),
    ('T-bone steak', 2, 200, 299, 'Ekologiskt kött från nöt. Mycket saftigt, mjukt och mört kött. Hög smakintensitet och sötma med smak av buljong', 3, '/images/john-cameron-6-5Ul3I6vSE-unsplash.jpg');
 
-- Grönsaker
INSERT INTO Products (
    name,
    category_id,
    quantity,
    price,
    description,
    producer_id,
    image_url
)
VALUES
    ('Morötter', 1, 55, 10, 'Ekologiskt odlade morötter från vårt växthus i Vuollerim. Klar orange färg, smaken kan beskrivas som gudomlig.', 2, '/images/1598170845058-32b9d6a5da37.jpeg'),
    ('Grönkål', 1, 33, 10, 'Ekologiskt grönkål odlad i Luleå, Norbotten. Ljus och fin grön färg, utmärkt smak med tydliga inslag av nöt och jord.', 1, '/images/char-beck-5eM6sRTCCUc-unsplash.jpg'),
    ('Gullök', 1, 25, 11, 'Ekologiskt odlad lök från vårt högteknologiska växthus i Vuollerim, Norbotten. OBS, tårarna sprutar när man hackar denna purfärska lök.', 2, '/images/lars-blankers-pmS8XSz5NU0-unsplash.jpg'),
    ('Gurka', 1, 199, 11, 'Ekologiskt gurka. En saftig gurka men mycket smak, perfekt att pickla. ', 2, '/images/harshal-s-hirve-2GiRcLP_jkI-unsplash.jpg');
