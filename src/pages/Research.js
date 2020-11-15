import Axios from 'axios'
import React, { Component } from 'react'
import { REPORT_TYPES } from '../lib/constants'
import { API_URL_NEW, SITE_IMAGE_URL } from '../lib/endpoints'

export default class Research extends Component {
    constructor(props){
        super(props)
        this.state={
            data: {}
        }
    }

    componentDidMount(){
        this.passedData = this.props.passedData.data
        let researchId = this.props.match.params.slug.split('-').pop()
        let fields = this.passedData.prepareSelectParam(['id', 'code', 'name', 'full_description', 'short_description', 'price', 'image_data', 'sample_data', 'type_id', 'category_id', 'category_data', 'body', 'published_at', 'is_user_purchased', 'download_policy', 'lang'])
        Axios.get(`${API_URL_NEW}/research/${researchId}?fields=${fields}`).then(
            response => {
                this.setState({
                    data: response.data.data
                })
            }
        )
    }

    renderHeader() {
        // const { user }  = this.props;
        const { data }  = this.state;
        let isAccess    = false;
        let content     = null;
        let msg         = null;

        let sample;
        if ((this.state.data.sample_data)) {
            sample = <a href={this.state.data.sample_data.path} className="learn BlueColBtn" target="_blank" rel='noopener noreferrer' download >View Sample</a>
        }

        let locations = '';
        // if (this.state.locations.length !== 0) {
        //     // locations = this.state.locations.map((loc, i) => <OptionRows key={i} data={loc} />);
        // }

        if (true && (data.is_user_purchased == 1 || (data.download_policy && data.download_policy.is_allowed))) {
            // if (user && user.is_loggedin && (data.is_user_purchased == 1 || (data.download_policy && data.download_policy.is_allowed))) {
            isAccess = true;
        }

        if ((this.state.data.type_id == REPORT_TYPES.free || this.state.data.type_id == REPORT_TYPES.sponsored)) {
            if (true) {
                // if (user && user.is_loggedin) {
                content = (
                    <div className="lock" style={{ padding: 0, marginBottom: 0 }}>
                        <h3>Download the {this.state.data.name}</h3>
                        <div className="buttons" >
                            <p style={{ maxWidth: '100%' }}>
                                <a onClick={this.handleFreeDownload} className="learn redColBtn" style={{ width: '100%' }} target="_blank" rel="noopener noreferrer" >
                                    {this.state.isDownloading && <i className="fas fa-circle-notch fa-spin" style={{ marginRight: 3 }}></i>}
                                    Download Here
                                </a>
                            </p>
                        </div>
                    </div>
                );
            } else {
                content = (
                    <div className="lock" style={{ padding: 0, marginBottom: 0, marginTop: 0, backgroundColor: '#F8F8F8' }}>
                        <div className="addBlock" style={{ backgroundColor: '#F8F8F8' }}>
                            <div className="mainContent" style={{ borderBottom: 'none', padding: 0 }}>
                                <div className="right">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <label style={{ fontWeight: 600, fontSize: '20px', margin: 'auto', marginBottom: '20px', marginTop: 0 }} >DOWNLOAD THE REPORT</label>
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <input name='email' style={{ fontSize: '14px', marginBottom: '12px' }} className={(this.state.emailError || this.state.emailInvalid) ? 'researchCheck error' : 'researchCheck'} type="text" value={this.state.email} onChange={(event) => { this.setState({ emailError: false }); this.handleChange(event) }} placeholder="Email" />
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <input name='firstName' style={{ fontSize: '14px', marginBottom: '12px' }} className={this.state.firstNameError ? 'researchCheck error' : 'researchCheck'} type="text" value={this.state.firstName} onChange={(event) => { this.setState({ firstNameError: false }); this.handleChange(event) }} placeholder="First Name" />
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <input name='lastName' style={{ fontSize: '14px', marginBottom: '12px' }} className={this.state.lastNameError ? 'researchCheck error' : 'researchCheck'} type="text" value={this.state.lastName} onChange={(event) => { this.setState({ lastNameError: false }); this.handleChange(event) }} placeholder="Last Name" />
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <select name="location" style={{ fontSize: '14px', marginBottom: '12px' }} className={this.state.locationError ? 'researchCheck error' : 'researchCheck'} value={this.state.location}
                                                onChange={(event) => { this.setState({ locationError: false }); this.handleChange(event) }}>
                                                <option value=''>- Location -</option>
                                                {locations}
                                            </select>
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <select name="role" style={{ fontSize: '14px', marginBottom: '12px' }} className={this.state.roleError ? 'researchCheck error' : 'researchCheck'} value={this.state.role}
                                                onChange={(event) => { this.setState({ roleError: false }); this.handleChange(event) }}>
                                                <option value="_none">- Role -</option>
                                                {this.state.userRoles.map((role, i) => <option value={role.id} key={role.id} >{role.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="buttons" >
                                            <p style={{ maxWidth: '100%' }}>
                                                <a onClick={this.handleDownloadLoggedOut} className="learn redColBtn" style={{ width: '100%', margin: 0 }} target="_blank" rel="noopener noreferrer" >Download Here</a>
                                                <div className="research-download-login" onClick={this.Login}>Or <a>login</a> to view</div>
                                            </p>
                                        </div>
                                        {this.state.errorMessages.length ?
                                            <div className="alert alert-danger" role="alert" style={{ fontSize: 12 }}>
                                                <span>Please fill </span>
                                                {this.state.errorMessages.map((err, i) => {
                                                    return <span key={i}>{err}{this.state.errorMessages.length - 1 === i ? '.' : ', '}</span>
                                                })}
                                            </div> : null}
                                        {this.state.emailInvalid ? <div className="alert alert-danger" role="alert" style={{ fontSize: 12 }}>Please enter a valid email address</div> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        } else if (this.state.data.type_id == REPORT_TYPES.paid) {
            if (this.state.data.price == 0 && !(true)){
                // if (this.state.data.price == 0 && !(this.props.user.roles.includes(9) || this.props.user.roles.includes(20))){
                content = '';
            }
            else if (isAccess) {
                content = (
                    <div className="lock" style={{ padding: 0, marginBottom: 0 }}>
                        <h3>Download {this.state.data.name}</h3>
                        <div className="buttons" >
                            <p style={{ maxWidth: '100%' }}>
                                <a onClick={this.handleDownload} className="learn redColBtn" style={{ width: '100%' }} target="_blank" rel="noopener noreferrer" >
                                    {this.state.isDownloading && <i className="fas fa-circle-notch fa-spin" style={{ marginRight: 3 }}></i>}
                                    Download Here
                                </a>
                            </p>
                        </div>
                        <div className="title" >
                                <div style={{  fontSize: 13 }}>{this.state.restrMsg}</div>
                        </div>
                    </div>
                )
            } else {
                content = (
                    <div className="lock" style={{ padding: 0, marginBottom: 0 }}>
                        <h3>Purchase {this.state.data.name}</h3>
                        <div className="buttons" >
                            <p style={{ maxWidth: '100%' }}>
                                {sample}
                                <a onClick={() => this.segTrack(this.state.data.title)}
                                    href={`/research/${this.state.data.code}-${this.state.data.id}/buy`}
                                    className="buy redColBtn" style={{ width: '100%' }} >
                                    Purchase here
                                </a>
                            </p>
                        </div>
                    </div>
                );
            }
        }

        return content;
    }

    renderBody(){
        // const { is_loggedin }    = this.props.user;
        const  is_loggedin     = true;
        const { data }                  = this.state;
        const body      = data.body;
        let isAccess    = false;
        let content     = null;
        let details     = '';

        if (data && data.body && body !== null) {
            // todo: This isn't actually need (todo for Dana)
            details   = body.split('/sites/default/files').join(SITE_IMAGE_URL)
        }

        // if (is_loggedin && (data.is_user_purchased == 1 || roles.indexOf(9) > -1)) {
        if (is_loggedin && (data.is_user_purchased == 1 || (data.download_policy && data.download_policy.is_allowed))) {
            isAccess = true;
        }

        // Free reports
        if ((data.type_id == REPORT_TYPES.free || data.type_id == REPORT_TYPES.sponsored)) {
            if (body !== null) {
                content = (
                    <div>
                        <p style={{ textAlign: data.lang === 'ar' ? 'right' : 'left', paddingBottom: '10px', paddingTop: '10px', maxWidth: '100%' }}>
                            <div dangerouslySetInnerHTML={{ __html: details }} />
                        </p>
                    </div>
                );
            } else {
                content = null;
            }

        } else if (data.type_id == REPORT_TYPES.paid) {
            if (this.state.data.price == 0 && !(true)){
                // if (this.state.data.price == 0 && !(this.props.user.roles.includes(9) || this.props.user.roles.includes(20))){
                content = (
                    <div>
                        <p style={{ textAlign: data.lang === 'ar' ? 'right' : 'left', paddingBottom: '10px', paddingTop: '10px', maxWidth: '100%' }}>
                            <div dangerouslySetInnerHTML={{ __html: details }} />
                        </p>
                    </div>
                );
            }
            else if (isAccess) {
                content = (
                    <div>
                        <div className="lock" style={{ padding: '0', marginBottom: 0 , borderBottom: '1px solid #eeeeee'}}>
                            <h3>Download {data.name}</h3>
                            <p style={{ paddingBottom: '20px', maxWidth: '100%' }}>
                                <a onClick={this.handleDownload} className="learn redColBtn" target="_blank" rel="noopener noreferrer" >
                                    {this.state.isDownloading && <i className="fas fa-circle-notch fa-spin" style={{ marginRight: 3 }}></i>}
                                    Download Here
                                </a>
                            </p>
                            <div className="title" >
                                    <div style={{  fontSize: 13 }}>{this.state.restrMsg}</div>
                            </div>
                        </div>
                        <p style={{ textAlign: data.lang === 'ar' ? 'right': 'left', paddingBottom: '10px', paddingTop: '10px', maxWidth: '100%', borderBottom: '1px solid #eeeeee' }}>
                            <div dangerouslySetInnerHTML={{ __html: details }} />
                        </p>
                    </div>
                )
            } else {
                content = (
                    <div>
                        <p style={{ textAlign: data.lang === 'ar' ? 'right' : 'left', paddingBottom: '10px', paddingTop: '10px', maxWidth: '100%' }}>
                            <div dangerouslySetInnerHTML={{ __html: details }} />
                        </p>
                    </div>
                );
            }
        }

        return content;
    }

    renderFooter(){
        // const { is_loggedin }    = this.props.user;
        const is_loggedin = true;
        const {data}                    = this.state;
        let isAccess = false;
        let content = null;
        let msg     = null;
        let sample;
        if ((this.state.data.sample_data)) {
            sample = <a href={this.state.data.sample_data.path} className="learn BlueColBtn" target="_blank" rel='noopener noreferrer' download >View Sample</a>
        }


        let locations='';
        // if (this.state.locations.length !== 0) {
        //     // locations = this.state.locations.map((loc, i) => <OptionRows key={i} data={loc} />);
        // }

        // if (is_loggedin && (this.state.data.is_user_purchased == 1 || roles.indexOf(9) > -1)) {
        if (is_loggedin && (data.is_user_purchased == 1 || (data.download_policy && data.download_policy.is_allowed))) {
            isAccess = true;
        }

        // Free reports
        if ((this.state.data.type_id == REPORT_TYPES.free || this.state.data.type_id == REPORT_TYPES.sponsored)) {
            if (is_loggedin) {
                content = (
                    <div>
                        <div className="lock" style={{ padding: '0', marginBottom: 0, paddingBottom: "20" }}>
                            <h3>Download the {this.state.data.name}</h3>
                            <div className="buttons" >
                                <p style={{ maxWidth: '100%' }}>
                                    <a onClick={this.handleFreeDownload} className="learn redColBtn" target="_blank" rel="noopener noreferrer" >
                                        {this.state.isDownloading && <i className="fas fa-circle-notch fa-spin" style={{ marginRight: 3 }}></i>}
                                        Download Here
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                );
            } else {
                content = (
                    <div style={{ textAlign: 'center' }}>
                        <div className="lock col-md-6 col-sm-12 col-xs-12" style={{ padding: '0', marginBottom: 0, paddingBottom: "20", display: 'inline-block' }}>
                            <div className="addBlock" style={{ backgroundColor: '#F8F8F8', padding: '0' }}>
                                <div className="mainContent" style={{ borderBottom: 'none', padding: 0 }}>
                                    <div className="right" style={{ padding: '15px' }}>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <label style={{ fontWeight: 600, fontSize: '20px', margin: 'auto', marginBottom: '15px', marginTop: 0 }} >DOWNLOAD THE REPORT</label>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <input name='email' style={{ fontSize: '14px', marginBottom: '12px' }} className={this.state.emailError ? 'researchCheck error' : 'researchCheck'} type="text" value={this.state.email} onChange={(event) => { this.setState({ emailError: false }); this.handleChange(event) }} placeholder="Email" />
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <input name='firstName' style={{ fontSize: '14px', marginBottom: '12px' }} className={this.state.firstNameError ? 'researchCheck error' : 'researchCheck'} type="text" value={this.state.firstName} onChange={(event) => { this.setState({ firstNameError: false }); this.handleChange(event) }} placeholder="First Name" />
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <input name='lastName' style={{ fontSize: '14px', marginBottom: '12px' }} className={this.state.lastNameError ? 'researchCheck error' : 'researchCheck'} type="text" value={this.state.lastName} onChange={(event) => { this.setState({ lastNameError: false }); this.handleChange(event) }} placeholder="Last Name" />
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <select name="location" style={{ fontSize: '14px', marginBottom: '12px' }} className={this.state.locationError ? 'researchCheck error' : 'researchCheck'} value={this.state.location}
                                                    onChange={(event) => { this.setState({ locationError: false }); this.handleChange(event) }}>
                                                    <option value=''>- Location -</option>
                                                    {locations}
                                                </select>
                                            </div>
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <select name="role" style={{ fontSize: '14px', marginBottom: '12px' }} className={this.state.roleError ? 'researchCheck error' : 'researchCheck'} value={this.state.role}
                                                    onChange={(event) => { this.setState({ roleError: false }); this.handleChange(event) }}>
                                                    <option value="_none">- Role -</option>
                                                    {this.state.userRoles.map((role, i) => <option value={role.id} key={role.id} >{role.name}</option>)}
                                                </select>
                                            </div>
                                            <div className="buttons" >
                                                <p style={{ maxWidth: '100%' }}>
                                                    <a onClick={this.handleDownloadLoggedOut} className="learn redColBtn" style={{ width: '100%', marginBottom: 0 }} target="_blank" rel="noopener noreferrer" >Download Here</a>
                                                    <div className="research-download-login" onClick={this.Login}>Or <a>login</a> to view</div>
                                                </p>
                                            </div>
                                            {this.state.errorMessages.length ?
                                                <div className="alert alert-danger" role="alert" style={{ fontSize: 12 }}>
                                                    <span>Please fill </span>
                                                    {this.state.errorMessages.map((err, i) => {
                                                        return <span key={i}>{err}{this.state.errorMessages.length - 1 === i ? '.' : ', '}</span>
                                                    })}
                                                </div> : null}

                                            {this.state.emailInvalid ? <div className="alert alert-danger" role="alert" style={{ fontSize: 12 }}>Please enter valid email</div> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

        } else if (this.state.data.type_id == REPORT_TYPES.paid) {
            if (this.state.data.price == 0 && !(true)){
                // if (this.state.data.price == 0 && !(this.props.user.roles.includes(9) || this.props.user.roles.includes(20))){
                content = '';
            }
            else if (isAccess) {
                content = (
                    <div>
                        <div className="lock" style={{ padding: '0', marginBottom: 0, borderBottom: '1px solid #eeeeee', paddingBottom: "20" }}>
                            <h3>Download {this.state.data.name}</h3>
                            <div className="buttons" >
                                <p style={{ maxWidth: '100%' }}>
                                    <a onClick={this.handleDownload} className="learn redColBtn" target="_blank" rel="noopener noreferrer" >
                                        {this.state.isDownloading && <i className="fas fa-circle-notch fa-spin" style={{ marginRight: 3 }}></i>}
                                        Download Here
                                    </a>
                                </p>
                            </div>
                            <div className="title" >
                                    <div style={{  fontSize: 13 }}>{this.state.restrMsg}</div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                content = (
                    <div>
                        <div className="lock" style={{ padding: '0', marginBottom: 0, paddingBottom: "20" }}>
                            <h3>Purchase {this.state.data.name} {/*- {"$" + this.state.data.price} */}</h3>
                            <div className="buttons" >
                                <p style={{ maxWidth: '100%' }}>
                                    {sample}
                                    <a onClick={() => this.segTrack(this.state.data.title)} href={`/research/${this.state.data.code}-${this.state.data.id}/buy`} className="buy redColBtn">Purchase here</a>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
        }

        return content;
    }

    render() {

        let filePath
        if ((this.state.data.image_data)) {
            filePath = encodeURI(this.state.data.image_data.path)
        }

        return (
            <div>
                <div className="singleResearchHeader row" style={{ margin: 0, marginTop: '20px', borderBottom: '1px solid #eeeeee', flexDirection: this.state.data.lang === 'ar' ? 'row-reverse': 'row' }} >
                    <div className="col-md-7">
                        <img style={{ marginBottom: 20, marginTop: 0 }} src={filePath} alt={this.state.data.title} className="mainSingleImage maxHeight" title={this.state.data.name} />
                    </div>
                    <div className="col-md-5 body" >
                        {/* {sidebutton} */}
                        {this.renderHeader()}
                    </div>
                </div>

                <div className="body" style={{padding:'20px'}}>
                    {/* {reportDetails} */}
                    {/* {reportButtons} */}
                    {this.renderBody()}
                    {this.renderBody()?this.renderFooter():null}

                </div>
            </div>
        )
    }
}
