import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import schedule from "node-schedule";
import dailyService from "../service/dailyService";
import stickerService from "../service/stickerService";
import fileHelper from "../helper/FileHelper";
import regexHelper from "../helper/RegexHelper";

interface custom extends Response {
    sendResult?: Function;
    sendError?: Function;
}

interface imgPath {
    [key: string]: string | null;
}

interface data {
    id: number;
    date: string;
    file_path: string;
    content: string;
    sticker_path: string;
}

const url: string = "/daily";
const router = express.Router();

schedule.scheduleJob("0 0 * * *", async () => {
    try {
        const daily = await dailyService.getAll();
        const sticker = await stickerService.getAll();
        const dailyImg = daily.map((v: imgPath, i: number) => {
			if (v.file_path !== null) {
				return v.file_path;
			}
		});
        const stickerImg = sticker.map((v: imgPath, i: number) => v.sticker_path);
        const img = [...dailyImg, ...stickerImg];
        fs.readdir("./_files/img", (err, files) => {
            const deleteImg = files.filter((x: string) => !img.includes(`/img/${x}`));
            if (deleteImg.length > 0) {
                deleteImg.forEach((v: string, i: number) => {
                    fs.unlink(`./_files/img/${v}`, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                });
            }
        });
    } catch (err) {
        return err;
    }
});

router.get(url, async (req, res: custom, next) => {
    const { user_id, month } = req.query;

    let json: data[] = [];

    try {
        if (typeof user_id === "string" && typeof month === "string") {
            json = await dailyService.getList({ user_id: user_id, month: month });
        }
    } catch (err) {
        return next(err);
    }

    if (res.sendResult) {
        res.sendResult({ data: json });
    }
});

router.get(`${url}/:id`, async (req, res: custom, next) => {
    const { id } = req.params;
    let json: data;

    try {
        json = await dailyService.getItem(id);
    } catch (err) {
        return next(err);
    }

    if (res.sendResult) {
        res.sendResult({ data: json });
    }
});

router.post(url, async (req, res: custom, next) => {
    const { date, file_path, content, user_id } = req.body;

    try {
        regexHelper.value(date, "날짜가 없습니다.");
        regexHelper.value(content, "내용이 없습니다.");
        regexHelper.value(user_id, "유저가 없습니다.");
    } catch (err) {
        return next(err);
    }

    try {
        if (file_path) {
            const params = {
                date: date,
                file_path: file_path,
                content: content,
                user_id: user_id,
            };
            await dailyService.addItem(params);
        } else {
            const params = {
                date: date,
                file_path: null,
                content: content,
                user_id: user_id,
            };
            await dailyService.addItem(params);
        }
    } catch (err) {
        return next(err);
    }

    if (res.sendResult) {
        res.sendResult();
    }
});

router.post(`${url}img`, (req, res: custom, next) => {
    const upload = fileHelper.initMulter().single("daily");

    upload(req, res, async (err: Error) => {
        try {
            fileHelper.checkUploadError(err);
        } catch (err) {
            return next(err);
        }

        if (res.sendResult) {
            res.sendResult({ data: req.file });
        }
    });
});

router.delete(`${url}/:id`, async (req, res: custom, next) => {
    const { id } = req.params;

    try {
        let json = await dailyService.getItem(id);
        fs.unlink(`./_files${json.file_path}`, (err) => {
            if (err) {
                return next(err);
            }
        });
        await dailyService.deleteItem(id);
    } catch (err) {
        return next(err);
    }

    if (res.sendResult) {
        res.sendResult();
    }
});

export default router;
