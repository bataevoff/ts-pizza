import "./scss/app.scss"
import Header from './components/Header';
import Categories from './components/Categories';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([])
  // https://62d4adc1cd960e45d45a61f5.mockapi.io/items

  useEffect(() => {
    fetch('https://62d4adc1cd960e45d45a61f5.mockapi.io/items').then((res) => {
      return res.json()
    }).then((arr) => {
      setItems(arr)
    })
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map(obj => (
                <PizzaBlock key={obj.id} {...obj}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
