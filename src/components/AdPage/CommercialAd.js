import React, { Component } from 'react';

class CommercialAd extends Component {
    render() {
        return (
            <div className="ad-item ad-wrapper box-shadow">
                <div className="ad-bar">
                    <img className="" src="/images/page_icons/classified_ad_idBar.jpg" alt=""/>
                    <span className="ad-id">{this.props.data.ad_id}</span>
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

export default CommercialAd;