import React, { memo, useState, useCallback, FormEvent, InvalidEvent } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

// 미디어쿼리
import mq from "../MediaQuery";

// 슬라이스
import { logIn } from "../Slice/userSlice";

// 커스텀 훅
import {useAppDispatch, useAppSelector} from "../Hook";

const Container = styled.div`
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

					&.invalid + p {
                        display: block;
                    }
                }

				p.error {
                    font-size: 12px;
                    text-align: left;
                    margin-bottom: 0;
                    color: #f00;
                    display: none;

                    &.visible {
                        display: block;
                    }
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

    ${mq.maxWidth("sm")`
		.box {
			width: 80%;
		}
	`}
`;

const login = memo(() => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const formSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const current = e.currentTarget;
		const id = current.userid.value;
		const password = current.password.value;

		dispatch(logIn({userid: id, password: password})).then((result) => {
			if (!(result.payload instanceof Error) && result.payload?.rtcode === 200){
				navigate("/main");
			} else if (!(result.payload instanceof Error) && result.payload?.rtcode === 404) {
				window.alert("존재하지 않는 사용자입니다.");
			}
		});
        
    };

	const required = useCallback((e: InvalidEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value: string = e.target.value;

        if (value.length == 0 || value.trim().length == 0 || value == "" || value == null || value == undefined) {
            e.target.classList.add("invalid");
        }
    }, []);

    const requiredRemove = useCallback((e: InvalidEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.target.classList.remove("invalid");
        e.target.classList.remove("password");
        e.target.classList.remove("idcheck");
    }, []);

    return (
        <Container>
            <div className="box">
                <form onSubmit={formSubmit}>
                    <p>로그인</p>
                    <div className="input">
                        <label htmlFor="id">아이디: </label>
                        <input type="text" id="userid" required onInvalid={required} onFocus={requiredRemove} />
						<p className="error">아이디를 입력해주세요.</p>
                    </div>
                    <div className="input">
                        <label htmlFor="password">비밀번호: </label>
                        <input type="password" id="password" required onInvalid={required} onFocus={requiredRemove} />
						<p className="error">비밀번호를 입력해주세요.</p>
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
