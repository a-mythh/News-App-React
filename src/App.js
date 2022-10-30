import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function App() {
    let pageSize = 6;
    let country = "gb";
    // apiKey = process.env.REACT_APP_NEWS_APIKEY;
    let apiKey = "2da185221bfa47af8cc891fa64f29bcd";

    const [progress, setProgress] = useState(0);

    return (
        <>
            <Router>
                <Navbar />
                <LoadingBar color="#f11946" progress={progress} />
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <News
                                setProgress={setProgress}
                                key={"general"}
                                country={country}
                                pageSize={pageSize}
                                category={"general"}
                                apiKey={apiKey}
                            />
                        }
                    ></Route>
                    <Route
                        exact
                        path="/business"
                        element={
                            <News
                                setProgress={setProgress}
                                key={"business"}
                                country={country}
                                pageSize={pageSize}
                                category={"business"}
                                apiKey={apiKey}
                            />
                        }
                    ></Route>
                    <Route
                        exact
                        path="/entertainment"
                        element={
                            <News
                                setProgress={setProgress}
                                key={"entertainment"}
                                country={country}
                                pageSize={pageSize}
                                category={"entertainment"}
                                apiKey={apiKey}
                            />
                        }
                    ></Route>
                    <Route
                        exact
                        path="/general"
                        element={
                            <News
                                setProgress={setProgress}
                                key={"general"}
                                country={country}
                                pageSize={pageSize}
                                category={"general"}
                                apiKey={apiKey}
                            />
                        }
                    ></Route>
                    <Route
                        exact
                        path="/health"
                        element={
                            <News
                                setProgress={setProgress}
                                key={"health"}
                                country={country}
                                pageSize={pageSize}
                                category={"health"}
                                apiKey={apiKey}
                            />
                        }
                    ></Route>
                    <Route
                        exact
                        path="/science"
                        element={
                            <News
                                setProgress={setProgress}
                                key={"science"}
                                country={country}
                                pageSize={pageSize}
                                category={"science"}
                                apiKey={apiKey}
                            />
                        }
                    ></Route>
                    <Route
                        exact
                        path="/sports"
                        element={
                            <News
                                setProgress={setProgress}
                                key={"sports"}
                                country={country}
                                pageSize={pageSize}
                                category={"sports"}
                                apiKey={apiKey}
                            />
                        }
                    ></Route>
                    <Route
                        exact
                        path="/technology"
                        element={
                            <News
                                setProgress={setProgress}
                                key={"technology"}
                                country={country}
                                pageSize={pageSize}
                                category={"technology"}
                                apiKey={apiKey}
                            />
                        }
                    ></Route>
                </Routes>
            </Router>
        </>
    );
}
