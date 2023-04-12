import express, { Request, Response, NextFunction } from "express";
import expressSession from "express-session";
import userService from "../service/userService";
import regexHelper from "../helper/RegexHelper";

interface custom extends Response {
    sendResult?: Function;
    sendError?: Function;
}

interface data {
	id: number;
	name: string;
}

declare module "express-session" {
	interface SessionData {
		login?: data;
	}
}

const url: string = "/user";
const router = express.Router();

router.get(`${url}/logincheck`, async (req, res: custom, next) => {

    try {
        if(req.session.login) {
			if (res.sendResult) {
				res.sendResult({ data: true});
			}
		} else {
			if (res.sendResult) {
				res.sendResult({ data: false});
			}
		}
    } catch (err) {
        return next(err);
    }

});

router.get(`${url}/loginout`, async (req, res: custom, next) => {

    try {
        if(req.session.login) {
			req.session.destroy((err) => {
				if(err) {
					return next(err);
				}
			});
		}
    } catch (err) {
        return next(err);
    }

});

router.post(`${url}/login`, async (req, res: custom, next) => {

	const {userid, password} = req.body;

    let json: data;

    try {
        json = await userService.getItem({
			userid: userid,
			password: password
		});
		req.session.login = json;
    } catch (err) {
        return next(err);
    }

    if (res.sendResult) {
        res.sendResult({ data: json });
    }
});

router.post(url, async (req, res: custom, next) => {
    const { userid, password, name } = req.body;
    let json: data;

    try {
        regexHelper.value(userid, "아이디가 없습니다.");
        regexHelper.value(password, "비밀번호가 없습니다.");
		regexHelper.value(name, "이름이 없습니다.");
    } catch (err) {
        return next(err);
    }

    try {
        const params = {
            userid: userid,
            password: password,
			name: name
        };

        json = await userService.addItem(params);
    } catch (err) {
        return next(err);
    }

    if (res.sendResult) {
        res.sendResult({ data: json });
    }
});

router.delete(`${url}/:id`, async (req, res: custom, next) => {
    const { id } = req.params;

    try {
        await userService.deleteItem(id);
    } catch (err) {
        return next(err);
    }

    if (res.sendResult) {
        res.sendResult();
    }
});

export default router;
