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
    }

    .diary {
        height: auto;
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;

        .img {
            width: 514px;
            height: 603px;
            position: relative;
            background: url(${frame}) center/cover;
            margin-top: 15px;

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
            margin-top: 30px;

            textarea {
                width: 100%;
                height: 95%;
                box-sizing: border-box;
                resize: none;
                outline: none;
            }

            .bank {
                height: auto;
                width: 100%;
                margin-top: 10px;
				display: flex;
				justify-content: flex-end;

				a {
					text-decoration: none;
					margin-right: 10px;
				}

                button {
                    display: block;
                    width: 100px;
                    height: 20px;
                    background-color: transparent;
                    border: none;
                    outline: none;
                    font-weight: 500;
                    font-size: 18px;

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
			margin-top: 30px;
			
			.img {
				margin-top: 0;
				margin-bottom: 50px;
			}

			.text {
				width: 80%;
				margin-top: 0;
			}
			
		}
	`}

    ${mq.maxWidth("md")`

		.diary {
			
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
	`}

	${mq.maxWidth("sm")`
		width: 90%;
		.diary {
			
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
	`}

	${mq.maxWidth("ph")`
		.diary {
			
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
	`}
`;

const view = memo(() => {
    return (
        <Layout>
            <Container>
                <p>2023.04.14</p>
                <div className="diary">
                    <div className="img">
                        <input type="file" id="file" />
                        <label htmlFor="file">
                            <img src={text} />
                        </label>
                    </div>
                    <div className="text">
                        <textarea maxLength={5000} placeholder="내용을 작성해주세요. 최대 5000자까지 가능합니다."></textarea>
                        <div className="bank">
                            <NavLink to='/edit'><button type="button">수정하기</button></NavLink>
							<button type="button">삭제하기</button>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    );
});

export default view;
