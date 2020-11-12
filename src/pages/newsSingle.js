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
        let url = `${this.passedData.API_URL_NEW}/news/${this.props.match.params.id}`;
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