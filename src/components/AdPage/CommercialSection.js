import React, { Component } from 'react';

import CommercialAd from '../AdPage/CommercialAd';
import CommercialPicMenu from '../AdPage/CommercialPicMenu';
import CommercialTextMenu from '../AdPage/CommercialTextMenu';

class CommercialSection extends Component {
    RenderList = () => {
        return (
            <div className="adList">
                {this.props.adList.map((ad) => {
                    return <CommercialAd key={ ad._id } data={ ad } />
                })}
            </div>
        );
    }

    RenderMenu = () => {
        if (this.props.currentCat != "") {
            return (
                <div>
                    <CommercialTextMenu
                        onComMenuClick={ this.props.onComMenuClick }
                        activeComMenu={ this.props.activeComMenu }
                    />
                    <this.RenderList />
                </div>
                
            );
        } else {
            return (
                <CommercialPicMenu
                    onComMenuClick={ this.props.onComMenuClick }
                />
            );
        }
    }

    render() {
        return (
            <div>
                <div id="commercial-ad" className="commercial-ad-bar">
                    <img src="/images/page_icons/commercial_ad_bar.jpg" alt="Commercial AD Menu Bar"/>
                </div>
        
                <this.RenderMenu />
            </div>
        );
    }
}

export default CommercialSection;