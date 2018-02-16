import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClassifiedAd extends Component {
    render() {
        return (
            <div className="ad-item ad-wrapper box-shadow">
                <div className="ad-bar">
                    <img className="" src="/images/page_icons/classified_ad_idBar.jpg" alt=""/>
                    <span className="ad-id">{this.props.data.ad_id}</span>
                </div>
                <div className="ad-text">
                    <div className="ad-header">
                        {this.props.data.title}
                    </div>
                    <div className="ad-desc">
                        {this.props.data.description.map((desc,id) => 
                            <div key={this.props.data._id + id + "description"}>{desc}</div>
                        )}
                    </div>
                </div>
                <div className="ad-img">
                    <a href={this.props.data.image} data-fancybox="ad-group" data-caption={this.props.data.title}>
                        <img src={this.props.data.image} alt="Ad Picture"/>
                    </a>
                </div>
            </div>
        );
    }
}

ClassifiedAd.propTypes = {
    title: PropTypes.string,
    discription: PropTypes.string
};

export default ClassifiedAd;