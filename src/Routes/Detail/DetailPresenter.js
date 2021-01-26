import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Helmet from "react-helmet";
import Loader from "Components/Loader";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position:relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-image: url(${props => props.bgImage});
    background-position:center center;
    background-size: cover;
    filter:blur(3px);
    opacity:0.5;
    z-index:0;
`;

const Content = styled.div`
    display: flex;
    width:100%;
    height:100%;
    position:relative;
    z-index:1;
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position:center center;
    background-size: cover;
    height:100%;
    border-radius: 5px;
`;

const Data = styled.div`
    width:70%;
    margin-left:10px;
`;

const Title = styled.h3`
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin:20px 0;
`;

const Item = styled.span``;

const ImdbLink = styled.a`
    margin: 0 10px;
    padding: 0 3px;
    font-weight:600;
    background-color:#F5C518;
    border-radius:2px;
    font-size: 10px;
    color:#000;
`;

const Divider = styled.span`
    margin: 0 10px;
`;

const OverView = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height:1.5;
    width:50%;
    margin-bottom: 20px;
`;

const ProductionInfo = styled.div`
    padding:0 10px;
    margin-bottom: 20px;
`;

const InfoTitle = styled.h4`
    font-weight:600;
`;

const InfoList = styled.ul`
    margin-top: 10px;
    margin-bottom: 10px;
`;

const InfoItem = styled.li`
    margin-bottom: 5px;
`;

const VideoContainer = styled.div`
    width:70%;
    padding: 10px;
`;

const DetailPresenter = ({
    result, loading, error
}) => (
    loading ? (
        <>
        <Helmet>
            <title>Loading | Nomflix</title>
        </Helmet>
        <Loader />
        </>
    ) : (
        <Container>
            <Helmet>
                <title>{result.original_title ? result.original_title : result.original_name} | Nomflix</title>
            </Helmet>
            <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
            <Content>
                <Cover bgImage={
                    result.poster_path 
                    ? `https://image.tmdb.org/t/p/original${result.poster_path}` 
                    : require("../../assets/noPosterSmall.png")
                } />
                <Data>
                    <Title>{result.original_title ? result.original_title : result.original_name }</Title>
                    <ItemContainer>
                        <Item>
                            {result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {result.runtime ? result.runtime : result.episode_run_time[0]} min
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {result.genres && result.genres.map((genre, index) => index === result.genres.length -1 ? genre.name : `${genre.name} / ` )}
                        </Item>

                        <Item>
                            {
                                result.imdb_id && <ImdbLink href={`https://www.imdb.com/title/${result.imdb_id}`} target="_blank">IMDb</ImdbLink>
                            }
                        </Item>
                    </ItemContainer>
                    <OverView>
                        {result.overview}
                    </OverView>
                    
                    <Tabs>
                        <TabList>
                            <Tab>Production Information</Tab>
                            <Tab>Videos</Tab>
                        </TabList>
                        <TabPanel>
                            <ProductionInfo>
                                <InfoTitle>Product Company</InfoTitle>
                                <InfoList>
                                {
                                    result.production_companies 
                                    ? result.production_companies.map(company =>(
                                        <InfoItem>{company.name}</InfoItem>
                                    ))
                                    : `no company`
                                }
                                </InfoList>
                                
                            </ProductionInfo>
                            <ProductionInfo>
                                <InfoTitle>Product Country</InfoTitle>
                                <InfoList>
                                {
                                    result.production_countries 
                                    ? result.production_countries.map(country =>(
                                        <InfoItem>{country.name}</InfoItem>
                                    ))
                                    : `no company`
                                }
                                </InfoList>
                                
                            </ProductionInfo>
                        </TabPanel>
                        <TabPanel>
                            <VideoContainer>
                            {
                                result.videos.results &&   
                                    <ReactPlayer width="100%" height="100%" url={`https://www.youtube.com/watch?v=${result.videos.results[0].key}`} />                             
                            }
                            </VideoContainer>
                        </TabPanel>
                    </Tabs>
                </Data>
            </Content>
        </Container>
    )
);

DetailPresenter.propTypes ={
    result:PropTypes.object,
    loading:PropTypes.bool.isRequired, 
    error:PropTypes.string
}

export default DetailPresenter;