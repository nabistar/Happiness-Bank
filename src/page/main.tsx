import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";

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
    position: relative;

    .overlay {
        width: 100%;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
		display: none;

		&.pop {
			display: flex;
		}

        .logout {
            width: 400px;
            height: 200px;
            background-color: #eff9fc;
			border: 1px solid #0c4a60;
			padding: 60px 0;
			box-sizing: border-box;

			p {
				text-align: center;
			}

			.logoutButton {
				height: auto;
				text-align: center;
				margin-top: 40px;

				button {
					width: 100px;
					height: 30px;
					border: 1px solid #000;

					&:first-child {
						margin-right: 20px;
						background-color: #0c4a60;
						color: #fff;
					}

					&:hover {
						cursor: pointer;
					}
				}
			}
        }
    }

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
                background-color: #0c4a60;
                button {
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
                margin-top: 20px;

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

	const [logout, setLogout] = useState<boolean>(false);
	const navigate = useNavigate();

	// 로그아웃 팝업
	const logoutPop = useCallback(() => {
		setLogout(true);
		document.body.style.overflow = "hidden";
	}, []);

	// 로그아웃 팝업 숨기기
	const logoutHidden = useCallback(() => {
		setLogout(false);
		document.body.style.overflow = "unset";
	}, []);

	// 로그아웃 후 메인으로
	const logoutAct = useCallback(() => {
		document.body.style.overflow = "unset";
		setLogout(false);
		navigate("/");
	}, []);

    return (
        <Container>
            <div className={classNames('overlay', {pop: logout})}>
                <div className="logout">
                    <p>로그아웃 후 메인 페이지로 돌아갈까요?</p>
                    <div className="logoutButton">
                        <button type="button" onClick={logoutAct}>네</button>
                        <button type="button" onClick={logoutHidden}>아니오</button>
                    </div>
                </div>
            </div>
            <div className="box">
                <p className="title">닉네임님, 안녕하세요!</p>
                <div className="boxContainer">
                    <div className="cancel">
                        <button type="button" onClick={logoutPop}></button>
                    </div>
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
