import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Section from "Components/Section";
import Season from "Components/Season";
import VideoSlide from "Components/VideoSlide";
import { hasFlag } from "country-flag-icons";
import { moviesApi, tvApi } from "api";

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

const Lang = styled.span`
    font-size: 14px;
    margin-left: 5px;
    color: rgba(255, 255, 255, 0.5); 
`;

const ItemContainer = styled.div`
line-height: 16px;
    margin:20px 0;
`;

const Item = styled.span``;

const ImdbLink = styled.a`
    margin: 0 0 0 10px;
    padding: 2px 4px;
    font-weight:600;
    background-color:#e1b12c;
    border-radius:2px;
    font-size: 10px;
    color:#000;

    &:hover {
        background-color:#fbc531;
    }
`;

const HompageLink = styled.a`
    margin: 0 0 0 10px;
    padding: 2px 4px;
    font-weight:600;
    background-color:#f0932b;
    border-radius:2px;
    font-size: 10px;
    color:#000;

    &:hover {
        background-color:#ffbe76;
    }
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

const TabContent = styled.div`
    padding:0 10px;
    margin-bottom: 20px;

    &:last-child {
        padding-bottom: 40px;
    }
`;

const ContentTitle = styled.h4`
    font-size: 13px;
    font-weight:600;
    
`;

const ContentList = styled.ul`
    margin-top: 10px;
    margin-bottom: 10px;
`;

const InfoItem = styled.li`
    margin-bottom: 5px;
    &::before{
        content: "・"
    }
`;

const FlagImg = styled.img`
    width:30px;
    margin-right:5px;
`;

const VideoContainer = styled.div`
   padding: 0 20px;
   max-width:100%;
`;

const Detail = (
    {location: { pathname },
    match: {
      params: { id }
    },
    history: { push }}) => {
    const [result, setResult] = useState();
    const [isMovie, setIsMovie] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const parsedId = parseInt(id);

    useEffect(() => {
        if(isNaN(parsedId)){
            return push("/");
        }
        async function fetchData() {
            try {
                if(pathname.includes("/movie/")){
                    const {data: result} = await moviesApi.movieDetail(parsedId);
                    setResult(result)
                    setIsMovie(true)
                }else {
                    const {data: result} = await tvApi.showDetail(parsedId);
                    setResult(result)
                    setIsMovie(false)

                }
            } catch {
                setError("Can't find anything")
            } finally {
                setLoading(false)
            }
        };
        
        fetchData();
    }, [id])
    return loading ? (
        <>
        <Helmet>
            <title>Loading | Nomflix</title>
        </Helmet>
        <Loader />
        </>
    ) : (
        <Container>
            <Helmet>
                <title>{isMovie? result.original_title : result.original_name} | Nomflix</title>
            </Helmet>
            <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
            <Content>
                <Cover bgImage={
                    result.poster_path 
                    ? `https://image.tmdb.org/t/p/original${result.poster_path}` 
                    : require("../assets/noPosterSmall.png")
                } />
                <Data>
                    <Title>
                        {result.original_title ? result.original_title : result.original_name }
                        {
                            result.spoken_languages.map(lang => (
                            <Lang>{lang.name}</Lang>))
                        }
                    </Title>
                    
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
                        <Item>
                            {
                                result.homepage && <HompageLink href={result.homepage} target="_blank">HOMEPAGE</HompageLink>
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
                            {
                                result.seasons && result.seasons.length > 0 &&
                                <Tab>Seasons</Tab>
                            }
                        </TabList>
                        <TabPanel>
                            <TabContent>
                                <ContentTitle>Production Company</ContentTitle>
                                <ContentList>
                                {
                                    result.production_companies.length > 0 
                                    ? result.production_companies.map(company =>(
                                        <InfoItem>{company.name}</InfoItem>
                                    ))
                                    : `No company information`
                                }
                                </ContentList>
                                
                            </TabContent>
                            <TabContent>
                                <ContentTitle>Production Country</ContentTitle>
                                <ContentList>
                                {
                                    result.production_countries.length > 0  
                                    ? result.production_countries.map(country =>(
                                        hasFlag(`${country.iso_3166_1}`) 
                                        ? <FlagImg title={`${country.name}`} src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso_3166_1}.svg`} />
                                        : <InfoItem>{country.name}</InfoItem>
                                    ))
                                    : `No country information`
                                }
                                </ContentList>
                            </TabContent>
                        </TabPanel>
                        <TabPanel>
                            {
                                result.videos.results.length > 0 
                                ? <VideoContainer><VideoSlide videoData={result.videos.results} /></VideoContainer>
                                : <TabContent>No Video</TabContent>
                            }
                        </TabPanel>
                        <TabPanel>
                            
                            {
                                result.seasons && result.seasons.length > 0 &&
                                    <TabContent>
                                        <ContentTitle>Total of Seasons : {result.number_of_seasons}</ContentTitle>
                                            <Section>
                                            {
                                                result.seasons.length > 0 
                                                ? (
                                                    result.seasons.map(s => 
                                                        <Season 
                                                        key={s.id} 
                                                        id={s.id}
                                                        imageUrl={s.poster_path}
                                                        name={s.name} 
                                                        episode_count={s.episode_count}
                                                        air_date={s.air_date}
                                                        />
                                                    )
                                                ) : "No Season"
                                            }
                                            </Section>
                                    </TabContent>
                            }
                        </TabPanel>
                    </Tabs>
                </Data>
            </Content>
            {error && <Message color="#d63031" text={error} />}
        </Container>
    )
}

export default Detail;