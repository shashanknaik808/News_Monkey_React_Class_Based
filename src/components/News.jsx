import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 10,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: true,
            totalArticles: 0
        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)} : News Monkey`
    }

    async updateNews(pageNo) {
        let res = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8788032716674e868d61331f7e5304c6&page=${pageNo}&pageSize=${this.props.pageSize}`);
        let data = await res.json();
        this.setState({
            articles: data.articles,
            loading: false,
            page: pageNo,
            totalArticles: data.totalResults
        });
    }

    componentDidMount() {
        this.updateNews(1);
    }

    fetchMoreData = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalArticles / 10)) {
            console.log("No more Articles");
        }
        else {
            this.setState({ ...this.state, loading: true });
            let res = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8788032716674e868d61331f7e5304c6&page=${this.state.page + 1}&pageSize=10`);
            let data = await res.json();
            console.log(data.articles);
            this.setState({
                ...this.state,
                page: this.state.page + 1,
                articles: data.articles,
                totalArticles: data.totalResults,
                loading: false
            })
        }
    }

    async handlePreviousClick() {
        this.setState({ ...this.state, loading: true });
        let res = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8788032716674e868d61331f7e5304c6&page=${this.state.page + 1}&pageSize=10`);
        let data = await res.json();
        this.setState({
            ...this.state,
            page: this.state.page - 1,
            articles: data.articles,
            totalArticles: data.totalResults,
            loading: false
        })
    }

    render() {

        console.log(this.state.articles);

        return (
            <>
                <div className='container my-3'>
                    <h2 className='text-center' >NewsMonkey - Top Headlines</h2>
                    {this.state.loading && <Spinner />}
                    {(this.state.loading !== true) &&
                        <div className="row">
                            {
                                this.state.articles.map((item, index) => {
                                    return (
                                        <div className="col-md-4" key={index}>
                                            <NewsItem
                                                title={item.title.slice(0, 45)}
                                                decription={(item.description) ? item.description.slice(0, 88) : "Click for more Details"}
                                                imageUrl={(item.urlToImage != null) ? item.urlToImage : "https://theleaflet.in/wp-content/uploads/2021/09/IT-Dept.jpg"}
                                                newsURL={item.url}
                                                author={item.author}
                                                date={item.publishedAt}
                                                source={item.source.name}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    <div className='container d-flex justify-content-between'>
                        <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handleNextClick}>&larr; Previous</button>
                        <button disabled={this.state.page * 10 >= this.state.totalArticles} type='button' className='btn btn-dark' onClick={this.handlePreviousClick}>Next &rarr; </button>
                    </div>
                </div>
            </>
        )
    }
}

export default News;