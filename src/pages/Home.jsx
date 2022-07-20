import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import { useEffect, useState } from 'react'

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://62d4adc1cd960e45d45a61f5.mockapi.io/items')
    .then((res) => {
      return res.json()
    })
    .then((arr) => {
      setItems(arr)
      setLoading(false)
    })
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='container'>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => (<PizzaBlock key={obj.id} {...obj}/>))}
      </div>
    </div>
  );
};

export default Home;