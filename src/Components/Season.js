import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    font-size: 12px;    
`;

const Image = styled.div`
    background-image: url(${props => props.bgUrl});
    height: 180px;
    background-size: cover;
    border-radius: 4px;
    background-position: center center;
    transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
    margin-bottom: 5px;
`;

const Name = styled.span`
    display: block;
    margin-bottom: 3px;
`;

const EpisodeCount = styled.span`
    display:block;
    margin-bottom: 3px;
`;

const AirDate = styled.p`
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
`;

const Season = ({id, imageUrl, name, episode_count, air_date}) => (
    <Container key={id}>
        <ImageContainer>
            <Image bgUrl={
                imageUrl 
                ? `https://image.tmdb.org/t/p/w200${imageUrl}` 
                : require("../assets/noPosterSmall.png").default
                } />
        </ImageContainer>
        <Name>{name}</Name>
        <EpisodeCount>{episode_count} Episodes</EpisodeCount>
        <AirDate>{air_date}</AirDate>
    </Container>
);

Season.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    episode_count: PropTypes.number,
    air_date: PropTypes.string,
};

export default Season;