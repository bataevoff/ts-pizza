import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import { useEffect, useState } from 'react'

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({
    name: 'популярности', sortProperty: 'rating'
  })

  useEffect(() => {
    setLoading(true)

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''

    fetch(`https://62d4adc1cd960e45d45a61f5.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
    .then((res) => {
      return res.json()
    })
    .then((arr) => {
      setItems(arr)
      setLoading(false)
    })
    window.scrollTo(0, 0)
  }, [categoryId, sortType])

  const pizzas = items.filter(obj => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true
    }

    return false
  }).map((obj) => (<PizzaBlock key={obj.id} {...obj}/>))
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className='container'>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)}/>
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeletons
          : pizzas}
      </div>
    </div>
  );
};

export default Home;