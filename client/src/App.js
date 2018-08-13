import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css'

import Categories from "./components/Category";
import SearchBar from "./components/SearchBar";
import AddedCategories from "./components/AddedCategories";
import NotAddedCategories from "./components/NotAddedCategories";


class App extends React.Component {

  render() {
    
    return (
      <Provider store={store}> 
        <div className="App">
          <SearchBar />
          <Categories />
          <AddedCategories />
          <NotAddedCategories />
        </div>
      </Provider>     
    );
  }
}

export default App;