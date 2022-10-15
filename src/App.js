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
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(
      `https://63497e2b5df95285140159e9.mockapi.io/photo_collection?page=${page}&limit=3&${category}`,
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
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categoryFilter.map((obj, idx) => (
            <li
              className={categoryId === idx ? 'active' : ''}
              key={idx}
              onClick={() => {
                setCatergoryId(idx);
                setPage(1);
              }}>
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
        {[...Array(5)].map((item, idx) => (
          <li
            className={page === idx + 1 ? 'active' : ''}
            onClick={() => setPage(idx + 1)}
            key={idx}>
            {idx + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
