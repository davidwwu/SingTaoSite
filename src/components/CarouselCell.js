import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import config from '../../config';

class CarouselCell extends Component {

    checkType = (props) => {
        if (props.type == "image") {
            return (
                <div className="carousel-cell">
                    <a href={this.props.url} data-fancybox="slider-group" data-caption="Slider Image">
                        <img className="carousel-cell-image" src={this.props.url} alt="carousel slide" />
                    </a>
                </div>
            );
        } else if (props.type == "youtube") {
            return (
                <div className="carousel-cell video-wrap" id={props.id}>
                    <ReactPlayer
                        url={this.props.shortVidUrl}
                        playing={this.props.shouldPlay == props.id}
                        onReady={this.props.playerReady}
                        config={{
                            youtube: {
                                playerVars: { origin: window.location.host }
                            }
                        }}
                        volume={0.7}
                        controls={true}
                        loop
                    />
                    <a
                        className="video-wrap__overlay"
                        data-fancybox href={this.props.fullVidUrl}
                        data-fancybox="slider-group"
                    ></a>
                </div>
            );
        }
    }
    
    render() {
        return (
            <this.checkType type={this.props.type} id={this.props.id} />
        );
    }
}

export default CarouselCell;