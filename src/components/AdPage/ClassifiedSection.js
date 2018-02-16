import React, { Component } from 'react';

import ClassifiedAd from './ClassifiedAd';
import ClassifiedMenu from './ClassifiedMenu';

class ClassifiedSection extends Component {
    // TODO: create share button for each ad
    RenderList = () => {
        let list = null;
        
        if(this.props.currentCat != "") {
            if (Array.isArray(this.props.adList)) {
                list = this.props.adList.map((ad) => 
                    <ClassifiedAd key={ad._id} data={ad} />
                );
            } else {
                list = <ClassifiedAd data={this.props.adList} />
            }
        } else if (this.props.showSearchResult) {
            list = this.props.adList.map((ad) => 
                <ClassifiedAd key={ad._id} data={ad} />
            );
        }
        
        return (
            <div className="adList">
                {list}
            </div>
        );
    }

    render() {
        return (
            <div>
                <div id="classified-ad" className="classified-ad-bar">
                    <img src="/images/page_icons/classified_ad_bar.jpg" alt="Classified AD Menu Bar"/>
                </div>
        
                <ClassifiedMenu 
                    setPicker={this.props.setPicker}
                    show300Picker={this.props.show300Picker}
                    show500Picker={this.props.show500Picker}
                    currentCat={this.props.currentCat}
                    clasCat={ this.props.clasCat }
                    catTitle={ this.props.catTitle }
                    onClasMenuClick={ this.props.onClasMenuClick }
                    activeClasMenu={ this.props.activeClasMenu }
                />

                <this.RenderList />
            </div>
        );
    }
}

export default ClassifiedSection;