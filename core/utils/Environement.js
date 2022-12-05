module.exports.createOrGet = async function (key, value) {
    let check = process.env[key];
    if (check !== undefined)
        return check;
    else
        check = value;
    return check;
}

module.exports.getValue = function (key) {
    return process.env[key];
}

module.exports.clear = function (key) {
    process.env[key] = undefined;
}