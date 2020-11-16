import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select';
import { API_URL_NEW } from '../lib/endpoints'
import ResearchRow from '../components/research/RsearchRow'

export default class ResearchDirectory extends Component {
    constructor(props){
        super(props)
        this.state = {
            // research data list
            researchList: [],

            // navigation
            limit: 8,
            count: 0,
            page: 1,

            // filters
            categoriesList: [],
            category: ''
        }
    }

    componentDidMount(){
        this.getData()

        axios.get(`${API_URL_NEW}/research/setting/research-category?fields=id^,name`).then(
            response => {
                let categories = response.data.data
                let categoriesList = []

                categories.map( cat => { categoriesList.push({value: cat.id, label: cat.name})})

                this.setState({
                    categoriesList
                })
            })

        axios.get(`${API_URL_NEW}/research/setting/count?filters=is_published^:1`).then(
            response => {
                this.setState({
                    count: response.data.data[0].total
                })
            }
        )
    }

    getData() {
        this.passedData = this.props.passedData.data
        let fields = this.passedData.prepareSelectParam(['id', 'name', 'short_description', 'preview_image_data', 'image_data', 'code', 'sample_data', 'published_at', 'type_id', 'price', 'lang', 'category_data', 'sponsor_logo_id', 'sponsor_logo_data', 'created_at'])
        let filters = ''

        if(this.state.category){
            filters = this.passedData.prepareFilterParam([{key: 'category', value: [this.state.category.value], op: "^:"}])
        }

        axios.get(`${API_URL_NEW}/research?fields=${fields}&filters=is_published^:1^,${filters}&limit=${this.state.limit}&page=${this.state.page}&sort=published_at^:desc`).then(
            response => {
                let responseData = response.data.data

                if(this.state.page > 1){
                    responseData = [...this.state.researchList, ...response.data.data]
                }

                this.setState({
                    researchList: responseData
                })
            }
        )
    }

    changeLimitTo8 = () => {
        let { limit, page, count } = this.state;
        page = (parseInt(page, 10));

        // Only increment the page if there are more records exists
        if (count > (limit * page)) {
            page = page + 1;

            this.setState({
                page: page
            }, () => this.getData());
        }
    }

    handleFilterChange = (value) => {
        this.setState({category: value, page: 1})
    }
    
    applyFilter = () => {
        this.getData()
    }

    clearFilter = () => {
        this.setState({
            page: 1,
            category: '',
        }, () => this.getData())  
    }

    render() {
        let showMore = '';
        if (this.state.researchList.length < this.state.count) {
            showMore = <div>
                <a style={{fontWeight: 300, color: '#fff', background: '#d31148', margin: '20px auto 10px', width: 200, borderRadius: 4, display: 'block', textAlign: 'center', lineHeight: '35px'}}
                    onClick={this.changeLimitTo8}>SHOW MORE</a>
            </div>
        }

        return (
            <div style={{backgroundColor: 'inherit'}}>
                <div style={{backgroundColor: '#fff', marginBottom: 10, padding: 10}}>
                    <h1>Research Directory</h1>
                    <div className='d-flex d-flex justify-content-between align-items-center' style={{padding: 30}}>
                        <div style={{width: '60%'}}>
                            <Select 
                                placeholder="Filter by category"
                                options={this.state.categoriesList} 
                                value={this.state.category}
                                onChange={(option) => this.handleFilterChange(option)}
                            />
                        </div>
                        <a style={{backgroundColor: '#d31148', color: '#fff !important', fontSize: 16, width: 135, height: 28, borderRadius: 4, textAlign: 'center'}} onClick={this.applyFilter} > Apply </a>
                        <a style={{backgroundColor: '#353f48', color: '#fff', fontSize: 16, width: 135, height: 28, borderRadius: 4, textAlign: 'center'}} onClick={this.clearFilter} > Clear </a>
                    </div>
                </div>

                <div style={{ width: '70%', backgroundColor: '#fff', padding: 20}}>
                    {
                        this.state.researchList.map((item, i) => <ResearchRow key={i} researchProps={item} />)
                    }
                    {showMore}
                </div>
            </div>
        )
    }
}
