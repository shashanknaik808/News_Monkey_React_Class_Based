import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        fetch(
            "https://newsapi.org/v2/top-headlines?country=us&apiKey=8788032716674e868d61331f7e5304c6"
        )
            .then(res => res.json())
            .then(data => {
                this.setState({ articles: data.articles });
            });
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
                                    </div>)
                            }))
                            }
                        </div>
                    }
                </div>
            </>
        )
    }
}

export default News;