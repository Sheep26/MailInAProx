import { db, initDB } from './connection.js';

export class DatabaseManager {
    constructor() {
        initDB();
    }
}