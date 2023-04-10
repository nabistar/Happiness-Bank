import React, { memo } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #abdff1;
    display: flex;
    align-items: center;
    justify-content: center;

    .box {
        width: 500px;
        height: 450px;
        background-color: #fff;

        form {
            padding: 50px 20px;
            box-sizing: border-box;

            p {
                margin-bottom: 40px;
                text-align: center;
                font-size: 40px;
            }

            .input {
                display: flex;
                flex-direction: column;
                margin-bottom: 20px;

                label {
                    margin-bottom: 10px;
                }

                input {
                    outline: none;
                }
            }

            .join {
                p {
                    font-size: 12px;
                }
            }

            .button {
				text-align: center;

                button {
					margin-top: 20px;
                    border: none;
                    outline: none;
                    width: 150px;
                    height: 50px;

					&:hover {
						cursor: pointer;
					}
                }
            }
        }
    }
`;

const login = memo(() => {
	return (
		<Container>
            <div className="box">
                <form>
                    <p>로그인</p>
                    <div className="input">
                        <label htmlFor="id">아이디: </label>
                        <input type="text" id="id" required />
                    </div>
                    <div className="input">
                        <label htmlFor="password">비밀번호: </label>
                        <input type="text" id="password" required />
                    </div>
                    <div className="join">
                        <p>
                            아직 계정이 없으신가요? <NavLink to="/join">회원가입하러 가기</NavLink>
                        </p>
                    </div>
                    <div className="button">
                        <button type="submit">로그인하기</button>
                    </div>
                </form>
            </div>
        </Container>
	);
});

export default login;