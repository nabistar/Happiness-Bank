import express, { Request, Response, NextFunction } from "express";
import stickerService from "../service/stickerService";
import fileHelper from "../helper/FileHelper";
import regexHelper from "../helper/RegexHelper";

interface custom extends Response {
    sendResult?: Function;
    sendError?: Function;
}

interface customReq extends Request {
	file?: Object;
}

interface data {
    id: number;
    sticker_path: string;
}

const url: string = "/sticker";
const router = express.Router();

router.get(url, async (req, res: custom, next) => {
    const { user_id } = req.query;
    let json: data[] = [];

    try {
        if (typeof user_id === "string") {
            json = await stickerService.getList({ user_id: user_id });
        }
    } catch (err) {
        return next(err);
    }

    if (res.sendResult) {
        res.sendResult({ data: json });
    }
});

router.post(url, async (req, res: custom, next) => {
    const { user_id, sticker_path } = req.body;
    let json: data[] = [];

    try {
        regexHelper.value(user_id, "유저가 없습니다.");
        regexHelper.value(sticker_path, "등록할 파일이 없습니다.");
    } catch (err) {
        return next(err);
    }

    try {
        const params = {
            user_id: user_id,
            sticker_path: sticker_path,
        };

        json = await stickerService.addItem(params);
    } catch (err) {
        return next(err);
    }

    if (res.sendResult) {
        res.sendResult({ data: json });
    }
});

router.post(`${url}img`, (req: customReq, res: custom, next) => {
    const upload = fileHelper.initMulter().single("sticker");

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
        await stickerService.deleteItem(id);
    } catch (err) {
        return next(err);
    }

    if (res.sendResult) {
        res.sendResult();
    }
});

export default router;
