import React, { Component } from 'react';

import * as api from '../api';
import Header from './Header';
import RightSide from './RightSide';
import LeftSide from './LeftSide';
import Main from "./Home/Main";
import Menu from './Menu';

const pushState = (obj, url) => 
    window.history.pushState(obj, '', url);

const onPopState = handler => {
    window.onpopstate = handler;
}

const check300 = (is300) => {
    return parseInt(is300/100) == 3;
}

const check500 = (is500) => {
    return parseInt(is500/100) == 5;
}

class App extends Component {
    state = { 
        show300Picker: check300(window.initialCat),
        show500Picker: check500(window.initialCat),
        clasCat: [],
        catTitle: [],
        initialData: this.props.initialData,
        adList: this.props.initialData,
        category: window.initialCat,
        view: window.initialView,
        activeMenu: window.initialView,
        activeClasMenu: window.initialCat,
        activeComMenu: window.initialCat,
        sliderAds: window.sliderAds,
        showSearchResult: false,
        rightSideAds: window.rightSideAds,
        leftSideAds: window.leftSideAds,
        topAd: window.topAd
    };

    componentDidMount() {
        // timers, listeners

        api.fetchClasMenu()
        .then(({ clasCat, catTitle }) => {
            this.setState({
                clasCat,
                catTitle
            });
        });

        // push initial state when landing
        if (this.state.view == "classifiedAds") {
            pushState(
                {   category: this.state.category,
                    view: "classifiedAds",
                    adList: this.state.adList,
                    activeMenu: this.state.activeMenu,
                    activeClasMenu: this.state.activeClasMenu
                },
                `/classifiedAds/${this.state.category}`
            );
        } else if (this.state.view == "commercialAds") {
            pushState(
                {   category: this.state.category,
                    view: "commercialAds",
                    adList: this.state.adList,
                    activeMenu: this.state.activeMenu,
                    activeComMenu: this.state.activeComMenu
                },
                `/commercialAds/${this.state.category}`
            );
        } else {
            pushState(
                {   category: this.state.category,
                    view: "home",
                    adList: this.state.adList,
                    activeMenu: this.state.activeMenu
                },
                `/`
            );
        }

        // handle browser back/forward buttons
        onPopState((event) => {
            if (event.state) {
                this.setState({
                    category: event.state.category,
                    view: event.state.view,
                    adList: event.state.adList,
                    activeMenu: event.state.activeMenu,
                    activeClasMenu: event.state.activeClasMenu,
                    activeComMenu: event.state.activeComMenu
                });
            }
        });
    }

    componentWillUnmount() {
        // unmount handler
        onPopState(null);

        // !!!!remember to unmount timer!!!!
    }

    setPicker = (cat) => {
        if (cat == 300) {
            this.setState({
                show300Picker: true,
                show500Picker: false
            });
        } else if (cat == 500) {
            this.setState({
                show300Picker: false,
                show500Picker: true
            });
        } else {
            this.setState({
                show300Picker: false,
                show500Picker: false
            });
        }
    }

    fetchHome = () => {
        this.setState({
            view: "home",
            category: "",
            adList: [],
            activeMenu: "home",
            activeClasMenu: "",
            activeComMenu: ""
        });
        console.log("pushing state: category:", this.state.category, "view: home", "adList", this.state.adList )
        pushState(
            {   category: this.state.category,
                view: "home",
                adList: [],
                activeMenu: "home",
                activeClasMenu: "",
                activeComMenu: ""
            },
            `/`
        );

    }

    fetchClasAds = (adClass) => {
        api.fetchClasAdByClass(adClass)
            .then(adsInClass => {
                this.setState({
                    view: "classifiedAds",
                    category: adClass,
                    initialData: adsInClass,
                    adList: adsInClass,
                    activeMenu: "classifiedAds",
                    activeClasMenu: adClass,
                    showSearchResult: false
                });
                pushState(
                    {   category: adClass,
                        view: "classifiedAds",
                        adList: this.state.adList,
                        activeMenu: "classifiedAds",
                        activeClasMenu: adClass
                    },
                    `/classifiedAds/${adClass}`
                );
            });
    }

    fetchComAds = (cat) => {
        api.fetchComAdByClass(cat)
            .then((ads) => {
                this.setState({
                    view: "commercialAds",
                    category: cat,
                    initialData: ads,
                    adList: ads,
                    activeMenu: "commercialAds",
                    activeComMenu: cat
                });
                pushState(
                    {
                        category: cat,
                        view: "commercialAds",
                        adList: this.state.adList,
                        activeMenu: "commercialAds",
                        activeComMenu: cat
                    },
                    `/commercialAds/${cat}`
                );
            });
    }

    charInEachStr = (arr, char) => {
        let yesno = false;
        arr.forEach(function(element) {
            if (element.search(char) !== -1) {
                return yesno = true;
            }
        }, this);

        return yesno;
    }
    
    onSearch = (searchStr) => {
        let updatedList = this.state.initialData;

        // filter adlist
        updatedList = updatedList.filter(item => {
            if (item.title.search(searchStr) !== -1 || this.charInEachStr(item.description, searchStr)) {
                return true;
            } else return false;
        });
        // setState
        this.setState({
            adList: updatedList,
            showSearchResult: true
        });
    }

    render() {
        return (
            <div className="App">
                <Header topAd={this.state.topAd} />
                <Menu
                    onSearch={this.onSearch}
                    setPicker={this.setPicker}
                    onHomeMenuClick={this.fetchHome}
                    onClasMenuClick={this.fetchClasAds}
                    onComMenuClick={this.fetchComAds}
                    activeMenu={this.state.activeMenu} />
                <div className="wrapper">
                    <Main 
                        sliderAds={this.state.sliderAds}
                        show300Picker={this.state.show300Picker}
                        show500Picker={this.state.show500Picker}
                        setPicker={this.setPicker}
                        currentCat={this.state.category}
                        clasCat={this.state.clasCat}
                        catTitle={this.state.catTitle}
                        initialData={this.props.initialData}
                        viewState={this.state.view}
                        onClasMenuClick={this.fetchClasAds}
                        onComMenuClick={this.fetchComAds}
                        adList={this.state.adList}
                        activeClasMenu={this.state.activeClasMenu}
                        activeComMenu={this.state.activeComMenu}
                        showSearchResult={this.state.showSearchResult} />
                    { this.state.leftSideAds.length != 0 && 
                        <LeftSide leftSideAds={this.state.leftSideAds} />
                    }

                    { this.state.rightSideAds.length != 0 && 
                        <RightSide rightSideAds={this.state.rightSideAds} />
                    }
                </div>
            </div>
        );
    }
};

export default App;