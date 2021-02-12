import React from "react";
import HomePresenter from "./HomePresenter";
import { trendApi } from "api";

export default class extends React.Component{
    state = {
        trendMovie: null,
        trendTV: null,
        trendPerson: null,
        error: null,
        loading: true
    }

    async componentDidMount(){
        try {
            const {data: {results: trendMovie}} = await trendApi.trendMovie();
            const {data: {results: trendTV}} = await trendApi.trendTV();
            const {data: {results: trendPerson}} = await trendApi.trendPerson();
            this.setState({
                trendMovie,
                trendTV,
                trendPerson
            })
        } catch {
            this.setState({
                error: "Can't get Trend"
            })
        } finally {
            this.setState({
                loading: false
            })
        }
    }

    render(){
        const { trendMovie, trendTV, trendPerson, error, loading} = this.state;
        return (
            <HomePresenter 
                trendMovie={trendMovie}
                trendTV={trendTV}
                trendPerson={trendPerson}
                error={error} 
                loading={loading} 
            />
        ) 
    }
}