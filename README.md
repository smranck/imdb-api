# IMDB-API

---

## Description

Simple back-end service that can query a database of IMDB data for a wide variety of searches.

Site: [https://imdb-api-ranck.herokuapp.com/](https://imdb-api-ranck.herokuapp.com/)

---

##Team
**Shawn Ranck**

_https://github.com/smranck_

_smranck@gmail.com_

---

## Usage

**Sample Usage**

For a list of movies from 1991

> GET request to https://imdb-api-ranck.herokuapp.com/movies/year/1991

For a list of comedies from the year 2006

> GET request to https://imdb-api-ranck.herokuapp.com/movies/genre/comedy?year=2006

For a descending sorted list of the best documentaries

> GET request to https://imdb-api-ranck.herokuapp.com/movies/genre/documentary?sort=rating

For a list of kid friendly movies from 2005

> GET request to https://imdb-api-ranck.herokuapp.com/movies/year/2005?isAdult=false

**spec**

- Accepts GET requests directed to https://imdb-api-ranck.herokuapp.com/movies and returns JSON
- Accepts GET requests directed to https://imdb-api-ranck.herokuapp.com/movies/[filterType/filterCategory] and returns JSON
- Additional query parameters can be added to the end of request URLs in the format of [additionalQuery=additionalQueryValue]. The first query parameter is joined with '?'; further parameters with '&'.
- Accepted filterTypes include genre and year
- Accepted additionalQuery=additionalQueryValue include: year=[1874-2018], isAdult=[boolean], sort=[length || rating].
- GET requests to https://imdb-api-ranck.herokuapp.com/health will check that the app is running
- All movie requests return up to 1000 results

---

## Future Improvements & Changes

**Features**

- **Allow searches for media other than movies**: This is a natural next feature, as movies are only 1 of 10 titletypes in the db.
- **Allow query parameters to include number of results**: The app currently caps search results at an arbitrary 1000. This is primarily to ensure consistent, relatively fast response times, and banks on the fact that most use cases will not require more than 1000 data results.

**Technical Improvements**

- Speed up popular searches: The limit on results could be lowered for popular queries. Setting up a cache would speed things up. With more use case information, I would refine my db queries to return only information that users really want.
- Pool pool postgres connections: Fewer handshakes will speed the process under heavy load.
- Error handle unsupported methods: For now, any method other than GET returns a 404 error, but a 405 would be better.
- Check input types: Always a good idea.

---

##Tech Stack
Node/Express/Postgres

Plus an overreach into React

---

## Thanks

Thanks for reading!

---
