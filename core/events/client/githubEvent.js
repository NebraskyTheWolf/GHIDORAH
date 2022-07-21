module.exports = async (client, data) => {
    console.log(data.type);
    console.log(data);

    await client.Database.createCommit(data);
};