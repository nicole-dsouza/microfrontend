import { isEmpty } from 'lodash'
import React, {Component} from 'react'

export default class ResearchRow extends Component {
    render() {
        let { researchProps } = this.props
        let image = ''

        if ((researchProps.image_data)) {
            image = `url('${encodeURI(researchProps.image_data.path)}')`
        }

        let link2
        link2 = researchProps.type_id == 1 && researchProps.is_user_purchased == 0 ?
            <a href={`/researchtest/${researchProps.code}-${researchProps.id}`} >
                <h2 style={{ textAlign: researchProps.lang === 'ar' ? 'right' : 'left' }}><i className="fa fa-lock"></i> {researchProps.name} </h2>
            </a> :
            researchProps.is_user_purchased == 1 ?
                <a href={`/researchtest/${researchProps.code}-${researchProps.id}`} >
                    <h2 style={{ textAlign: researchProps.lang === 'ar' ? 'right' : 'left' }} ><i className="fa fa-unlock"></i> {researchProps.name} </h2>
                </a> :
                <a href={`/researchtest/${researchProps.code}-${researchProps.id}`}><h2 style={{ textAlign: researchProps.lang === 'ar' ? 'right' : 'left' }} >{researchProps.name}</h2></a>

        let sample;
        if (!isEmpty(researchProps.sample_data)) {
            sample =
                <a href={researchProps.sample_data.path} className="btn btn-secondary btn-sm btn-block mt-2 mb-2" target="_blank" rel='noopener noreferrer' download>View Sample</a>
        }

        let date = new Date(researchProps.published_at)
        let time = date.toLocaleString("en-US", { month: 'long', year: 'numeric' })

        let subText;
        if(researchProps.type_id == 2 && (researchProps.sponsor_logo_data))
        {
          subText = <div style={{ marginBottom: 10, textAlign: researchProps.lang === 'ar' ? 'right' : 'left', display: 'flex', flexDirection: researchProps.lang === 'ar' ? 'row-reverse' : 'row' }}>
              <div>SPONSORED by {(researchProps.sponsor_logo_data) && <img src={researchProps.sponsor_logo_data.path} style={{ height: 20, margin: '0px 0px 0px 5px' }} />}</div>
              &nbsp;| &nbsp; <div>{time}</div>
          </div>
        } else if (researchProps.type_id == 1 && researchProps.is_user_purchased == 1) {
          subText = <div style={{ marginBottom: 10, textAlign: researchProps.lang === 'ar' ? 'right' : 'left' }}>{time} </div>
        } else if (researchProps.type_id == 1){
          subText = <div style={{ marginBottom: 10, textAlign: researchProps.lang === 'ar' ? 'right' : 'left' }}>${researchProps.price} | {time} </div>
        } else {
          subText = <div style={{ marginBottom: 10, textAlign: researchProps.lang === 'ar' ? 'right' : 'left' }}>FREE | {time} </div>
        }


        return (
            <div>
                <div className="newsSingle row" style={{ flexDirection: `${researchProps.lang === 'ar' ? 'row-reverse' : 'row'}`}}>
                    <div className="col-md-3">
                        <div style={{ backgroundImage: image, width: '100%', height: '100%', backgroundSize: 'cover' }}>
                            <a href={`/researchtest/${researchProps.code}-${researchProps.id} `}></a>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row" style={{ flexDirection: `${researchProps.lang === 'ar' ? 'row-reverse' : 'row'}`, justifyContent: 'flex-start' }}>
                            <div className="col-md-12 col-lg-9">
                                <div>{link2}</div>
                                <span style={{ fontSize: 14, width: "100%" }}>{subText}</span>
                            </div>
                            <div className="col-md-12 col-lg-3">
                                <a href={`/researchtest/${researchProps.code}-${researchProps.id}`} className="btn btn-main btn-sm btn-block">View Report</a>
                                {sample}
                            </div>
                        </div>
                        <div style={{ textAlign: researchProps.lang === 'ar' ? 'right' : 'left' }}>{researchProps.short_description}</div>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}