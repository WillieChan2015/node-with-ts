import mongoose from 'mongoose';

const DB_URL: string = 'mongodb://localhost:27017/';

// mongoose.connect(DB_URL, (err) => {
//     if (err) {
//         console.log('连接失败');
//     } else {
//         console.log('连接成功');
//     }
// });

export default class Mongo {
    private mongo: any = null;

    constructor() {
    }

    /**
     * 连接 MongoDB 并返回该实例
     * @param databaseName 数据库名称
     */
    connect(databaseName: String = 'test'): typeof mongoose {
        console.log('MongoDB 连接中...');
        console.log(`连接数据库 ${databaseName} ...`);
        mongoose.connect(DB_URL + databaseName, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log('MongoDB 连接失败');
            } else {
                console.log('MongoDB 连接成功');
            }
        });

        this.mongo = mongoose;
        mongoose.connection.on('disconnected', function () {    
            console.log('Mongoose connection disconnected');  
        });

        return mongoose;
    }
}