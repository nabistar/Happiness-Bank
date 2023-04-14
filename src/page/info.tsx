import React, { memo } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// 미디어 쿼리
import mq from "../MediaQuery";

// 로고
import mainLogo from "../assets/img/mainLogo.png";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .box {
        width: 500px;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;

        .logo {
            width: 100%;
            height: auto;

            img {
                width: 100%;
            }
        }

        .button {
            display: flex;
            justify-content: center;
            margin-top: 200px;
            height: auto;
            position: absolute;
            bottom: 50px;

            a {
                display: block;
                text-decoration: none;
                font-size: 22px;
                font-weight: 500;
                color: #fde368;
                width: 100px;
                height: 50px;
                text-align: center;
                padding-top: 17px;
                box-sizing: border-box;

                &:first-child {
                    margin-right: 100px;
                }
            }
        }
    }

    ${mq.maxWidth("sm")`
		.box {
			width: 300px;

			.button {
				a {
					font-size: 18px;
				}
			}
		}

	`}
`;

const info = memo(() => {
    return (
        <Container>
            <div className="box">
                <div className="logo">
                    <img src={mainLogo} alt="메인 로고" />
                </div>
                <div className="button">
                    <NavLink to="/login">로그인</NavLink>
                    <NavLink to="/join">회원가입</NavLink>
                </div>
            </div>
        </Container>
    );
});

export default info;
