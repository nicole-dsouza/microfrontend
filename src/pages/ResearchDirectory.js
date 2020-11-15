import React, { Component } from 'react'
import axios from 'axios'
import { API_URL_NEW } from '../lib/endpoints'
import ResearchRow from '../components/research/RsearchRow'

export default class ResearchDirectory extends Component {
    constructor(props){
        super(props)
        this.state = {
            researchList: []
        }
    }

    componentDidMount(){
        this.passedData = this.props.passedData.data
        let fields = this.passedData.prepareSelectParam(['id', 'name', 'short_description', 'preview_image_data', 'image_data', 'code', 'sample_data', 'published_at', 'type_id', 'price', 'lang', 'catedgory_data', 'sponsor_logo_id', 'sponsor_logo_data', 'created_at'])
        axios.get(`${API_URL_NEW}/research?fields=${fields}&limit=8&sort=published_at^:desc`).then(
            response => {
                this.setState({
                    researchList: response.data.data
                })
            }
        )
    }

    render() {
        return (
            <div style={{backgroundColor: 'inherit'}}>
                <h1>Research Directory</h1>
                <div style={{ width: '70%', backgroundColor: '#fff', padding: 20}}>
                    {
                        this.state.researchList.map((item, i) => <ResearchRow key={i} researchProps={item} />)
                    }
                </div>
            </div>
        )
    }
}
