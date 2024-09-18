import React, { Component } from 'react';
import languages from './languages';
import { Link } from 'react-router-dom';
import logo from './logo.png';

export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'en', // Default language is English
            searchQuery: '', // Search query state
            // selectedCategory: 'top'
        };
    }

    handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        this.setState({ selectedLanguage });
        this.props.onLanguageChange(selectedLanguage); // Call the parent component's method if needed
    }

    handleSearchInputChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSearchSubmit = (event) => {
        event.preventDefault();
        this.props.onSearchQuery(this.state.searchQuery); // Pass search query to parent
    };

    render() {
        const categories = [
            // 'top', 'business', 'world', 'politics', 'sports', 'technology', 'entertainment', 
            'domestic', 'education', 'crime', 'environment', 'food', 'health', 'lifestyle',
            'science', 'tourism', 'other'
        ];

        const capitalizeFirstLetter = s =>
            s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        const getLanguageName = (code) => {
            const language = languages.find(lang => lang.code === code);
            return language ? language.name : 'Unknown';
        };
        const hideScrollbarStyle = `
            .dropdown-menu::-webkit-scrollbar {
                display: none;
            }
            .dropdown-menu {
                --bs-dropdown-padding-y: -0.5rem;
            }
        `;

        return (
            <>
                <style>{hideScrollbarStyle}</style>
                <nav className="navbar navbar-expand-lg text-white navbar-dark bg-dark py-0 fixed-top" >
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/"><img src={logo} width="50" height="50" className="d-inline-block align-top" alt="TOB"></img> </Link>
                        {/* <Link className="navbar-brand" to="/"><h3>TOB</h3></Link> */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/top">Latest</Link>    {/* Top */}
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/business">Business</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/world">World</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/politics">Politics</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/technology">Technology</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/sports">Sports</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/entertainment">Entertainment</Link>
                                </li>

                                {/* Categories Dropdown */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        More
                                    </a>
                                    <ul className="dropdown-menu" 
                                        aria-labelledby="categoryDropdown" 
                                        style={{ 
                                            maxHeight: '200px', 
                                            overflowY: 'auto',
                                            msOverflowStyle: 'none',
                                            scrollbarWidth: 'none'
                                        }}
                                    >
                                        {categories.map((category, index) => (
                                            <li key={index}>
                                                <Link className="dropdown-item text-white bg-dark" to={`/${category}`} >{capitalizeFirstLetter(category)}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                {/* Language Dropdown */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white" href="/" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {capitalizeFirstLetter(getLanguageName(this.state.selectedLanguage))}
                                    </a>
                                    <ul className="dropdown-menu" 
                                        aria-labelledby="languageDropdown" 
                                        style={{ 
                                            maxHeight: '200px', 
                                            overflowY: 'auto',
                                            msOverflowStyle: 'none',
                                            scrollbarWidth: 'none'
                                        }}
                                    >
                                        {languages.map((language) => (
                                            <li key={language.code}>
                                                <button className="dropdown-item text-white bg-dark" onClick={this.handleLanguageChange} value={language.code}>
                                                    {capitalizeFirstLetter(language.name)}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                {/* Search Form */}

                            </ul>
                            <form className="d-flex ms-auto" role="search" onSubmit={this.handleSearchSubmit}>
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search for news"
                                    aria-label="Search"
                                    value={this.state.searchQuery}
                                    onChange={this.handleSearchInputChange}
                                />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                            {/* <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form> */}
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

export default Navbar