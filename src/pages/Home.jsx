import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import { useEffect, useState } from "react";
import axios from "axios";
import qs from 'qs'
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  useEffect(() => {
    setLoading(true);

    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios.get(
      `https://62d4adc1cd960e45d45a61f5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    .then(res => {
      setItems(res.data)
      setLoading(false)
    })
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortType,
      categoryId,
      currentPage
    })

    navigate(`?${queryString}`)
  },[categoryId, sortType, searchValue, currentPage])

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
