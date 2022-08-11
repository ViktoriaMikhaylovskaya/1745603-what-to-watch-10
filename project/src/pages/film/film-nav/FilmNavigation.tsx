import { useState } from 'react';
import { Overview } from './overview';
import { Reviews } from './reviews';
import { Details } from './details';
import { FilmInfo } from 'src/types/films';

const Tabs = {
  OVERVIEW: 'Overview',
  DETAILS: 'Details',
  REVIEWS: 'Reviews',
};

const FilmNavigation = ({data}: {data: FilmInfo}): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState(Tabs.OVERVIEW);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.values(Tabs).map((key) => (
            <li key={key} className={`film-nav__item ${key === selectedTab ? 'film-nav__item--active' : ''}`}>
              <button className="film-nav__link"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedTab(key);
                }}
              >
                {key}
              </button>
            </li>))}
        </ul>
      </nav>

      {selectedTab === Tabs.OVERVIEW ? <Overview data={data}/> : null}
      {selectedTab === Tabs.DETAILS ? <Details data={data}/> : null}
      {selectedTab === Tabs.REVIEWS ? <Reviews /> : null}
    </div>
  );
};

export default FilmNavigation;
