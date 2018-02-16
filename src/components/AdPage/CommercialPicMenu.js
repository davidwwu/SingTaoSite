import React, { Component } from 'react';

class CommercialPicMenu extends Component {
    handleClick = (cat) => {
        this.props.onComMenuClick(cat);
        
    } 

    render() {
        return (
            <div className="commercial-ad-menu com-ad-wrapper">
                <a onClick={() => this.handleClick("real_loan")}>
                    <img className="commercial-ad-item" src="/images/page_icons/webIcon_realty.jpg" alt="Commercial AD Menu"/>
                </a>
                <a onClick={() => this.handleClick("appli_cons_furn_home")}>
                    <img className="commercial-ad-item" src="/images/page_icons/webIcon_home.jpg" alt="Commercial AD Menu"/>
                </a>
                <a onClick={() => this.handleClick("doc_healt_hosp")}>
                    <img className="commercial-ad-item" src="/images/page_icons/webIcon_health.jpg" alt="Commercial AD Menu"/>
                </a>
                <a onClick={() => this.handleClick("food_rest_super_dept")}>
                    <img className="commercial-ad-item" src="/images/page_icons/webIcon_restaurant.jpg" alt="Commercial AD Menu"/>
                </a>
                <a onClick={() => this.handleClick("auto_trans")}>
                    <img className="commercial-ad-item" src="/images/page_icons/webIcon_auto.jpg" alt="Commercial AD Menu"/>
                </a>
                <a onClick={() => this.handleClick("acc_bank_insur_ivs")}>
                    <img className="commercial-ad-item" src="/images/page_icons/webIcon_finance.jpg" alt="Commercial AD Menu"/>
                </a>
                <a onClick={() => this.handleClick("att_tax")}>
                    <img className="commercial-ad-item" src="/images/page_icons/webIcon_legal.jpg" alt="Commercial AD Menu"/>
                </a>
                <a onClick={() => this.handleClick("cell_tele")}>
                    <img className="commercial-ad-item" src="/images/page_icons/webIcon_technology.png" alt="Commercial AD Menu"/>
                </a>
                <a onClick={() => this.handleClick("air_hotel_trav")}>
                    <img className="commercial-ad-item" src="/images/page_icons/webIcon_travel.jpg" alt="Commercial AD Menu"/>
                </a>
                <a onClick={() => this.handleClick("fas_casino_ent")}>
                    <img className="commercial-ad-item" src="/images/page_icons/webIcon_fashion.jpg" alt="Commercial AD Menu"/>
                </a>
                <a onClick={() => this.handleClick("auc_coml_edu")}>
                    <img className="commercial-ad-item" src="/images/page_icons/webIcon_business.jpg" alt="Commercial AD Menu"/>
                </a>
                <a onClick={() => this.handleClick("other")}>
                    <img className="commercial-ad-item" src="/images/page_icons/webIcon_others.jpg" alt="Commercial AD Menu"/>
                </a>
            </div>
        );
    }
};

export default CommercialPicMenu;