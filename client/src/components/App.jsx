import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {
  render() {
    return (
      <div>
        <h2>This project provides a RESTful API for a database containing IMDB information</h2>
        <div>
          <section>
            <h5>Sample Usage</h5>
            <ul>
              <li>
                GET request to https://imdb-api-ranck.herokuapp.com/movies/year/1991
                <ul>
                  <li>Returns a list of movies from 1991</li>
                </ul>
              </li>
              <li>
                GET request to https://imdb-api-ranck.herokuapp.com/movies/genre/comedy?year=2006
                <ul>
                  <li>Returns list of comedies from the year 2006</li>
                </ul>
              </li>
              <li>
                GET request to
                https://imdb-api-ranck.herokuapp.com/movies/genre/documentary?sort=rating
                <ul>
                  <li>Returns a descending sorted list of the best documentaries</li>
                </ul>
              </li>
              <li>
                GET request to https://imdb-api-ranck.herokuapp.com/movies/year/1991?isAdult=false
                <ul>
                  <li>Returns a list of non-adult movies from 1991</li>
                </ul>
              </li>
              <li>All queries return up to 1000 movie results</li>
            </ul>
          </section>
          <div>
            <h5>Available Endpoints:</h5>
            <list>
              <ul>
                <li>
                  /movies[[?][additionalQuery=additionalQueryValue][&[additionalQuery=additionalQueryValue]...]
                </li>
                <ul>
                  <li>Returns a list of movies, optionally refined by additional queries</li>
                </ul>
              </ul>
              <ul>
                <li>
                  /movies/[filterType/filterCategory][[?][additionalQuery=additionalQueryValue][&[additionalQuery=additionalQueryValue]...]]
                </li>
                <ul>
                  <li>
                    Returns a list of movies, filtered by filterType, optionally refined by
                    additional queries
                  </li>
                </ul>
              </ul>
            </list>
            <h5>Available filterTypes and possible categories</h5>
            <list>
              <ul>
                <li>genre</li>
                <ul>
                  <li>
                    Action | Adult | Animation | Biography | Comedy | Crime | Documentary | Drama |
                    Family | Fantasy | Game-Show | History | Horror | Music | Musical | Mystery |
                    News | Romance | Sci-Fi | Short | Sport | Thriller | War | Western
                  </li>
                </ul>
              </ul>
              <ul>
                <li>year</li>
                <ul>
                  <li>number [1874-2018]</li>
                </ul>
              </ul>
            </list>
            <h5>Available additionalQuery options and possible values</h5>
            <list>
              <ul>
                <li>year</li>
                <ul>
                  <li>number [1874-2018]</li>
                </ul>
              </ul>
              <ul>
                <li>isAdult</li>
                <ul>
                  <li>boolean</li>
                </ul>
              </ul>
              <ul>
                <li>sort</li>
                <ul>
                  <li>length | rating</li>
                </ul>
              </ul>
            </list>
            <h5>Reading your results</h5>
            <list>
              <ul>
                <li>[key] : [value description]</li>
                <ul>
                  <li>tconst : Unique Key in movie database</li>
                  <li>titletype : Media type</li>
                  <li>primarytitle : Title on most recent release</li>
                  <li>originaltitle : Title on release</li>
                  <li>isadult : Indicates an adult movie</li>
                  <li>startyear : Year of Release</li>
                  <li>endyear : Year Ended (null for movies)</li>
                  <li>runtimeminutes : Length</li>
                  <li>genres : All genres applicable to result</li>
                  <li>averagerating : Average viewer rating of movie</li>
                  <li>numvotes : Total number of viewers who voted</li>
                </ul>
              </ul>
            </list>
            <h5>Other useful endpoints</h5>
            <list>
              <ul>
                <li>https://imdb-api-ranck.herokuapp.com/health</li>
                <ul>
                  <li>Returns app status</li>
                </ul>
              </ul>
            </list>
          </div>
        </div>
      </div>
    );
  }
}
