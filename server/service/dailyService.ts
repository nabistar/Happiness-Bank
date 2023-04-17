import mybatisMapper from "mybatis-mapper";
import DBPool from "../helper/DBPool";
import { RuntimeException } from "../helper/ExceptionHelper";

interface get {
	user_id: string;
	month: string;
}

interface data {
	id: number;
	date: string;
	file_path: string;
	content: string;
	sticker_path: string;
}

interface params {
	[key: string]: string | null;
}

class dailyService {
	constructor() {
		mybatisMapper.createMapper([
			"./server/mapper/dailyMapper.xml"
		]);
	}

	async getAll() {
		let dbcon;
		let data: params[];

		try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement(
                "dailyMapper",
                "selectPath");
            let [result] = await dbcon.query(sql);

            data = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }

        return data;
	}

	async getList(params: get) {
		let dbcon;
		let data: data[];

		try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement(
                "dailyMapper",
                "selectList",
				{user_id: params.user_id, month: params.month}
            );
            let [result] = await dbcon.query(sql);

            data = result;
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }

        return data;
	}

	async getItem(id: string) {
        let dbcon;
        let data: data;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement(
                "dailyMapper",
                "selectItem",
                {id: id}
            );
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException("데이터를 조회할 수 없습니다.");
            }

            data = result[0];

        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }

        return data;
    }

	async addItem(params: params) {
        let dbcon;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement(
                "dailyMapper",
                "insertItem",
                {date: params.date, file_path: params.file_path, content: params.content, user_id: params.user_id, sticker_id: params.sticker_id}
            );
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }
    }

	async editItem(params: params) {
        let dbcon;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement(
                "dailyMapper",
                "updateItem",
                {file_path: params.file_path, content: params.content}
            );
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }
    }

	async editSticker(params: params) {
        let dbcon;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement(
                "dailyMapper",
                "updateSticker",
                {sticker_id: params.sticker_id}
            );
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }
    }

	async deleteItem(id: string) {
        let dbcon;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement("dailyMapper", "deleteItem", {id: id});
            let [{ affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("삭제된 데이터가 없습니다.");
            }
        } catch (err) {
            throw err;
        } finally {
            if (dbcon) {
                dbcon.release();
            }
        }
    }

}

export default new dailyService();