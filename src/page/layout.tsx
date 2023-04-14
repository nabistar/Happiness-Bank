import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";

// 미디어쿼리
import mq from "../MediaQuery";

// 이미지
import logo from "../assets/img/logo.png";

const Container = styled.div`
    min-height: 100%;
    height: auto;
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
		z-index: 1;

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
        width: 85%;
        height: 100%;
        padding: 30px 0;
        margin: auto;
        box-sizing: border-box;

        .button {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            width: auto;
            height: auto;

            a {
                text-decoration: none;
                margin-right: 20px;
            }

            button {
                height: 30px;
                background-color: transparent;
                border: none;
                outline: none;
                font-size: 20px;
                color: #fde368;

				&:hover {
					cursor: pointer;
				}
            }
        }

        .title {
            text-align: center;
            margin-bottom: 30px;

            p {
                text-align: center;
                margin-top: 20px;
                color: #fde368;
                font-size: 22px;
            }
        }

        .content {
            width: 100%;
            height: auto;
            display: flex;
        }
    }

    ${mq.maxWidth("xl")`
		.box {
			width: 90%;
			.content {
			}
		}
	`}

    ${mq.maxWidth("lg")`
		.box {
			.title {
				margin-top: 50px;
			}
		}
	`}

	${mq.maxWidth("sm")`
		.box {
			width: 95%;
			.content {
				padding: 5px;
				margin-top: 70px;
			}
		}
	`}
`;

const main = memo((props: {children: React.ReactNode}) => {
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
            <div className={classNames("overlay", { pop: logout })}>
                <div className="logout">
                    <p>로그아웃 후 첫 페이지로 돌아갈까요?</p>
                    <div className="logoutButton">
                        <button type="button" onClick={logoutAct}>
                            네
                        </button>
                        <button type="button" onClick={logoutHidden}>
                            아니오
                        </button>
                    </div>
                </div>
            </div>
            <div className="box">
                <div className="button">
                    <NavLink to="/main">
                        <button type="button">Main</button>
                    </NavLink>
                    <button type="button" onClick={logoutPop}>
                        Logout
                    </button>
                </div>
                <div className="title">
                    <img src={logo} alt="logo" />
                    <p>OOO님, 안녕하세요!</p>
                </div>
                <div className="content">
                    {props.children}
                </div>
            </div>
        </Container>
    );
});

export default main;
