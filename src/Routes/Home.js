import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import { trendApi } from "api";

const Container = styled.div`
    padding: 40px;
    text-align: center;
`;
const HomeSection = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 20px;
`;

const Title = styled.h3`
    display: block;
    font-size: 18px;
    margin: 20px 0;
`;

const Image = styled.div`
    background-image: url(${props => props.bgUrl});
    height: 180px;
    width: 200px;
    background-size: cover;
    border-radius: 4px;
    background-position: center center;
    transition: opacity 0.1s linear;
`;

const Name = styled.span`
    position:absolute;
    bottom:5px;
    right: 5px;
    opacity: 0;
    transition: opacity 0.1s linear;
`;

const Nummer = styled.span`
    position:absolute;
    top:5px;
    left: 5px;
    opacity: 0;
    font-size: 50px;
    font-weight: 600;
    transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
    margin-bottom: 5px;
    &:hover {
        ${Image}{
            opacity: 0.3;
        }
        ${Nummer} {
            opacity: 0.5;
        }
        ${Name} {
            opacity: 1;
        }
    }
    position: relative;
`;

const Home = () => {
    const [trendMovie, setTrendMovie] = useState();
    const [trendTV, setTrendTV] = useState();
    const [trendPerson, setTrendPerson] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const {data: {results: trendMovie}} = await trendApi.trendMovie();
                const {data: {results: trendTV}} = await trendApi.trendTV();
                const {data: {results: trendPerson}} = await trendApi.trendPerson();
                setTrendMovie(trendMovie);
                setTrendTV(trendTV);
                setTrendPerson(trendPerson);
            } catch {
                setError("Can't get Trend information")
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [])

    return loading 
    ? <Loader />
    : <>
        <Helmet>
            <title>Home | Nomflix</title>
        </Helmet>
        {loading ? <Loader /> : (
        <Container>
            <Title>Today's Trend Movies </Title>
            { trendMovie && trendMovie.length > 0 && (
                <HomeSection>
                    {
                        trendMovie
                        .sort((a, b) => {return b.popularity - a.popularity})
                        .filter(movie => movie.poster_path !== null)
                        .map((movie, index) =>
                            index < 3 &&
                            <Link to={`/movie/${movie.id}`}>
                                <ImageContainer>
                                    <Image bgUrl={movie.poster_path 
                                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                                    : require("../assets/noPosterSmall.png").default} />
                                    <Nummer>{index + 1}</Nummer>
                                    <Name>{movie.title}</Name>
                                </ImageContainer>
                            </Link>
                        )
                    }
                </HomeSection>
            )}
            <Title>Today's Trend Shows</Title>
            { trendTV && trendTV.length > 0 && (
                <HomeSection>
                    {
                        trendTV
                        .sort((a, b) => {return b.popularity - a.popularity})
                        .filter(tv => tv.poster_path !== null)
                        .map((tv, index) =>
                            index < 3 &&
                            <Link to={`/show/${tv.id}`}>
                                <ImageContainer>
                                    <Image bgUrl={tv.poster_path 
                                        ? `https://image.tmdb.org/t/p/w300${tv.poster_path}`
                                        : require("../assets/noPosterSmall.png").default} />
                                    <Nummer>{index + 1}</Nummer>
                                    <Name>{tv.name}</Name>
                                </ImageContainer>
                            </Link>
                            
                        )
                    }
                </HomeSection>
            )}
            <Title>Today's Trend Stars</Title>
            { trendPerson && trendPerson.length > 0 && (
                <HomeSection>
                        {
                            trendPerson
                            .sort((a, b) => {return b.popularity - a.popularity})
                            .filter(person => person.profile_path !== null)
                            .map((person, index) =>
                                index < 3 &&
                                <ImageContainer>
                                <Image bgUrl={person.profile_path 
                                    ? `https://image.tmdb.org/t/p/w235_and_h235_face/${person.profile_path}`
                                    : require("../assets/noPosterSmall.png").default} />
                                <Name>{person.name}</Name>
                                </ImageContainer>
                            )
                        }
                </HomeSection>
            )}
            {error && <Message color="#d63031" text={error} />}
        </Container>
        )}
    </>
} 

export default Home;