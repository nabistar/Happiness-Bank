import React, { memo, useCallback, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import dayjs from "dayjs";

// 레이아웃
import Layout from "./layout";
import WriteLayout from "./writeLayout";

// 슬라이스
import { getItem, addImg, putItem } from "../Slice/dailySlice";

// 커스텀 훅
import { useAppDispatch, useAppSelector } from "../Hook";

// 이미지
import img from "../assets/img/img.png";

const edit = memo(() => {
    const { data: daily } = useAppSelector((state) => state.dailySlice);
    const { data: user } = useAppSelector((state) => state.userSlice);
    const { file } = useAppSelector((state) => state.dailySlice);
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    // 이미지 추가
    const dailyImgAdd = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files;
        const formData = new FormData();

        if (file) {
            formData.append("daily", file[0]);
            dispatch(addImg(formData));
        }
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getItem({ id: id }));
        }
    }, [user && user !== true && !Array.isArray(user) && user.id]);

    // 수정하기
    const editDaily = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const current = e.currentTarget;

            const content = current.content.value;
            if (content.length == 0 || content.trim().length == 0 || content == "" || content == null || content == undefined) {
                window.alert("내용이 없습니다.");
            }

            if (id && daily && !Array.isArray(daily)) {
                file
                    ? dispatch(putItem({ id: id, file_path: file.url, content: content })).then((result) => {
                          navigate("/main");
                      })
                    : dispatch(putItem({ id: id, file_path: daily.file_path, content: content })).then((result) => {
                          navigate("/main");
                      });
            }
        },
        [file, daily],
    );

    return (
        <Layout>
            {daily && !Array.isArray(daily) && (
                <WriteLayout>
                    <p>{dayjs(daily.date).format("YYYY.MM.DD")}</p>
                    <div className="diary">
                        <form onSubmit={editDaily}>
                            <div className="img">
                                <input type="file" id="file" name="daily" onChange={dailyImgAdd} />
                                <label htmlFor="file">{file && typeof file.url === "string" ? (
									<img src={file.url} />
								): (
									typeof daily.file_path === "string" ? <img src={daily.file_path} /> : <img src={img} />
								)}</label>
                            </div>
                            <div className="text">
                                <textarea maxLength={5000} placeholder="내용을 작성해주세요. 최대 5000자까지 가능합니다."  name="content" defaultValue={daily.content}></textarea>
                                <div className="bank">
                                    <button type="submit">수정하기</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </WriteLayout>
            )}
        </Layout>
    );
});

export default edit;
