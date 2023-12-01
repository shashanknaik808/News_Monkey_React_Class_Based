import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            loading: true,
            totalArticles: 0
        }
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
    }

    componentDidMount() {
        fetch(
            "https://newsapi.org/v2/top-headlines?country=us&apiKey=8788032716674e868d61331f7e5304c6"
        )
            .then(res => res.json())
            .then(data => {
                this.setState({
                    ...this.state,
                    articles: data.articles,
                    totalArticles: data.totalResults,
                    loading: false
                });
            });
    }

    async handleNextClick() {
        if (this.state.page + 1 > Math.ceil(this.state.totalArticles / 10)) {
            console.log("No more Articles");
        }
        else {
            let res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=8788032716674e868d61331f7e5304c6&page=${this.state.page + 1}&pageSize=10`);
            let data = await res.json();
            console.log(data.articles);
            this.setState({
                ...this.state,
                page: this.state.page + 1,
                articles: data.articles,
                totalArticles: data.totalResults,

            })
        }
    }

    async handlePreviousClick() {
        let res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=8788032716674e868d61331f7e5304c6&page=${this.state.page - 1}&pageSize=10`);
        let data = await res.json();
    }

    render() {

        console.log(this.state.articles);

        return (
            <>
                <div className='container my-3'>
                    <h2>NewsMonkey - Top Headlines</h2>
                    {(this.state.articles.length != 0) &&
                        <div className='row'>
                            {(this.state.articles.map((item, index) => {
                                return (
                                    <div className='col-md-4' key={index}>
                                        <NewsItem
                                            title={item.title}
                                            description={item.description}
                                            imageUrl={item.urlToImage}
                                        />
                                    </div>
                                )
                            }))
                            }
                        </div>
                    }
                    <div className='container d-flex justify-content-between'>
                        <button type='button' className='btn btn-dark' onClick={this.handleNextClick}>&larr; Previous</button>
                        <button type='button' className='btn btn-dark' onClick={this.handlePreviousClick}>Next &rarr; </button>
                    </div>
                </div>
            </>
        )
    }
}

export default News;