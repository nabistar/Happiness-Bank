import React, { memo } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// 미디어쿼리
import mq from "../MediaQuery";

// 이미지
import cancel from "../assets/img/cancel.png";
import text from "../assets/img/text.png";

const Container = styled.div`
    min-height: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
    box-sizing: border-box;

    .box {
        width: 80%;
        height: auto;

        .title {
            text-align: center;
            font-size: 25px;
            margin-bottom: 30px;
            font-weight: 700;
        }

        .boxContainer {
            height: auto;
            background-color: #fff;

            .cancel {
                display: block;
                width: 30px;
                height: 30px;
                border: none;
                background: url(${cancel}) center/cover;
                margin-left: auto;

                &:hover {
                    cursor: pointer;
                }
            }

            .nav {
                height: auto;
                display: flex;
                align-items: center;
                padding: 0 30px;
                margin-top: 20px;
                box-sizing: border-box;
                flex-wrap: wrap;
                justify-content: space-between;

                p {
                    text-align: center;
                }

                a {
                    display: block;
                    width: 150px;
                    height: 50px;
                    text-decoration: none;
                    background-color: #0c4a60;
                    color: #fff;
                    text-align: center;
                    padding-top: 17px;
                    box-sizing: border-box;
                }

                .search {
                    width: auto;
                    height: auto;
                    display: flex;
                    align-items: center;

                    p {
                        margin-right: 10px;
                    }
                }
            }

            .contentBox {
                height: auto;
                min-height: 550px;
                padding: 30px;
                box-sizing: border-box;
                border-top: 1px solid #0c4a60;
                margin-top: 40px;

                p {
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 40px;
                }

                .content {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;

                    a {
                        img {
                            width: 135px;
                            height: 135px;
                        }
                    }
                }
            }
        }
    }

    ${mq.maxWidth("md")`
		.box {
			.boxContainer {
				.nav {
					
					p {
						width: 49%;
					}

					.search {
						width: 49%;

						p {
							width: auto;
						}
					}

					a {
						margin: 30px auto 0;
					}
				}
			}
		}
	`}

    ${mq.maxWidth("sm")`
		.box {
			.boxContainer {
				.nav {
					p {
						width: 100%;
					}

					.search {
						width: 100%;
						justify-content: center;
						margin-top: 30px;
					}
				}
			}
		}
	`}
`;

const main = memo(() => {
    return (
        <Container>
            <div className="box">
                <p className="title">닉네임님, 안녕하세요!</p>
                <div className="boxContainer">
                    <button type="button" className="cancel"></button>
                    <div className="nav">
                        <p>저금된 행복: 10개</p>
                        <div className="search">
                            <p>저금한 날 찾기</p>
                            <input type="date" />
                        </div>
                        <NavLink to="/write">저금하기</NavLink>
                    </div>
                    <div className="contentBox">
                        <p>2023년 4월 10일</p>
                        <div className="content">
                            <NavLink to="/view">
                                <img src={text} />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
});

export default main;
