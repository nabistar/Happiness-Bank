import React, { memo } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";

// 레이아웃
import Layout from "./layout";

// 미디어쿼리
import mq from "../MediaQuery";

// 이미지
import text from "../assets/img/text.png";
import grid from "../assets/img/grid.png";
import frame from "../assets/img/frame.png";

const Container = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    padding: 30px 20px;
    box-sizing: border-box;
    background: url(${grid}) center/cover;
    border-radius: 10px;

    p {
        width: 100%;
        font-weight: 500;
        font-size: 30px;
        text-align: center;
        margin-bottom: 30px;
    }

    .diary {
        height: auto;

        form {
            display: flex;
            justify-content: space-evenly;
            height: auto;
            flex-wrap: wrap;

            .img {
                width: 514px;
                height: 603px;
                position: relative;
                background: url(${frame}) center/cover;

                input {
                    display: none;
                }

                label {
                    display: block;
                    width: 460px;
                    height: 410px;
                    margin: 30px 0 0 27px;

                    &:hover {
                        cursor: pointer;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .text {
                width: 49%;
                height: 603px;

                textarea {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    resize: none;
                    outline: none;
                }
            }

            .bank {
                height: auto;
                width: 100%;
                margin-top: 50px;

                button {
                    display: block;
                    width: 100px;
                    height: 30px;
                    background-color: transparent;
                    border: none;
                    outline: none;
                    font-weight: 500;
                    font-size: 20px;
                    margin: auto;

                    &:hover {
                        cursor: pointer;
                        color: #3c5230;
                    }
                }
            }
        }
    }

    ${mq.maxWidth("max")`
		width: 80%;
		margin: auto;

		.diary {
			form {
				.img {
					margin-bottom: 50px;
				}

				.text {
					width: 80%;
				}
			}
		}
	`}

    ${mq.maxWidth("md")`

		.diary {
			form {
				.img {
					width: 400px;
					height: 500px;
					background-size: 100% 100%;

					label {
						width: 360px;
						height: 340px;
						margin: 30px 0 0 20px;
					}
				}

				.text {
					width: 100%;
				}
			}
		}
	`}

	${mq.maxWidth("sm")`
		width: 90%;
		.diary {
			form {
				.img {
					width: 380px;
					height: 500px;
					background-size: 100% 100%;

					label {
						width: 340px;
						height: 340px;
						margin: 25px 0 0 20px;
					}
				}

				.text {
					width: 100%;
					height: 500px;
				}
			}
		}
	`}

	${mq.maxWidth("ph")`
		.diary {
			form {
				.img {
					width: 300px;
					height: 400px;
					label {
						width: 260px;
						height: 270px;
					}
				}

				.text {
					width: 100%;
				}
			}
		}
	`}

`;

const write = memo(() => {
    return (
        <Layout>
            <Container>
                <p>2023.04.14</p>
                <div className="diary">
                    <form>
                        <div className="img">
                            <input type="file" id="file" />
                            <label htmlFor="file">
                                <img src={text} />
                            </label>
                        </div>
                        <div className="text">
                            <textarea maxLength={5000} placeholder="내용을 작성해주세요. 최대 5000자까지 가능합니다."></textarea>
                        </div>
                        <div className="bank">
                            <button type="submit">저금하기</button>
                        </div>
                    </form>
                </div>
            </Container>
        </Layout>
    );
});

export default write;
