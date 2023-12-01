import React, { Component } from 'react';

export class NewsItem extends Component {

    constructor() {
        super();
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        fetch(
            "https://newsapi.org/v2/top-headlines?country=us&apiKey=8788032716674e868d61331f7e5304c6"
        ).then(res => res.json()).then(data => {
            this.setState({ articles: data.articles });
        });
    }

    render() {

        const { title, description, imageUrl } = this.props;

        return (
            <div>
                <div className="card" style={{ width: '18rem' }}>
                    <img src="{imageurl}" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href="/newsdetail" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;