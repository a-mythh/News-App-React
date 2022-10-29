import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

export class News extends Component {
    static defaultProps = {
        country: "gb",
        pageSize: 5,
        category: "general",
        apiKey: "4b5e44834e5943bf865b4e986e43dcb4",
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string,
    };

    // Executed whenever an object of News class is created
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        };
    }

    async updateNews() {
        this.props.setProgress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });

        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(50);

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });

        this.props.setProgress(100);
    }

    // Executed after render
    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });

        const url = `https://newsapi.org/v2/top-headlines?country=${
            this.props.country
        }&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
            this.state.page + 1
        }&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        });
    };

    // Executed first
    render() {
        return (
            /*this.state.articles*/ !null && (
                <div className="container my-3">
                    <h3 className="text-center">The People - Top Headlines</h3>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={
                            this.state.articles.length !==
                            this.state.totalResults
                        }
                        loader={<Spinner />}
                        style={{ overflow: "hidden" }}
                    >
                        <div className="containter">
                            <div className="row">
                                {
                                    // !this.state.loading &&
                                    this.state.articles.map((newsArticle) => {
                                        if (
                                            newsArticle.title &&
                                            newsArticle.description &&
                                            newsArticle.urlToImage &&
                                            newsArticle.url
                                        ) {
                                            return (
                                                <div
                                                    className="col-md-4 d-flex justify-content-center"
                                                    key={newsArticle.url}
                                                >
                                                    <NewsItem
                                                        title={
                                                            newsArticle.title
                                                        }
                                                        description={
                                                            newsArticle.description
                                                        }
                                                        imgUrl={
                                                            newsArticle.urlToImage
                                                        }
                                                        newsUrl={
                                                            newsArticle.url
                                                        }
                                                        author={
                                                            newsArticle.author
                                                        }
                                                        date={
                                                            newsArticle.publishedAt
                                                        }
                                                        source={
                                                            newsArticle.source
                                                                .name
                                                        }
                                                    />
                                                </div>
                                            );
                                        } else return null;
                                    })
                                }
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            )
        );
    }
}

export default News;
