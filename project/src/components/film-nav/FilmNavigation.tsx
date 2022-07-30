import { useState } from 'react';
import { FilmInfo } from 'src/types/films';
import { Overview, Reviews, Details } from 'src/components';

type Props= {
  filmInfo: FilmInfo;
};

const Tabs = {
  OVERVIEW: 'Overview',
  DETAILS: 'Details',
  REVIEWS: 'Reviews',
};

const FilmNavigation = ({filmInfo}: Props): JSX.Element => {
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

      {selectedTab === Tabs.OVERVIEW ? <Overview filmInfo={filmInfo}/> : null}
      {selectedTab === Tabs.DETAILS ? <Details filmInfo={filmInfo}/> : null}
      {selectedTab === Tabs.REVIEWS ? <Reviews /> : null}
    </div>
  );
};

export default FilmNavigation;
