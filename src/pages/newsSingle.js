import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { API_URL_NEW } from '../lib/endpoints';

class News extends Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        let url = `${API_URL_NEW}/news/${this.props.match.params.id}`;
        axios.get(url).then(response => {
            this.setState({ title: response.data.data.title })
        })
    }

    render() {
        return(
            <>
                <Helmet>
                    <title>MicroFrontend Sub</title>
                    <meta name="description" content="MicroFrontend Sub" />
                </Helmet>
                <p>news page</p>
                <p>{this.state.title}</p>
            </>
        )
    }
}

export default News;