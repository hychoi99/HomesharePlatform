-- SJSU CMPE 226 Fall 2019 TEAM5
-- VIEWS
create view roomsWithLocation as 
(select * from
rooms natural join locate_on);

create view offered_amenities as 
(select * from
offers natural join amenities);
