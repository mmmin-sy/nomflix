import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { moviesApi } from "api";

const Container = styled.div`
    padding: 20px;
`;

const TV = () => {
    const [nowPlaying, setNowPlaying] = useState();
    const [upcoming, setUpcoming] = useState();
    const [popular, setPopular] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const {data: {results: nowPlaying}} = await moviesApi.nowPlaying();
                const {data: {results: upcoming}} = await moviesApi.upcoming();
                const {data: {results: popular}} = await moviesApi.popular();
                setNowPlaying(nowPlaying);
                setUpcoming(upcoming);
                setPopular(popular);
            } catch {
                setError("Can't get Movie")
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
            <title>Movies | Nomflix </title>
        </Helmet>
        {loading ? <Loader /> : (
            <Container>
                { nowPlaying && nowPlaying.length > 0 && (
                    <Section title="Now Playing">{nowPlaying.map(movie => (
                        <Poster 
                        key={movie.id} 
                        id={movie.id}
                        imageUrl={movie.poster_path}
                        title={movie.original_title} 
                        rating={movie.vote_average}
                        isMovie={true}
                        year={movie.release_date && movie.release_date.substring(0, 4)}
                        />
                    ))}</Section>
                )}
                { upcoming && upcoming.length > 0 && (
                    <Section title="Upcoming Movies">{upcoming.map(movie => (
                    <Poster 
                        key={movie.id} 
                        id={movie.id}
                        imageUrl={movie.poster_path}
                        title={movie.original_title} 
                        rating={movie.vote_average}
                        isMovie={true}
                        year={movie.release_date && movie.release_date.substring(0, 4)}
                        />
                    ))}</Section>
                )}
                { popular && popular.length > 0 && (
                    <Section title="Popular Movies">{popular.map(movie => (
                        <Poster 
                        key={movie.id} 
                        id={movie.id}
                        imageUrl={movie.poster_path}
                        title={movie.original_title} 
                        rating={movie.vote_average}
                        isMovie={true}
                        year={movie.release_date && movie.release_date.substring(0, 4)}
                        />
                    ))}</Section>
                )}
                {error && <Message color="#d63031" text={error} />}
            </Container>
        )}
    </>
};

export default TV;