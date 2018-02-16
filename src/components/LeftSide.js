import React, { Component } from 'react';

class LeftSide extends Component {
    render() {
        return (
            <aside className="aside left-side">
                {this.props.leftSideAds.map((ad, index) => (
                    <a key={ index } href={ ad.ad_link !== "" ? ad.ad_link : ad.image } data-fancybox={ad.ad_link !== "" ? null : "leftSide_noLink"} data-caption={ad.title} target={ad.ad_link !== "" ? "_blank" : null}>
                        <img className="left-side-item" src={ ad.image } alt={ "Left side ad" } />
                    </a>
                ))}
            </aside>
        );
    }
}

export default LeftSide;