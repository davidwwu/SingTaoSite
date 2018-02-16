import React, { Component } from 'react';
import ReactPlayer from 'react-player';
//import { Swiper, Slide } from 'react-dynamic-swiper';
import Swiper from 'react-id-swiper';
import config from '../../config';


class SwiperAds extends Component {
    constructor(props) {
        super(props);

        this.swiper = null;
        this.notMobile = !(/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent));
    }
    
    state = {
        slides: this.props.sliderAds,
        shouldPlay: null
    }
    
    componentDidMount() {
        // play videos that shows up on the swiper
        this.swiper.on("slideChange", () => {
            if(this.notMobile) {
                this.setState({ shouldPlay: this.swiper.activeIndex });
            }
        });

        // pause and unpause the video if the slide is clicked
        $("[data-fancybox]").fancybox({
            beforeShow: (instance, slide) => {
                this.setState({ shouldPlay: null });
                this.swiper.autoplay.stop();
            },
            afterClose: (instance, slide) => {
                if(this.notMobile) this.setState({ shouldPlay: this.swiper.activeIndex });
                this.swiper.autoplay.start();
            }
        });

        // pause when not viewing the page
        window.onfocus = () => {
            if(this.notMobile) this.setState({ shouldPlay: this.swiper.activeIndex });
            this.swiper.autoplay.start();
        };
        window.onblur = () => {
            this.setState({ shouldPlay: null });
            this.swiper.autoplay.stop();
        };
    }

    render() {
        const { slides } = this.state;
        const params = {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next.swiper-button-white',
                prevEl: '.swiper-button-prev.swiper-button-white'
            },
            spaceBetween: 30,
            autoplay: {
                delay: 18000,
                disableOnInteraction: false
            }
        }
        
        return (
            <Swiper {...params} ref={ node => { if(node) this.swiper = node.swiper } }>
                {slides.map((slide, i) => {
                    {return slide.media_format == 'youtube' ? (
                        <div className="swiper-cell video-wrap" id={i} key={i}>
                            <ReactPlayer
                                config={{
                                    youtube: {
                                        playerVars: { origin: config.serverUrl }
                                    }
                                }}
                                url={ slide.yt_short_link }
                                playing={ this.state.shouldPlay === i }
                                onReady={
                                    () => {
                                        if(i === 0 && this.notMobile) {
                                            this.setState({ shouldPlay: 0 });
                                        }
                                    }
                                }
                                volume={ 0.2 }
                                loop
                            />
                            <a
                            className="video-wrap__overlay"
                            data-fancybox href={slide.yt_full_link}
                            data-fancybox="slider-group"
                            ></a>
                        </div>
                    ) : (
                        <div className="swiper-cell">
                            <a href={ slide.ad_link !== "" ? slide.ad_link : slide.image } data-fancybox={slide.ad_link !== "" ? null : "slider-group"} data-caption="Slider Image" target={slide.ad_link !== "" ? "_blank" : null}>
                                <img className="swiper-cell-image" src={slide.image} alt="carousel slide" />
                            </a>
                        </div>
                    )}
                })}
            </Swiper>
        );
    }
}

export default SwiperAds;