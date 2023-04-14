import React, { memo, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";
import dayjs from "dayjs";

// 레이아웃
import Layout from "./layout";

// 미디어쿼리
import mq from "../MediaQuery";

// 이미지
import left from "../assets/img/left.png";
import right from "../assets/img/right.png";
import up from "../assets/img/up.png";
import down from "../assets/img/down.png";

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
            background-color: #3c5230;
            padding: 20px;
            box-sizing: border-box;
			position: relative;
			border: 1px solid #000;

            p {
                color: #fde368;
                font-size: 25px;
                text-align: center;
                font-weight: 500;
            }

            .stickerBox {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                height: 350px;
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

                img {
                    width: 50px;
                    height: 50px;
                    margin: 0 10px 20px 0;
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
                color: #fde368;
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

        p {
            color: #3c5230;
            font-size: 20px;
        }

        button {
            font-size: 130px;
            font-weight: 500;
            margin: 0 5px 0 0;
            color: #3c5230;
            background-color: transparent;
            border: none;
            outline: none;
            padding: 0;

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
			}

			button {
				font-size: 80px;
			}

			.sticker {
				.stickerBox {
					height: 300px;
				}
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

			.sticker {
				width: 100%;
				.stickerBox {
					height: 150px;
				}

			}
		}

		.calendar {
			width: 100%;

			.day {
			.dayBox {

				&::after {
					padding-bottom: 63%;
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

		.month {
			.sticker {
				.stickerBox {
					height: 200px;
				}
			}
		}

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

    // 첫 렌더링 때 달력 그리기
    useEffect(() => {
        const value = calendar(parseInt(day.year), parseInt(day.month));
        const name = monthName(parseInt(day.month));

        setDay({ ...day, monthName: name, result: [...value] });
    }, []);

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
        },
        [stick],
    );

    return (
        <Layout>
            <Container>
                <div className={classNames("sticker", { open: stick })}>
                    <div className="stickerContainer">
                        <p>스티커 관리</p>
                        <button type="button" className="cancelBtn" onClick={stickerPop}>
                            닫기
                        </button>
                        <div className="stickerBox">
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                            <img src={left} />
                        </div>
                        <div className="stickerButton">
                            <input type="file" id="sticker" />
                            <label htmlFor="sticker">추가하기</label>
                            <button type="button">삭제하기</button>
                            <button type="button">붙이기</button>
                        </div>
                    </div>
                </div>
                <button type="button" className="left" data-arrow="pre" onClick={changeMonth}></button>
                <div className="month">
                    <button type="button" onClick={stickerPop}>
                        {day.month}
                    </button>
                    <p>{day.monthName}</p>
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
                            return (
                                <div className="dayBox" key={i}>
                                    <div>
                                        <p>{v == 0 ? "" : v}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button type="button" className="right" data-arrow="next" onClick={changeMonth}></button>
            </Container>
        </Layout>
    );
});

export default main;
