import styled from "styled-components";

// 미디어쿼리
import mq from "../MediaQuery";

// 이미지
import grid from "../assets/img/grid.png";
import frame from "../assets/img/frame.png";

const WriteLayout = styled.div`
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

        form {
            display: flex;
            justify-content: space-evenly;
            height: auto;
            flex-wrap: wrap;

            .img {
                width: 514px;
                height: 603px;
                position: relative;
                background: url(${frame}) center/cover;
                margin-top: 15px;

                input {
                    display: none;
                }

                label {
                    display: block;
                    width: 475px;
                    height: 425px;
                    margin: 24px 0 0 20px;

                    &:hover {
                        cursor: pointer;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                    }
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

                    button {
                        display: block;
                        width: 100px;
                        height: 20px;
                        background-color: transparent;
                        border: none;
                        outline: none;
                        font-weight: 500;
                        font-size: 18px;
                        margin: 0 10px 0 auto;

                        &:hover {
                            cursor: pointer;
                            color: #3c5230;
                        }
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
			form {
				.img {
					margin-top: 0;
					margin-bottom: 50px;
				}

				.text {
					width: 80%;
					margin-top: 0;
				}
			}
		}
	`}

    ${mq.maxWidth("md")`
		width: 85%;
		
		.diary {
			form {
				.img {
					width: 400px;
					height: 500px;
					background-size: 100% 100%;

					label {
						width: 370px;
						height: 352px;
						margin: 20px 0 0 15px;
					}
				}

				.text {
					width: 100%;
				}
			}
		}
	`}

	${mq.maxWidth("sm")`
		width: 100%;
		
		.diary {
			form {
				.img {
					width: 380px;
					height: 500px;
					background-size: 100% 100%;

					label {
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
		}
	`}

	${mq.maxWidth("ph")`
		.diary {
			form {
				.img {
					width: 300px;
					height: 400px;
					label {
						width: 277px;
						height: 282px;
						margin: 16px 0 0 12px;
					}
				}

				.text {
					width: 100%;
				}
			}
		}
	`}
`;

export default WriteLayout;
