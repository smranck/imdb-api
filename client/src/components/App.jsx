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
                /movies/year/1991
                <ul>
                  <li>Returns a list of movies from 1991</li>
                </ul>
              </li>
              <li>
                /movies/genre/comedy?year=2006
                <ul>
                  <li>Returns list of comedies from the year 2006</li>
                </ul>
              </li>
              <li>
                /movies/genre/documentary?sort=rating
                <ul>
                  <li>Returns a descending sorted list of the best documentaries</li>
                </ul>
              </li>
              <li>
                /movies/year/1991?isAdult=false
                <ul>
                  <li>Returns a list of non-adult movies from 1991</li>
                </ul>
              </li>
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
                  <li>genre option</li>
                </ul>
                <ul>
                  <li>genre option</li>
                </ul>
              </ul>
              <ul>
                <li>year</li>
              </ul>
            </list>
            <h5>Available additionalQuery options and possible values</h5>
            <list>
              <ul>
                <li>year</li>
                <ul>
                  <li>number</li>
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
                  <li>length</li>
                </ul>
                <ul>
                  <li>rating</li>
                </ul>
              </ul>
            </list>
          </div>
        </div>
      </div>
    );
  }
}
