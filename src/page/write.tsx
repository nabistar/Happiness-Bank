import React, { memo } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";

// 미디어쿼리
import mq from "../MediaQuery";

// 이미지
import text from "../assets/img/text.png";

const Container = styled.div`
    min-height: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 0;
    box-sizing: border-box;

    .box {
        width: 50%;
        height: auto;

		h1 {
			font-family: "maple", "sans-serif";
			color: #0c4a60;
			font-size: 40px;
			font-weight: 700;
			margin-bottom: 20px;
		}

        .upload,
        .contentInfo {
            height: 70px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #0c4a60;
            padding: 0 20px;
            margin-bottom: 20px;
            box-sizing: border-box;

            p {
                color: #fff;
                font-size: 25px;
                font-weight: 700;
            }
        }

        .upload {
            input {
                display: none;
            }

            label {
                display: block;
                width: 100px;
                color: #fff;
                font-weight: 700;

                &:hover {
                    cursor: pointer;
                    color: #ef6c33;
                }
            }
        }

        .imgView {
            width: 100%;
            height: auto;
            margin-bottom: 100px;

            img {
                display: block;
                margin: auto;
                max-width: 100%;
            }
        }

        .content {
            width: 100%;
            height: auto;

            textarea {
                width: 100%;
                height: 500px;
                resize: none;
                outline: none;
                box-sizing: border-box;
            }
        }

        .button {
            display: flex;
			justify-content: center;
            margin-top: 50px;

			a {
				display: block;
				width: 150px;
				height: 50px;
				margin-right: 10px;
			}

            button {
                width: 150px;
                height: 50px;
                background-color: #0c4a60;
                color: #fff;
                border: none;

				&:hover {
					cursor: pointer;
				}
            }
        }
    }

    ${mq.maxWidth("xl")`
		.box {
			width: 80%;
		}
	`}

    ${mq.maxWidth("md")`
		.box {
			.upload,
        	.contentInfo {
				p {
					font-size: 20px;
				}

				label {
					width: 80px;
					font-size: 14px;
				}
			}
		}
	`}

	${mq.maxWidth("sm")`
		.box {
			width: 90%;

			.upload,
        	.contentInfo {
				p {
					font-size: 18px;
				}

				label {
					width: 40px;
					font-size: 12px;
					word-break: keep-all;
					text-align: center;
					line-height: 1.3;
				}
			}
		}
	`}
`;

const write = memo(() => {
    return (
        <Container>
            <div className="box">
				<h1>2023년 4월 11일</h1>
                <form>
                    <div className="upload">
                        <p>행복했던 순간의 사진을 올려주세요!</p>
                        <input type="file" name="file" id="file" />
                        <label htmlFor="file">사진 올리기</label>
                    </div>
                    <div className="imgView">
                        <img src={text} />
                    </div>
                    <div className="contentInfo">
                        <p>행복했던 순간을 남겨주세요!</p>
                    </div>
                    <div className="content">
                        <textarea name="content" maxLength={5000} placeholder="내용을 적어주세요. 최대 5000자까지 가능합니다."></textarea>
                    </div>
                    <div className="button">
						<NavLink to="/main"><button type="button">목록으로</button></NavLink>
                        <button type="submit">저금하기</button>
                    </div>
                </form>
            </div>
        </Container>
    );
});

export default write;
