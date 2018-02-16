import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClassifiedMenu extends Component {
    previousClass = "";
    in300 = [];
    in500 = [];
    first300 = "";
    first500 = "";

    check300 = (is300) => {
        return parseInt(is300/100) == 3;
    }

    check500 = (is500) => {
        return parseInt(is500/100) == 5;
    }

    Case300 = () => {
        let isTrue = false;
        this.in300 = [];

        this.props.clasCat.forEach(cat => {
            if (this.check300(cat)) {
                this.in300.push(cat);
                if (!isTrue || this.first300 > cat) {
                    this.first300 = cat;
                    isTrue = true;
                }
            }
        });

        return isTrue;
    }

    Case500 = () => {
        let isTrue = false;
        this.in500 = [];

        this.props.clasCat.forEach(cat => {
            if (this.check500(cat)) {
                this.in500.push(cat);
                if (!isTrue || this.first500 > cat) {
                    this.first500 = cat;
                    isTrue = true;
                }
            }
        });

        return isTrue;
    }

    getCity = (cat) => {
        let city;

        if (cat < 500) {
            city = cat % 300;
        } else if (cat > 500) {
            city = cat % 500;
        }
        switch (city) {
            case 1:
                return "城市 A-C";
            case 2:
                return "城市 D-H";
            case 3:
                return "城市 I-M";
            case 4:
                return "城市 N-R";
            case 5:
                return "城市 S";
            case 6:
                return "城市 T-W";
            case 7:
                return "城市 X-Z";
        
            default:
                console.log("city case not matched:", city);
                break;
        }
    }

    handleClick = (cls) => {
        if (cls == "300") {
            this.props.setPicker(cls);

            this.props.onClasMenuClick(this.first300);
        } else if (cls == "500") {
            this.props.setPicker(cls);

            this.props.onClasMenuClick(this.first500);
        } else {
            this.props.setPicker(cls);

            this.props.onClasMenuClick(cls);
        }
    }

    Picker300 = () => {
        return (
            <select id="picker" className="form-control" onChange={this.onPickerChange} value={this.props.currentCat}>
                {this.in300.sort().map((cat, i) => 
                    <option key={cat} value={cat}>住宅出租 {this.getCity(cat)}</option>
                )}
            </select>
        );
    }

    Picker500 = () => {
        return (
            <select id="picker" className="form-control" onChange={this.onPickerChange} value={this.props.currentCat}>
                {this.in500.sort().map((cat, i) => 
                    <option key={cat} value={cat}>住宅出售 {this.getCity(cat)}</option>
                )}
            </select>
        );
    }

    onPickerChange = () => {
        this.props.onClasMenuClick($("#picker").val());
    }

    render() {
        return (
            <div className="classified-ad-menu">
                {this.props.catTitle.includes(1) && <div className="media">
                    <div className="media-left">
                        <img src="/images/page_icons/class1.png" alt="Classified AD Menu Icon"/>
                    </div>
                    <div className="media-body">
                        {this.props.clasCat.includes("101_102") &&
                            <span> // <a id="101_102" className={"menu-item " + (this.props.activeClasMenu === '101_102' ? 'is-active' : '')} onClick={() => this.handleClick("101_102")}>公司</a></span>}

                        {this.props.clasCat.includes("106") &&
                            <span> // <a id="106" className={"menu-item " + (this.props.activeClasMenu === '106' ? 'is-active' : '')} onClick={() => this.handleClick("106")}>餐館</a></span>}

                        {this.props.clasCat.includes("103_104") &&
                            <span> // <a id="103_104" className={"menu-item " + (this.props.activeClasMenu === '103_104' ? 'is-active' : '')} onClick={() => this.handleClick("103_104")}>管家保母托兒</a></span>}

                        {this.props.clasCat.includes("105") &&
                            <span> // <a id="105" className={"menu-item " + (this.props.activeClasMenu === '105' ? 'is-active' : '')} onClick={() => this.handleClick("105")}>衣廠</a></span>}
                        <span> // </span>
                    </div>
                </div>}
                {this.props.catTitle.includes(2) && <div className="media">
                    <div className="media-left">
                        <img src="/images/page_icons/class2.png" alt="Classified AD Menu Icon"/>
                    </div>
                    <div className="media-body">
                        {this.Case300() &&
                            <span> // <a id="300" className={"menu-item " + (this.check300(this.props.activeClasMenu) ? 'is-active' : '')} onClick={() => this.handleClick("300")}>住宅出租</a></span>}
                        
                        {this.Case500() && 
                            <span> // <a id="500" className={"menu-item " + (this.check500(this.props.activeClasMenu) ? 'is-active' : '')} onClick={() => this.handleClick("500")}>住宅出售</a></span>}
                        <span> // </span>
                    </div>
                </div>}
                {this.props.catTitle.includes(3) && <div className="media">
                    <div className="media-left">
                        <img src="/images/page_icons/class3.png" alt="Classified AD Menu Icon"/>
                    </div>
                    <div className="media-body">
                        {this.props.clasCat.includes("200") &&
                            <span> // <a id="200" className={"menu-item " + (this.props.activeClasMenu === '200' ? 'is-active' : '')} onClick={() => this.handleClick("200")}>商業招租</a></span>}

                        {this.props.clasCat.includes("700") &&
                            <span> // <a id="700" className={"menu-item " + (this.props.activeClasMenu === '700' ? 'is-active' : '')} onClick={() => this.handleClick("700")}>商業出讓</a></span>}
                        <span> // </span>
                    </div>
                </div>}
                {this.props.catTitle.includes(4) && <div className="media">
                    <div className="media-left">
                        <img src="/images/page_icons/class4.png" alt="Classified AD Menu Icon"/>
                    </div>
                    <div className="media-body">
                        {this.props.clasCat.includes("400") &&
                            <span> // <a id="400" className={"menu-item " + (this.props.activeClasMenu === '400' ? 'is-active' : '')} onClick={() => this.handleClick("400")}>地產</a></span>}

                        {this.props.clasCat.includes("600") &&
                            <span> // <a id="600" className={"menu-item " + (this.props.activeClasMenu === '600' ? 'is-active' : '')} onClick={() => this.handleClick("600")}>貸款</a></span>}

                        {this.props.clasCat.includes("818") &&
                            <span> // <a id="818" className={"menu-item " + (this.props.activeClasMenu === '818' ? 'is-active' : '')} onClick={() => this.handleClick("818")}>保險</a></span>}
                        
                        {this.props.clasCat.includes("801") &&
                            <span> // <a id="801" className={"menu-item " + (this.props.activeClasMenu === '801' ? 'is-active' : '')} onClick={() => this.handleClick("801")}>福地</a></span>}
                        <span> // </span>
                    </div>
                </div>}
                {this.props.catTitle.includes(5) && <div className="media">
                    <div className="media-left">
                        <img src="/images/page_icons/class5.png" alt="Classified AD Menu Icon"/>
                    </div>
                    <div className="media-body">
                        {this.props.clasCat.includes("804") &&
                            <span> // <a id="804" className={"menu-item " + (this.props.activeClasMenu === '804' ? 'is-active' : '')} onClick={() => this.handleClick("804")}>水電</a></span>}

                        {this.props.clasCat.includes("805") &&
                            <span> // <a id="805" className={"menu-item " + (this.props.activeClasMenu === '805' ? 'is-active' : '')} onClick={() => this.handleClick("805")}>裝修油漆</a></span>}

                        {this.props.clasCat.includes("802_803") &&
                            <span> // <a id="802_803" className={"menu-item " + (this.props.activeClasMenu === '802_803' ? 'is-active' : '')} onClick={() => this.handleClick("802_803")}>清潔殺蟲</a></span>}
                        <span> // </span>
                    </div>
                </div>}
                {this.props.catTitle.includes(6) && <div className="media">
                    <div className="media-left">
                        <img src="/images/page_icons/class6.png" alt="Classified AD Menu Icon"/>
                    </div>
                    <div className="media-body">
                        {this.props.clasCat.includes("810") &&
                            <span> // <a id="810" className={"menu-item " + (this.props.activeClasMenu === '810' ? 'is-active' : '')} onClick={() => this.handleClick("810")}>電腦監控</a></span>}

                        {this.props.clasCat.includes("808") &&
                            <span> // <a id="808" className={"menu-item " + (this.props.activeClasMenu === '808' ? 'is-active' : '')} onClick={() => this.handleClick("808")}>商業</a></span>}

                        {this.props.clasCat.includes("816") &&
                            <span> // <a id="816" className={"menu-item " + (this.props.activeClasMenu === '816' ? 'is-active' : '')} onClick={() => this.handleClick("816")}>會計稅務</a></span>}

                        {this.props.clasCat.includes("809") &&
                            <span> // <a id="809" className={"menu-item " + (this.props.activeClasMenu === '809' ? 'is-active' : '')} onClick={() => this.handleClick("809")}>法律</a></span>}

                        {this.props.clasCat.includes("814") &&
                            <span> // <a id="814" className={"menu-item " + (this.props.activeClasMenu === '814' ? 'is-active' : '')} onClick={() => this.handleClick("814")}>命相</a></span>}
                        <span> // </span>
                    </div>
                </div>}
                {this.props.catTitle.includes(7) && <div className="media">
                    <div className="media-left">
                        <img src="/images/page_icons/class7.png" alt="Classified AD Menu Icon"/>
                    </div>
                    <div className="media-body">
                        {this.props.clasCat.includes("813") &&
                            <span> // <a id="813" className={"menu-item " + (this.props.activeClasMenu === '813' ? 'is-active' : '')} onClick={() => this.handleClick("813")}>按摩推拿</a></span>}

                        {this.props.clasCat.includes("812") &&
                            <span> // <a id="812" className={"menu-item " + (this.props.activeClasMenu === '812' ? 'is-active' : '')} onClick={() => this.handleClick("812")}>醫藥</a></span>}

                        {this.props.clasCat.includes("817") &&
                            <span> // <a id="817" className={"menu-item " + (this.props.activeClasMenu === '817' ? 'is-active' : '')} onClick={() => this.handleClick("817")}>醫生</a></span>}

                        {this.props.clasCat.includes("815") &&
                            <span> // <a id="815" className={"menu-item " + (this.props.activeClasMenu === '815' ? 'is-active' : '')} onClick={() => this.handleClick("815")}>美容</a></span>}
                        <span> // </span>
                    </div>
                </div>}
                {this.props.catTitle.includes(8) && <div className="media">
                    <div className="media-left">
                        <img src="/images/page_icons/class8.png" alt="Classified AD Menu Icon"/>
                    </div>
                    <div className="media-body">
                        {this.props.clasCat.includes("811") &&
                            <span> // <a id="811" className={"menu-item " + (this.props.activeClasMenu === '811' ? 'is-active' : '')} onClick={() => this.handleClick("811")}>招生</a></span>}
                        <span> // </span>
                    </div>
                </div>}
                {this.props.catTitle.includes(9) && <div className="media">
                    <div className="media-left">
                        <img src="/images/page_icons/class9.png" alt="Classified AD Menu Icon"/>
                    </div>
                    <div className="media-body">
                        {this.props.clasCat.includes("900") &&
                            <span> // <a id="900" className={"menu-item " + (this.props.activeClasMenu === '900' ? 'is-active' : '')} onClick={() => this.handleClick("900")}>二手車</a></span>}

                        {this.props.clasCat.includes("807") &&
                            <span> // <a id="807" className={"menu-item " + (this.props.activeClasMenu === '807' ? 'is-active' : '')} onClick={() => this.handleClick("807")}>專車接送</a></span>}

                        {this.props.clasCat.includes("806") &&
                            <span> // <a id="806" className={"menu-item " + (this.props.activeClasMenu === '806' ? 'is-active' : '')} onClick={() => this.handleClick("806")}>搬運</a></span>}
                        <span> // </span>
                    </div>
                </div>}
                {this.props.catTitle.includes(10) && <div className="media">
                    <div className="media-left">
                        <img src="/images/page_icons/class10.png" alt="Classified AD Menu Icon"/>
                    </div>
                    <div className="media-body">
                        {this.props.clasCat.includes("1000") &&
                            <span> // <a id="1000" className={"menu-item " + (this.props.activeClasMenu === '1000' ? 'is-active' : '')} onClick={() => this.handleClick("1000")}>姻緣</a></span>}

                        {this.props.clasCat.includes("1201") &&
                            <span> // <a id="1201" className={"menu-item " + (this.props.activeClasMenu === '1201' ? 'is-active' : '')} onClick={() => this.handleClick("1201")}>尋人</a></span>}

                        {this.props.clasCat.includes("1200") &&
                            <span> // <a id="1200" className={"menu-item " + (this.props.activeClasMenu === '1200' ? 'is-active' : '')} onClick={() => this.handleClick("1200")}>遺失</a></span>}

                        {this.props.clasCat.includes("1300") &&
                            <span> // <a id="1300" className={"menu-item " + (this.props.activeClasMenu === '1300' ? 'is-active' : '')} onClick={() => this.handleClick("1300")}>啟事</a></span>}
                        <span> // </span>
                    </div>
                </div>}

                {this.props.show300Picker && 
                    <this.Picker300 />
                }
                {this.props.show500Picker && 
                    <this.Picker500 />
                }
            </div>
        );
    }
}

export default ClassifiedMenu;