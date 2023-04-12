import mybatisMapper from "mybatis-mapper";
import DBPool from "../helper/DBPool";
import { RuntimeException } from "../helper/ExceptionHelper";

interface params {
	userid: string;
	password: string;
	name: string;
}

interface login {
	userid: string;
	password: string;
}

interface data {
	id: number;
	name: string;
}

class userService {
	constructor() {
		mybatisMapper.createMapper([
			"./server/mapper/userMapper.xml",
			"./server/mapper/dailyMapper.xml",
			"./server/mapper/stickerMapper.xml"
		]);
	}

	async getItem(params: login) {
        let dbcon;
        let data: data;

        try {
            dbcon = await DBPool.getConnection();

            let sql = mybatisMapper.getStatement(
                "userMapper",
                "selectItem",
                {userid: params.userid, password: params.password}
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
        let data: data;

        try {
            dbcon = await DBPool.getConnection();
            let sql = mybatisMapper.getStatement(
                "userMapper",
                "insertItem",
                {userid: params.userid, password: params.password, name: params.name}
            );
            let [{ insertId, affectedRows }] = await dbcon.query(sql);

            if (affectedRows === 0) {
                throw new RuntimeException("저장된 데이터가 없습니다.");
            }

            sql = mybatisMapper.getStatement("userMapper", "selectItem", {
                id: insertId,
            });
            let [result] = await dbcon.query(sql);

            if (result.length === 0) {
                throw new RuntimeException(
                    "저장된 데이터를 조회할 수 없습니다."
                );
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

	async deleteItem(id: string) {
        let dbcon;

        try {
            dbcon = await DBPool.getConnection();

			let sql = mybatisMapper.getStatement("dailyMapper", "deleteUser", {user_id: id});
			sql = mybatisMapper.getStatement("stickerMapper", "deleteUser", {user_id: id});
            sql = mybatisMapper.getStatement("userMapper", "deleteItem", {id: id});
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

export default new userService();