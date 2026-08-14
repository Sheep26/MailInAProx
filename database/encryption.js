import bcrypt from "bcrypt";
import config from "../config.json" with { type: "json" };

export class BcryptManager {
    constructor() {
        this.cache = [];
    }

    getCache() {
        return this.cache;
    }
}

export class BcryptCache {
    constructor(string, hash) {
        this.string = passwd;
        this.hash = hash;
    }
}

export async function hash(string) {
    return await bcrypt.hash(string, config.salt_rounds);
}

export async function compareHashes(string, hash) {
    for (let cache_instance of this.cache)
        if (cache_instance.string == string && cache_instance.hash == hash)
            return true;

    let result = await bcrypt.compare(string, hash);

    if (result)
        this.cache.push(new BcryptCache(string, hash));

    return result;
}