import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="Header page-header d-none d-sm-block pt-md-3 pb-3 clearfix">
                <a className="float-left" href="/">
                    <img id="singtao-logo" src="/images/page_icons/ST_logo.png" alt="Singtao Logo"/><br/>
                    <img id="singtao-life" src="/images/page_icons/Singtao_Life.jpg" alt="Singtao life logo"/>
                </a>
                <a href={this.props.topAd.ad_link} target="_blank">
                    <img id="postAd" className="d-none d-lg-block ad-posting-link float-right" src={this.props.topAd.image} alt="Ad posting link"/>
                </a>
            </header>
        );
    }
}

export default Header;