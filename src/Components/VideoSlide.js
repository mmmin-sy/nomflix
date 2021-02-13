import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPlayer from "react-player";

const VideoSlide = ({videoData}) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      
    return (
        <Slider {...settings}>
            {
                 videoData.map((v, index) =>
                    <div key={v.id}>
                        <h3>Video #{index +1} : {v.name}</h3>
                        <ReactPlayer 
                        width="100%" 
                        controls="true" 
                        url={`https://www.youtube.com/watch?v=${v.key}`} 
                        />
                    </div>
                )
            }
        </Slider>
    )
}
VideoSlide.propTypes = {
    videoData: PropTypes.array.isRequired,
};
export default VideoSlide;