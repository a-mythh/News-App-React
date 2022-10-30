import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

export default function News(props) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);

        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(50);

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgress(100);
    };

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, []);

    const fetchMoreData = async () => {
        setPage(page + 1);

        const url = `https://newsapi.org/v2/top-headlines?country=${
            props.country
        }&category=${props.category}&apiKey=${props.apiKey}&page=${
            page + 1
        }&pageSize=${props.pageSize}`;
        setLoading(true);

        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };

    // Executed first
    return (
        /*this.state.articles !null && */ <div className="container my-3">
            <h3 className="text-center">The People - Top Headlines</h3>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
                style={{ overflow: "hidden" }}
            >
                <div className="containter">
                    <div className="row">
                        {
                            // !this.state.loading &&
                            articles.map((newsArticle) => {
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
                                                title={newsArticle.title}
                                                description={
                                                    newsArticle.description
                                                }
                                                imgUrl={newsArticle.urlToImage}
                                                newsUrl={newsArticle.url}
                                                author={newsArticle.author}
                                                date={newsArticle.publishedAt}
                                                source={newsArticle.source.name}
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
    );
}

News.defaultProps = {
    country: "gb",
    pageSize: 5,
    category: "general",
    apiKey: "4b5e44834e5943bf865b4e986e43dcb4",
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string,
};
