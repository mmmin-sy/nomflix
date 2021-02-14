import React, {useState} from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { moviesApi, tvApi } from "api";

const Container = styled.div`
    padding: 0 20px;    
`;

const Form = styled.form`
    margin-bottom: 50px;
    width: 100%;
`;

const Input = styled.input`
    all: unset;
    font-size: 28px;
    width: 100%;

    &::placeholder{
        font-size: 14px;
    }
`;

const Search = ({location: { pathname }}) => {  
    const [movieResults, setMovieResults] = useState();
    const [tvResults, setTVResults] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchTerm !== ""){
            searchByTerm();
        }
    }

    const updateTerm = (event) => {
        const {target: {value}} = event;
        setSearchTerm(value);
    }

    const searchByTerm = async() => {
        try {
            const {data: {results: movieResults}} = await moviesApi.search(searchTerm);
            const {data: {results: tvResults}} = await tvApi.search(searchTerm);
            setMovieResults(movieResults);
            setTVResults(tvResults);
        } catch {
            setError("Can't get results")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
        <Helmet><title>Search | Nomflix</title></Helmet>
        <Form onSubmit={handleSubmit}>
            <Input placeholder="Search Movies or TV Shows..." value={searchTerm} onChange={updateTerm}/>
        </Form>
        {loading ? <Loader /> : <>
        {movieResults && movieResults.length > 0 && (
            <Section title="Movie Results">
                {movieResults.map(movie => 
                    <Poster 
                        key={movie.id} 
                        id={movie.id}
                        imageUrl={movie.poster_path}
                        title={movie.original_title} 
                        rating={movie.vote_average}
                        isMovie={true}
                        year={movie.release_date && movie.release_date.substring(0, 4)}
                    />
                )}
            </Section>
        )}
        {tvResults && tvResults.length > 0 && (
            <Section title="TV Show Results">
                {tvResults.map(show => 
                    <Poster 
                        key={show.id} 
                        id={show.id}
                        imageUrl={show.poster_path}
                        title={show.original_name} 
                        rating={show.vote_average}
                        isMovie={true}
                        year={show.first_air_date && show.first_air_date.substring(0, 4)}
                    />
                )}
            </Section>
        )}
        {error && <Message color="#d63031" text={error} />}
        {tvResults && movieResults && tvResults.length === 0 && movieResults.length === 0 && (
            <Message text="Nothing found" color="#b2bec3" />
        )}
        </>}
    </Container>
    )

}

export default Search;