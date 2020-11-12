import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class News extends Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        this.passedData = this.props.passedData.data // what we passed from the main app
        let paramFields = this.passedData.prepareSelectParam(['id', 'title', 'body', 'image_data', 'code', 'published_at', 'created_at'])
        let url = `${this.passedData.API_URL_NEW}/news?fields=${paramFields}&filters=is_published^:1&limit=4&page=1&sort=published_at^:desc`;
        axios.get(url).then(response => {
            this.setState({ news: response.data.data })
        })
    }

    render() {
        return(
            <>
                <Helmet>
                    <title>MicroFrontend Home</title>
                    <meta name="description" content="MicroFrontend Home" />
                </Helmet>
                {this.state.news && this.state.news.map((item, i) => {
                    return (
                        <div key={i}>
                            <h6 className="mb-3"><a href={`/testing/newstest/${item.id}`}>{item.title}</a></h6>
                        </div>
                    )
                })}
            </>
        )
    }
}

export default News;