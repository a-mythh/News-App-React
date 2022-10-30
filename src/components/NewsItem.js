import React from "react";

export default function NewsItem(props) {
    let { title, description, imgUrl, newsUrl, author, date, source } = props;

    return (
        <div className="my-3">
            <div
                className="card d-flex "
                style={{ width: "20rem", height: "38rem" }}
            >
                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">
                    {source}
                </span>
                <img
                    src={imgUrl}
                    className="card-img-top"
                    style={{ width: "20rem", height: "12rem" }}
                    alt="Not available in your location"
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <div className="d-flex justify-content-center">
                        <a
                            href={newsUrl}
                            target="_blank"
                            className="btn btn-dark btn-sm"
                            rel="noreferrer"
                        >
                            Read more
                        </a>
                    </div>
                </div>
                <div className="card-footer text-center">
                    <small className="text-muted">
                        By{" "}
                        {author
                            ? author.substring(0, 5) === "https"
                                ? "Unknown"
                                : author
                            : "Unknown"}{" "}
                        <div>{new Date(date).toGMTString()}</div>
                    </small>
                </div>
            </div>
        </div>
    );
}
