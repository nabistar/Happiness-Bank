import React, { memo, useCallback, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import dayjs from "dayjs";

// 레이아웃
import Layout from "./layout";

// 미디어쿼리
import mq from "../MediaQuery";

// 슬라이스
import { getItem, deleteItem } from "../Slice/dailySlice";

// 커스텀 훅
import { useAppDispatch, useAppSelector } from "../Hook";

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

            img {
                display: block;
                width: 475px;
                height: 425px;
                margin: 24px 0 0 20px;
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
		padding: 30px 10px;

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
		width: 85%;

		.diary {
			
			.img {
				width: 400px;
				height: 500px;
				background-size: 100% 100%;

				img {
					width: 370px;
					height: 352px;
					margin: 20px 0 0 15px;
				}
			}

			.text {
				width: 100%;
			}
			
		}
	`}

	${mq.maxWidth("sm")`
		width: 100%;
		.diary {
			
			.img {
				width: 380px;
				height: 500px;
				background-size: 100% 100%;

				img {
					width: 351px;
					height: 352px;
					margin: 20px 0 0 15px;
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
				img {
					width: 277px;
					height: 282px;
					margin: 16px 0 0 12px;
				}
			}

			.text {
				width: 100%;
			}
			
		}
	`}
`;

const view = memo(() => {
    const { data: daily } = useAppSelector((state) => state.dailySlice);
    const { data: user } = useAppSelector((state) => state.userSlice);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getItem({ id: id }));
        }
    }, [user && user !== true && !Array.isArray(user) && user.id]);

    const deleteDaily = useCallback(() => {
        if (id && window.confirm("정말 삭제할까요?")) {
            dispatch(deleteItem({ id: id })).then((result) => {
                window.alert("삭제되었습니다.");
                navigate("/main");
            });
        }
    }, []);

    return (
        <Layout>
            {daily && !Array.isArray(daily) && (
                <Container>
                    <p>{dayjs(daily.date).format("YYYY.MM.DD")}</p>
                    <div className="diary">
                        <div className="img">{typeof daily.file_path === "string" ? <img src={daily.file_path} /> : <img src={text} />}</div>
                        <div className="text">
                            <textarea maxLength={5000} placeholder="내용을 작성해주세요. 최대 5000자까지 가능합니다." value={daily.content} readOnly></textarea>
                            <div className="bank">
                                <NavLink to={`/edit/${daily.id}`}>
                                    <button type="button">수정하기</button>
                                </NavLink>
                                <button type="button" onClick={deleteDaily}>
                                    삭제하기
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            )}
        </Layout>
    );
});

export default view;
