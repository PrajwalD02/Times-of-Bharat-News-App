import React, { Component } from 'react';
import NewsItem from './NewsItem';
import LoadingBar from 'react-top-loading-bar';  // Import LoadingBar
import loading from './spinnerLoader.gif';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'
import breakingNews from './breakingNews.png'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'top',
        language: 'en'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        language: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            loading: true,
            nextPage: '',
            progress: 0,  // State for controlling loading bar
            error: null,
            totalResults: 0,
        };
    }

    // Start loading bar
    setProgress = (progress) => {
        this.setState({ progress });
    }

    async fetchNewsData(nextPage = '') {

        this.setProgress(10);  // Start loading bar at 10%
        const query = this.props.searchQuery || ''; // Get the search query from props

        // nextPage if it exists, otherwise initial endpoint
        let url = nextPage
            ? `https://newsdata.io/api/1/news?apikey=${this.props.apiKey}&country=${this.props.country}&category=${this.props.category}&language=${this.props.language}&page=${nextPage}&size=${this.props.pageSize}`
            : `https://newsdata.io/api/1/news?apikey=${this.props.apiKey}&country=${this.props.country}&category=${this.props.category}&language=${this.props.language}&size=${this.props.pageSize}`;

        if (query) {
            url += `&q=${query}`;
        }

        
        this.setState({
            loading: true,
            error: null
        });

        try {
            let data = await fetch(url);
            this.setProgress(50);  // Midway progress while data is being fetched

            let parseData = await data.json();
            this.setProgress(80);  // Almost done

            this.setState({
                results: this.state.results.concat(parseData.results),
                nextPage: parseData.nextPage || '',  // Set nextPage from API response
                loading: false,
                totalResults: parseData.totalResults
            });

            this.setProgress(100);  // Finish loading bar

        } catch (error) {
            console.error('Error fetching news:', error);
            this.setState({ loading: false, error: 'Failed to fetch news. Please try again later.' });
            this.setProgress(100);  // Finish loading bar even on error

        }
    }

    async componentDidMount() {
        // Fetch initial news data
        await this.fetchNewsData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language || prevProps.category !== this.props.category || prevProps.searchQuery !== this.props.searchQuery) {
            this.setState({ results: [], nextPage: '' }, () => this.fetchNewsData());

        }

    }

    fetchMoreData = async () => {
        if (this.state.nextPage) {
            await this.fetchNewsData(this.state.nextPage);
        }
    };

    render() {
        const { results } = this.state;
        const { searchQuery } = this.props;

        if (!Array.isArray(results)) {
            return <div>No data available or invalid response format</div>; // Handle invalid data gracefully
        }

        const capitalizeFirstLetter = s => {
            if (!s || typeof s !== 'string') {
                return '';
            }
            return s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        };

        const rowStyle = {
            display: 'flex',
            flexWrap: 'wrap',
        }


        return (
            <>

                {/* Loading Bar Component */}
                <LoadingBar
                    color='#f11946'
                    progress={this.state.progress}
                    onLoaderFinished={() => this.setProgress(0)}
                />

                <h3 className="text-center" style={{ marginTop: '15px' }}>
                    {searchQuery ? `Results for "${searchQuery}"` : capitalizeFirstLetter(this.props.category)}
                </h3>

                {this.state.error && (
                    <div className="alert alert-danger text-center" role="alert">
                        {this.state.error}
                    </div>
                )}

                <InfiniteScroll
                    dataLength={this.state.results.length}
                    next={this.fetchMoreData}
                    hasMore={results.length !== this.state.totalResults}
                    loader={this.state.loading && <div className='text-center'>
                        {this.state.loading && <img className="my-3" src={loading} alt='Loading...' width="100" height="100" />}
                    </div>}
                >
                    {/* News Items */}
                    <div className='container'>
                        <div className="row" style={rowStyle}>
                            {this.state.results.map((element, index) => {
                                return <div className='col-12 col-md-4 mb-4' key={`${element.article_id}-${index}`}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : <><br/> <br/> <br/></> }
                                        imgUrl={element.image_url ? element.image_url : breakingNews}
                                        newsUrl={element.link}
                                        sourceIcon={element.source_icon}
                                        sourceName={element.source_name}
                                        pubDate={element.pubDate} />
                                </div>
                            })}
                        </div>
                    </div >
                </InfiniteScroll>

            </>
        );
    }
}

export default News;
