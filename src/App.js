import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const categoryFilter = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

function App() {
  const [categoryId, setCatergoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://63497e2b5df95285140159e9.mockapi.io/photo_collection?${
        categoryId ? `category=${categoryId}` : ''
      }`,
    )
      .then((response) => response.json())
      .then((data) => setCollections(data))
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных...');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categoryFilter.map((obj, idx) => (
            <li
              className={categoryId === idx ? 'active' : ''}
              key={idx}
              onClick={() => setCatergoryId(idx)}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h1>Loading ...</h1>
        ) : (
          collections
            .filter((obj) => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase());
            })
            .map((obj, idx) => <Collection key={idx} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
