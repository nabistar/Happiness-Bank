import React, { memo, useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";
import dayjs from "dayjs";

// 레이아웃
import Layout from "./layout";

// 미디어쿼리
import mq from "../MediaQuery";

// 슬라이스
import { addImg, addItem, getList, deleteItem } from "../Slice/stickerSlice";
import { getDaily, putSticker } from "../Slice/dailySlice";

// 커스텀 훅
import { useAppDispatch, useAppSelector } from "../Hook";

// 이미지
import left from "../assets/img/left.png";
import right from "../assets/img/right.png";
import up from "../assets/img/up.png";
import down from "../assets/img/down.png";
import defaultSticekr from "../assets/img/default.png";

const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    position: relative;
    padding: 10px 20px 30px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;

    .sticker {
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        display: none;
        border-radius: 2%;

        &.open {
            display: flex;
        }

        .stickerContainer {
            width: 400px;
            height: 500px;
            background-color: #fff;
            padding: 20px;
            box-sizing: border-box;
            position: relative;
            border: 1px solid #000;

            p {
                color: #3c5230;
                font-size: 25px;
                text-align: center;
                font-weight: 500;
            }

            .stickerDate {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                height: auto;
                margin-top: 30px;
                p {
                    font-size: 14px;
                    color: #000;
                }

                select {
                    outline: none;
                    border: none;
                }
            }

            .stickerBox {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                height: 300px;
                margin: 30px 0;
                overflow-y: auto;

                &::-webkit-scrollbar {
                    width: 5px;
                }

                &::-webkit-scrollbar-thumb {
                    background-color: #3c5230;
                }

                &::-webkit-scrollbar-track {
                    background-color: #000;
                }

                .stickerImg {
                    width: 50px;
                    height: 50px;
                    margin: 0 10px 20px 0;
                    position: relative;

                    &:nth-of-type(6n) {
                        margin-right: 0;
                    }

                    button {
                        display: block;
                        width: 100%;
                        height: 100%;
                        border: none;
                        background-color: transparent;
                        outline: none;

                        &:hover {
                            cursor: pointer;
                        }

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .stickDel {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: rgba(255, 255, 255, 0.5);
                        display: none;

                        &.delOpen {
                            display: flex;
                        }

                        button {
                            font-size: 14px;
                            width: 30px;
                            height: 20px;
                            background-color: #3c5230;
                            color: #fde368;
                            font-weight: 300;
                        }
                    }
                }
            }

            .stickerButton {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                height: auto;

                input {
                    display: none;
                }
            }

            label,
            button {
                font-size: 20px;
                color: #3c5230;
                font-weight: 500;
                padding: 0;
                border: none;
                outline: none;
                background-color: transparent;

                &:hover {
                    cursor: pointer;
                }

                &.cancelBtn {
                    position: absolute;
                    right: 3px;
                    top: 0;
                    font-size: 15px;
                    font-weight: 300;
                }
            }
        }
    }

    .month {
        width: 23%;
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        position: relative;

        p {
            color: #3c5230;
            font-size: 20px;

            &:first-child {
                font-size: 130px;
                font-weight: 500;
                margin: 0 5px 0 0;
            }
        }

        button {
            font-size: 50px;
            font-weight: 500;
            color: #3c5230;
            background-color: transparent;
            border: none;
            outline: none;
            padding: 0;
            position: absolute;
            bottom: 0;
            left: 10%;
            height: 30px;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .calendar {
        width: 77%;
        height: auto;
        margin-top: 40px;
        .week {
            display: flex;
            width: 100%;
            height: auto;
            margin-bottom: 10px;
            p {
                width: calc(100% / 7);
                font-weight: 500;
                color: #3c5230;
                font-size: 16px;
                padding-left: 15px;
                box-sizing: border-box;
            }
        }

        .day {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            height: auto;

            .dayBox {
                width: calc(100% / 7);
                border: 1px solid #95b583;
                box-sizing: border-box;
                position: relative;

                &::after {
                    display: block;
                    content: "";
                    padding-bottom: 57%;
                }

				&:nth-of-type(7n+1), &:nth-of-type(1) {
					div {
						p {
							color: #f00;
						}
					}
				}

				&:nth-of-type(7n) {
					div {
						p {
							color: #00f;
						}
					}
				}

                div {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    padding: 10px;
                    box-sizing: border-box;

                    p {
                        font-weight: 500;
                        color: #3c5230;
                    }

                    a {
                        display: flex;
                        justify-content: flex-end;
                        align-items: flex-end;
                        width: 100%;
                        height: 80%;

                        img {
                            display: block;
                            width: 50px;
                            height: 50px;
                        }
                    }
                }
            }
        }
    }

    .left,
    .right {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 50%;
        border: none;
        outline: none;

        &:hover {
            cursor: pointer;
        }
    }

    .left {
        background: url(${left}) center/cover;
        left: -50px;
    }

    .right {
        background: url(${right}) center/cover;
        right: -50px;
    }

    ${mq.maxWidth("max")`	
		.month {
			p {
				font-size: 16px;

				&:first-child {
					font-size: 80px;
				}
			}

			button {
				font-size: 30px;
			}
		}

		.calendar {
		.week {
			p {
				font-size: 12px;
			}
		}

		.day {
			.dayBox {

				&::after {
					padding-bottom: 80%;
				}

				div {
					p {
						font-size: 14px;
					}
				}
			}
		}
			
		
	`}

    ${mq.maxWidth("lg")`
		flex-direction: column;

		.month {
			width: 100%;
			margin-bottom: 50px;

			button {
				left: auto;
				right: 0;
			}
		}

		.calendar {
			width: 100%;

			.day {
			.dayBox {

				&::after {
					padding-bottom: 90%;
				}

				div {
					a {
						img {
							width: 45px;
							height: 45px;
						}
					}
				}
			}
		}
	}

		.left, .right {
			width: 30px;
			height: 30px;
		}

		.left {
			left: -30px;
		}

		.right {
			right: -30px;
		}
			
		
	`}

	${mq.maxWidth("sm")`

		.calendar {
		.week {
			p {
				font-size: 10px;
				padding-left: 0;
				text-align: center;
			}
		}

		.day {
			.dayBox {

				&::after {
					padding-bottom: 100%;
				}

				div {
					padding: 5px;
					p {
						font-size: 10px;
					}

					a {
						img {
							width: 30px;
							height: 30px;
						}
					}
				}
			}
		}
	}

		.left, .right {
			left: 50%;
			right: 50%;
		}

		.left {
			top: -35px;
			background: url(${up}) center/cover;
		}

		.right {
			top: auto;
			bottom: -35px;
			background: url(${down}) center/cover;
		}
			
	
	`}
`;

const main = memo(() => {
    const [day, setDay] = useState({ year: dayjs().format("YYYY"), month: dayjs().format("M"), monthName: "", result: [0] });
    const [stick, setStick] = useState<boolean>(false);
    const [stickDel, setStickDel] = useState<boolean>(false);
    const stickerDate = useRef<HTMLSelectElement>(null);

    const dispatch = useAppDispatch();
    const { data: fileData } = useAppSelector((state) => state.stickerSlice);
    const { data: user } = useAppSelector((state) => state.userSlice);
    const { data: daily } = useAppSelector((state) => state.dailySlice);

    // 첫 렌더링 때 달력 그리기
    useEffect(() => {
        const value = calendar(parseInt(day.year), parseInt(day.month));
        const name = monthName(parseInt(day.month));

        setDay({ ...day, monthName: name, result: [...value] });
    }, []);

    // 스티커 목록 가져오기
    useEffect(() => {
        if (user && user !== true && !Array.isArray(user)) {
            dispatch(getList({ user_id: user.id }));
        }
    }, [user && user !== true && !Array.isArray(user) && user.id, fileData && fileData.length]);

    // 글 목록 가져오기
    useEffect(() => {
        if (user && user !== true && !Array.isArray(user)) {
            dispatch(getDaily({ user_id: user.id, month: day.month }));
        }
    }, [user && user !== true && !Array.isArray(user) && user.id, day.month, stick, Array.isArray(daily) && daily.length]);

    // 달력 그리기
    const calendar = useCallback((year: number, month: number) => {
        const startDay = new Date(year, month - 1, 1).getDay();
        const endDate = new Date(year, month, 0).getDate();
        const result: number[] = [];

        let nowDay = 1;

        for (let i = 0; i < 42; i++) {
            if (i < startDay || nowDay > endDate) {
                result.push(0);
            } else {
                result.push(nowDay);
                nowDay++;
            }
        }

        return result;
    }, []);

    // 월 이름 구하기
    const monthName = useCallback(
        (month: number) => {
            switch (month) {
                case 1:
                    return "January";
                case 2:
                    return "February";
                case 3:
                    return "March";
                case 4:
                    return "April";
                case 5:
                    return "May";
                case 6:
                    return "June";
                case 7:
                    return "July";
                case 8:
                    return "August";
                case 9:
                    return "September";
                case 10:
                    return "October";
                case 11:
                    return "November";
                case 12:
                    return "December";
                default:
                    return "";
            }
        },
        [day.month],
    );

    // 월 바꾸기
    const changeMonth = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!(e.target instanceof HTMLButtonElement)) {
                return;
            }
            const value = e.target.dataset.arrow;
            let date = dayjs(`${day.year}-${day.month}`);

            if (value == "pre") {
                date = date.add(-1, "month");
                const dateArray = calendar(parseInt(date.format("YYYY")), parseInt(date.format("M")));
                const name = monthName(parseInt(date.format("M")));
                setDay({ year: date.format("YYYY"), month: date.format("M"), monthName: name, result: [...dateArray] });
            } else if (value == "next") {
                date = date.add(1, "month");
                const dateArray = calendar(parseInt(date.format("YYYY")), parseInt(date.format("M")));
                const name = monthName(parseInt(date.format("M")));
                setDay({ year: date.format("YYYY"), month: date.format("M"), monthName: name, result: [...dateArray] });
            }
        },
        [day.month, day.year],
    );

    // 스티커 팝업창
    const stickerPop = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            setStick(!stick);
            setStickDel(false);
        },
        [stick],
    );

    // 스티커 삭제창
    const stickerDel = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            setStickDel(!stickDel);
        },
        [stickDel],
    );

    // 스티커 추가
    const stickerAdd = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.currentTarget.files;
            const formData = new FormData();

            if (file) {
                formData.append("happy", file[0]);
                dispatch(addImg(formData)).then((result) => {
                    if (user && user !== true && !Array.isArray(user) && result.payload && !(result.payload instanceof Error)) {
                        dispatch(addItem({ user_id: user.id, sticker_path: result.payload.url }));
                    }
                });
            }
        },
        [user && user !== true && !Array.isArray(user) && user.id],
    );

    // 스티커 삭제
    const sticekrDelete = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!(e.target instanceof HTMLButtonElement)) {
            return;
        }

        const id = e.target.dataset.id;
        if (typeof id === "string") {
            dispatch(deleteItem({ id: id }));
        }
    }, []);

    // 스티커 붙이기
    const stickerStick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!(e.currentTarget instanceof HTMLButtonElement)) {
            return;
        }

        if (stickerDate.current && e.currentTarget.dataset.id) {
            const stickerId = e.currentTarget.dataset.id;
            const dailyId = stickerDate.current.value;

			if(window.confirm("스티커를 붙일까요?")) {
				dispatch(putSticker({id: dailyId, sticker_id: stickerId}));
				setStick(false);
			}
        }
    }, [daily, fileData]);

    return (
        <Layout>
            <Container>
                <div className={classNames("sticker", { open: stick })}>
                    <div className="stickerContainer">
                        <p>스티커 관리</p>
                        <button type="button" className="cancelBtn" onClick={stickerPop}>
                            닫기
                        </button>
                        <div className="stickerDate">
                            <p>어느 날짜에 붙일까요?</p>
                            <select ref={stickerDate}>
                                {Array.isArray(daily) &&
                                    daily.map((v, i) => {
                                        return (
                                            <option key={i} value={v.id}>
                                                {dayjs(v.date).format("YYYY-MM-DD")}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="stickerBox">
                            {Array.isArray(fileData) &&
                                fileData.map((v, i) => {
                                    if (typeof v.sticker_path === "string") {
                                        return (
                                            <div className="stickerImg" key={i}>
                                                <button type="button" data-id={v.id} onClick={stickerStick}>
                                                    <img src={v.sticker_path} />
                                                </button>
                                                <div className={classNames("stickDel", { delOpen: stickDel })}>
                                                    <button type="button" data-id={v.id} onClick={sticekrDelete}>
                                                        삭제
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                        </div>
                        <div className="stickerButton">
                            <input type="file" id="sticker" name="happy" onChange={stickerAdd} />
                            <label htmlFor="sticker">추가하기</label>
                            <button type="button" onClick={stickerDel}>
                                {stickDel ? "그만두기" : "삭제하기"}
                            </button>
                        </div>
                    </div>
                </div>
                <button type="button" className="left" data-arrow="pre" onClick={changeMonth}></button>
                <div className="month">
                    <p>{day.month}</p>
                    <p>{day.monthName}</p>
                    <button type="button" onClick={stickerPop}>
                        …
                    </button>
                </div>
                <div className="calendar">
                    <div className="week">
                        <p>Sunday</p>
                        <p>Monday</p>
                        <p>Tuseday</p>
                        <p>Wednesday</p>
                        <p>Thursday</p>
                        <p>Friday</p>
                        <p>Saturday</p>
                    </div>
                    <div className="day">
                        {day.result.map((v, i) => {
                            let dailyArray: JSX.Element[] = [];
                            const today = dayjs(`${day.year}-${day.month}-${v}`).format("YYYY-MM-DD");

                            if (v === 0) {
                                dailyArray[i] = (
                                    <div className="dayBox" key={i}>
                                        <div>
                                            <p></p>
                                        </div>
                                    </div>
                                );
                            } else {
                                dailyArray[i] = (
                                    <div className="dayBox" key={i}>
                                        <div>
                                            <p>{v}</p>
                                            <NavLink to={`/write/${today}`}></NavLink>
                                        </div>
                                    </div>
                                );
                            }

                            Array.isArray(daily) &&
                                daily.forEach((k, j) => {
                                    const dailyDay = dayjs(k.date).format("YYYY-MM-DD");

                                    if (today === dailyDay && typeof k.sticker_path === "string") {
                                        dailyArray[i] = (
                                            <div className="dayBox" key={i}>
                                                <div>
                                                    <p>{v == 0 ? "" : v}</p>
                                                    <NavLink to={`/view/${k.id}`}>
                                                        <img src={k.sticker_path} />
                                                    </NavLink>
                                                </div>
                                            </div>
                                        );
                                    } else if (today === dailyDay && k.sticker_path === null) {
                                        dailyArray[i] = (
                                            <div className="dayBox" key={i}>
                                                <div>
                                                    <p>{v == 0 ? "" : v}</p>
                                                    <NavLink to={`/view/${k.id}`}>
                                                        <img src={defaultSticekr} />
                                                    </NavLink>
                                                </div>
                                            </div>
                                        );
                                    }
                                });
                            return dailyArray[i];
                        })}
                    </div>
                </div>
                <button type="button" className="right" data-arrow="next" onClick={changeMonth}></button>
            </Container>
        </Layout>
    );
});

export default main;
