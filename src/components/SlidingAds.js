import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import CarouselCell from './CarouselCell';
import { fetchSlider } from '../api';

class SlidingAds extends Component {
    state = {
        shouldPlay: '',
        ready: false
    }

    sliderAds = [];

    playerReady = () => {
        this.setState({ ready: true });

        // if the first slide is video, set it to play
        this.setState({ shouldPlay: '0' });
    }
    
    componentDidMount() {
        var $carousel = $(".carousel").flickity({
            imagesLoaded: true,
            autoPlay: 12000,
            wrapAround: true 

        });
        var flkty = $carousel.data('flickity');

        $carousel.on("select.flickity", () => {
            if(this.state.ready) {
                this.setState({ shouldPlay: flkty.selectedIndex });
                
            }
        });

        // pause and unpause the video if the slide is clicked
        $("[data-fancybox]").fancybox({
            beforeShow: (instance, slide) => {
                console.log("flkty.selectedIndex:", flkty.selectedIndex);
                this.setState({ shouldPlay: '' });
            },
            afterClose: (instance, slide) => {
                console.log("flkty.selectedIndex:", flkty.selectedIndex);
                this.setState({ shouldPlay: flkty.selectedIndex });
                $carousel.flickity('playPlayer');
            }
        });
    }

    render() {
        return (
            <div className="carousel">
                {this.props.sliderAds.map((ad, index) => {
                    return <CarouselCell
                        key={ad._id}
                        type={ad.media_format}
                        shortVidUrl={ad.yt_short_link}
                        fullVidUrl={ad.yt_full_link}
                        id={index}
                        shouldPlay={this.state.shouldPlay}
                        playerReady={this.playerReady}
                        onVidClick={this.onVidClick}
                    />
                })}
                
            </div>
        );
    }
}

export default SlidingAds;