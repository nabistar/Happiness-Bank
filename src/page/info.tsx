import React, { memo } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .box {
        width: 500px;
        height: 300px;

        p {
            text-align: center;
            margin-bottom: 70px;

            &:first-child#title {
                font-family: "maple", "sans-serif";
                font-size: 70px;
                font-weight: 700;
            }
        }

        .button {
            display: flex;
            justify-content: center;

            a {
                display: block;
                text-decoration: none;
                font-weight: bold;
                width: 100px;
                height: 50px;
                background-color: #fff;
                border-radius: 20%;
                margin-right: 10px;
                text-align: center;
                padding-top: 17px;
                box-sizing: border-box;
            }
        }
    }
`;

const info = memo(() => {
    return (
        <Container>
            <div className="box">
                <p id="title">행복 저금통</p>
                <p>오늘 있었던 행복한 일을 저금해보세요.</p>
                <div className="button">
                    <NavLink to="/login">로그인</NavLink>
                    <NavLink to="/join">회원가입</NavLink>
                </div>
            </div>
        </Container>
    );
});

export default info;
