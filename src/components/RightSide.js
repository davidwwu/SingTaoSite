import React, { Component } from 'react';

class RightSide extends Component {
    render() {
        return (
            <aside className="aside right-side">
                {this.props.rightSideAds.map((ad, index) => (
                    <a key={ index } href={ ad.ad_link !== "" ? ad.ad_link : ad.image } data-fancybox={ad.ad_link !== "" ? null : "rightSide_noLink"} data-caption={ad.title} target={ad.ad_link !== "" ? "_blank" : null}>
                        <img className="right-side-item" src={ ad.image } alt={ "Right side ad" } />
                    </a>
                ))}
            </aside>
        );
    }
}

export default RightSide;