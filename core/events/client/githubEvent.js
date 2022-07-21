module.exports = async (client, data) => {
    await client.Database.createCommit(data);

    switch (data.data.action) {
        case 'completed': {

        }
        break;
        case 'created': {

        }
        break;
        case 'push': {

        }
        break;
        default:
            client.logger.log('WARN', `Invalid action type ${data.data.action}`);
        break;
    }

    console.log(data.type);
    console.log(data);

    
    // uwu
};