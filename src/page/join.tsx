import React, { memo, useState, useCallback, FormEvent, InvalidEvent } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// 미디어쿼리
import mq from "../MediaQuery";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .box {
        width: 500px;
        height: 600px;
        background-color: #fff;

        form {
            width: 100%;
            height: 100%;
            padding: 50px 20px 0;
            box-sizing: border-box;

            p {
                margin-bottom: 40px;
                text-align: center;
                font-size: 40px;
            }

            .input {
                height: 61px;
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

                    &.password ~ p.pass {
                        display: block;
                    }

                    &.idcheck ~ p.id {
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

            .login {
                height: auto;
                p {
                    font-size: 12px;
                }
            }

            .button {
                text-align: center;
                height: auto;

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

const join = memo(() => {
    const formSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const current = e.currentTarget;
        const passCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        const idCheck = /^[a-zA-z0-9]{4,20}$/;

        const name: string = current.nickname.value;
        const id: string = current.userid.value;
        const password: string = current.password.value;
        const passwordCheck: string = current.passwordCheck.value;

        if (!passCheck.test(password)) {
            current.password.classList.add("password");
        }

        if (!idCheck.test(id)) {
            current.userid.classList.add("idcheck");
        }
    }, []);

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
                    <p>회원가입</p>
                    <div className="input">
                        <label htmlFor="name">이름: </label>
                        <input type="text" id="name" name="nickname" required onInvalid={required} onFocus={requiredRemove} />
                        <p className="error">이름을 입력해주세요.</p>
                    </div>
                    <div className="input">
                        <label htmlFor="id">아이디: </label>
                        <input type="text" id="id" name="userid" required onInvalid={required} onFocus={requiredRemove} />
                        <p className="error">아이디를 입력해주세요.</p>
                        <p className="error id">아이디는 영문자, 숫자 조합으로 4~20자리까지 가능합니다.</p>
                    </div>
                    <div className="input">
                        <label htmlFor="password">비밀번호: </label>
                        <input type="text" id="password" name="password" required onInvalid={required} onFocus={requiredRemove} />
                        <p className="error">비밀번호를 입력해주세요.</p>
                        <p className="error pass">비밀번호는 영문자, 숫자, 특수문자 조합으로 8~25자리까지 가능합니다.</p>
                    </div>
                    <div className="input">
                        <label htmlFor="passwordCheck">비밀번호 확인: </label>
                        <input type="text" id="passwordCheck" name="passwordCheck" required onInvalid={required} onFocus={requiredRemove} />
                        <p className="error">비밀번호를 확인해주세요.</p>
                    </div>
                    <div className="login">
                        <p>
                            이미 계정이 있으신가요? <NavLink to="/login">로그인하러 가기</NavLink>
                        </p>
                    </div>
                    <div className="button">
                        <button type="submit">가입하기</button>
                    </div>
                </form>
            </div>
        </Container>
    );
});

export default join;
