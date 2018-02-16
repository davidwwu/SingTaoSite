import React, { Component } from 'react';
import PropTypes from "prop-types";

class Menu extends Component {
    handleClick = (button) => {
        this.props.setPicker(null);
        
        if (button == "#classified-ad") {
            this.props.onClasMenuClick("");
        } else if (button == "#commercial-ad") {
            this.props.onComMenuClick("");
        } else {
            this.props.onHomeMenuClick("");
        }

        // let timeingOffset;
        // let marginOffset;
        
        if ( $(window).width() < 992) {
            $(".navbar-collapse").collapse('hide');
        //     timeingOffset = 1500;
        //     marginOffset = 70;
        // } else {
        //     timeingOffset = 800;
        //     marginOffset = 70;
        }
        // setTimeout(() => {
        //     $('html, body').animate({
        //         scrollTop: $(button).offset().top - marginOffset
        //     }, timeingOffset);
        // }, 300);
    }

    render() {
        return (
            <div className="Menu sticky-top">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#homeNavbar" aria-controls="homeNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                
                    <div className="collapse navbar-collapse" id="homeNavbar">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a
                                    className={
                                        "nav-link " + (this.props.activeMenu === 'home' ? 'is-active' : '')
                                    }
                                    id="home-btn"
                                    onClick={() => this.handleClick("body")}>
                                        首頁 <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={
                                        "nav-link " + (this.props.activeMenu === 'classifiedAds' ? 'is-active' : '')
                                    }
                                    id="classified-ad-btn"
                                    onClick={() => this.handleClick("#classified-ad")}>
                                        分類廣告
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={
                                        "nav-link " + (this.props.activeMenu === 'commercialAds' ? 'is-active' : '')
                                    }
                                    id="commercial-ad-btn"
                                    onClick={() => this.handleClick("#commercial-ad")}>
                                        商業廣告
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.singtaousa.com/la/" target="_blank">星島新聞</a>
                            </li>
                        </ul>
                        {
                            this.props.activeMenu == "classifiedAds" &&

                            <form className="form-inline my-2 my-lg-0" onSubmit={(event) => {
                                event.preventDefault();
                                $(".navbar-collapse").collapse('hide');
                                this.props.onSearch($("#searchInput").val());
                            }
                            }>
                                <input id="searchInput" className="form-control mr-sm-2" type="search" placeholder="搜尋分類廣告" aria-label="Search" />
                                    
                                <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        }
                    </div>
                </nav>
            </div>
        );
    }
}

export default Menu;