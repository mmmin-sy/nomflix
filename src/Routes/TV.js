import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { tvApi } from "api";

const Container = styled.div`
    padding: 20px;
`;

const TV = () => {
    const [topRated, setTopRated] = useState();
    const [popular, setPopular] = useState();
    const [airingToday, setAiringToday] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const {data: {results: topRated}} = await tvApi.topRated();
                const {data: {results: popular}} = await tvApi.popular();
                const {data: {results: airingToday}} = await tvApi.airingToday();
                setTopRated(topRated);
                setPopular(popular);
                setAiringToday(airingToday);
            } catch {
                setError("Can't get Movies")
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
            <title>TV Shows | Nomflix</title>
        </Helmet>
        {loading ? <Loader /> : (
        <Container>
            {topRated && topRated.length > 0 && (
                <Section title="Top Rated Shows">
                    {topRated.map(show => (
                        <Poster 
                            key={show.id} 
                            id={show.id}
                            imageUrl={show.poster_path}
                            title={show.original_name} 
                            rating={show.vote_average}
                            year={show.release_date && show.release_date.substring(0, 4)}
                        />
                    ))}
                </Section>
            )}
            {popular && popular.length > 0 && (
                <Section title="Popular Shows">
                    {popular.map(show => (
                        <Poster 
                            key={show.id} 
                            id={show.id}
                            imageUrl={show.poster_path}
                            title={show.original_name} 
                            rating={show.vote_average}
                            year={show.first_air_date && show.first_air_date.substring(0, 4)}
                        />
                    ))}
                </Section>
            )}
            {airingToday && airingToday.length > 0 && (
                <Section title="Airing Today Shows">
                    {airingToday.map(show => (
                        <Poster 
                            key={show.id} 
                            id={show.id}
                            imageUrl={show.poster_path}
                            title={show.original_name} 
                            rating={show.vote_average}
                            year={show.release_date && show.release_date.substring(0, 4)}
                        />
                    ))}
                </Section>
            )}
            {error && <Message color="#d63031" text={error} />}
        </Container>
        )}
    </>
};

export default TV;