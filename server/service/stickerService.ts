import mybatisMapper from "mybatis-mapper";
import DBPool from "../helper/DBPool";
import { RuntimeException } from "../helper/ExceptionHelper";

interface data {
	id: number;
	sticker_path: string;
}

interface params {
	[key: string]: string;
}

class stickerService {
	constructor() {
		mybatisMapper.createMapper([
			"./server/mapper/stickerMapper.xml"
		]);
	}

	async getAll() {
		let dbcon;
		let data: params[];

		try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement(
                "stickerMapper",
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

	async getList(params: params) {
		let dbcon;
		let data: data[];

		try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement(
                "stickerMapper",
                "selectList",
				{user_id: params.user_id}
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

	async addItem(params: params) {
        let dbcon;
        let data: data[];

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement(
                "stickerMapper",
                "insertItem",
                {user_id: params.user_id, sticker_path: params.sticker_path}
            );
            let [{ insertId, affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("stickerMapper", "selectList", {
                user_id: params.user_id,
            });
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException(
                    "저장된 데이터를 조회할 수 없습니다."
                );
            }

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

	async deleteItem(id: string) {
        let dbcon;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement("stickerMapper", "deleteItem", {id: id});
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

export default new stickerService();