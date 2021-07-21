INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

------------------------------

INSERT INTO users (name, email, password)
VALUES ('Zinedine Zidane', 'zinzidane@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),

('Luna Loonwer', 'lunaloonwer@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),

('Dremlinf jfoeppe', 'dremlinfjfoeppe@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

----------------------------


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)

VALUES (1, 'Smelly cat', 'description',  'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 843.90, 6, 4, 6, 'Canada', '676 Serg Road', 'Anndkro', 'Ontario', 587463, true),

(1, 'Belly rub', 'description',  'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 1444.99, 4, 2, 5, 'Canada', '938 Smerin Road', 'Minspar', 'NewFoundland', 287463, true),

(2, 'Jinx minx', 'description',  'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg', 799.99, 3, 1, 3, 'Canada', '712 Greenwich Road', 'Feldspar', 'Alberta', 887463, true);


-------------------------

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 5, 1, 3, 'messages'),
(1, 3, 3, 6, 'messages'),
(5, 6, 2, 3, 'messages');
