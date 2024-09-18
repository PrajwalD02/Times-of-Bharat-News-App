import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API
  
  state = {
    language: 'en', // Default language
    searchQuery: '' // Hold the search query
  };

  handleLanguageChange = (selectedLanguage) => {
    this.setState({ language: selectedLanguage });
  };

  handleSearchQuery = (searchQuery) => {
    this.setState({ searchQuery }); // Update the state with the search query
};

  render() {
    const categories = [
      'top', 'business', 'world', 'politics', 'sports', 'technology', 'entertainment', 
      'domestic', 'education', 'crime', 'environment', 'food', 'health', 'lifestyle',
      'science', 'tourism', 'other'
    ];

    return (
      <Router>
        <div>
          <Navbar 
            onLanguageChange={this.handleLanguageChange} 
            onSearchQuery={this.handleSearchQuery}
          />
          
          <Routes>
            <Route exact path="/" key="home" element={<News apiKey={this.apiKey} pageSize={9} country="in" category="top" language={this.state.language} searchQuery={this.state.searchQuery} />} />
            {categories.map((category) => (
              <Route exact path={`/${category}`} key={category} element={<News apiKey={this.apiKey} pageSize={9} country="in" category={category} language={this.state.language} searchQuery={this.state.searchQuery} />} />
            ))}
          </Routes>
        </div>
      </Router>
    )
  }
}
