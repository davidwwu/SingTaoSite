import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SlidingAds from '../SlidingAds';
import SwiperAds from '../SwiperAds';
import ClassifiedSection from '../AdPage/ClassifiedSection';
import CommercialSection from '../AdPage/CommercialSection';

class Main extends Component {

    checkView = () => {
        if (this.props.viewState == "classifiedAds") {
            return (
                <div className="Main" style={{width: 1 + "px"}}>
                    <SwiperAds
                        sliderAds={this.props.sliderAds}
                    />
                    <ClassifiedSection 
                        setPicker={this.props.setPicker}
                        show300Picker={this.props.show300Picker}
                        show500Picker={this.props.show500Picker}
                        currentCat={this.props.currentCat}
                        clasCat={ this.props.clasCat }
                        catTitle={ this.props.catTitle }
                        viewState={ this.props.viewState }
                        onClasMenuClick={ this.props.onClasMenuClick }
                        adList={ this.props.adList }
                        activeClasMenu={this.props.activeClasMenu}
                        showSearchResult={this.props.showSearchResult} />
                </div>
            );
        } else if (this.props.viewState == "commercialAds") {
            return (
                <div className="Main" style={{width: 1 + "px"}}>
                    <SwiperAds
                        sliderAds={this.props.sliderAds}
                    />
                    <CommercialSection
                        viewState={ this.props.viewState } 
                        currentCat={ this.props.currentCat }
                        onComMenuClick={ this.props.onComMenuClick }
                        adList={ this.props.adList }
                        activeComMenu={this.props.activeComMenu} />
                </div>
            );
        } else {
            return (
                <div className="Main" style={{width: 1 + "px"}}>
                    <SwiperAds
                        sliderAds={this.props.sliderAds}
                    />
                    <ClassifiedSection 
                        setPicker={this.props.setPicker}
                        show300Picker={this.props.show300Picker}
                        show500Picker={this.props.show500Picker}
                        currentCat={this.props.currentCat}
                        clasCat={ this.props.clasCat }
                        catTitle={ this.props.catTitle }
                        viewState={ this.props.viewState }
                        onClasMenuClick={ this.props.onClasMenuClick }
                        adList={ this.props.adList }
                        activeClasMenu={this.props.activeClasMenu} />
                    <CommercialSection
                        viewState={ this.props.viewState } 
                        currentCat={ this.props.currentCat }
                        onComMenuClick={ this.props.onComMenuClick }
                        adList={ this.props.adList }
                        activeComMenu={this.props.activeComMenu} />
                </div>
            );
        }
    }

    
    render() {
        return (
            <this.checkView />
        );
    }
}

Main.propTypes = {

};

export default Main;