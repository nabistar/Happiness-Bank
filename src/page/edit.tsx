import React, { memo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";

// 레이아웃
import Layout from "./layout";
import WriteLayout from "./writeLayout";

// 이미지
import text from "../assets/img/text.png";

const edit = memo(() => {
    return (
        <Layout>
            <WriteLayout>
                <p>2023.04.14</p>
                <div className="diary">
                    <form>
                        <div className="img">
                            <input type="file" id="file" />
                            <label htmlFor="file">
                                <img src={text} />
                            </label>
                        </div>
                        <div className="text">
                            <textarea maxLength={5000} placeholder="내용을 작성해주세요. 최대 5000자까지 가능합니다."></textarea>
                            <div className="bank">
                                <button type="submit">수정하기</button>
                            </div>
                        </div>
                    </form>
                </div>
            </WriteLayout>
        </Layout>
    );
});

export default edit;
