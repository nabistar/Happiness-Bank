import React, { memo, useCallback } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import dayjs from "dayjs";

// 레이아웃
import Layout from "./layout";
import WriteLayout from "./writeLayout";

// 슬라이스
import { addItem, addImg } from "../Slice/dailySlice";

// 커스텀 훅
import { useAppDispatch, useAppSelector } from "../Hook";

// 이미지
import img from "../assets/img/img.png";

const write = memo(() => {
    const { date } = useParams();
    const { data: user } = useAppSelector((state) => state.userSlice);
    const { file } = useAppSelector((state) => state.dailySlice);
    const dispatch = useAppDispatch();
	const navigate = useNavigate();

    // 이미지 추가
    const dailyImgAdd = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.currentTarget.files;
            const formData = new FormData();

            if (file) {
                formData.append("daily", file[0]);
                dispatch(addImg(formData));
            }
        },
        [],
    );

	// 글 추가
	const dailyAdd = useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const current = e.currentTarget;
		const content: string = current.content.value;
		if (content.length == 0 || content.trim().length == 0 || content == "" || content == null || content == undefined) {
			window.alert("내용이 없습니다.");
		}

		if (date && user && user !== true && !Array.isArray(user)) {
			file ? dispatch(addItem({date: date, file_path: file.url, content: content, user_id: user.id })).then((result) => {
				navigate("/main");
			}) : dispatch(addItem({date: date, content: content, user_id: user.id })).then((result) => {
				navigate("/main");
			});
		}
	}, [user && user !== true && !Array.isArray(user) && user.id, file]);

    return (
        <Layout>
            <WriteLayout>
                <p>{date && dayjs(date).format("YYYY.MM.DD")}</p>
                <div className="diary">
                    <form onSubmit={dailyAdd}>
                        <div className="img">
                            <input type="file" id="file" name="daily" onChange={dailyImgAdd} />
                            <label htmlFor="file">
                                <img src={file ? file.url : img} />
                            </label>
                        </div>
                        <div className="text">
                            <textarea maxLength={5000} name="content" placeholder="내용을 작성해주세요. 최대 5000자까지 가능합니다."></textarea>
                            <div className="bank">
                                <button type="submit">저금하기</button>
                            </div>
                        </div>
                    </form>
                </div>
            </WriteLayout>
        </Layout>
    );
});

export default write;
