module.exports = {
    task: {
        name: 'checkNetwork',
        cronTime: '2 * * * * *'
    },
    async execute() {
        onsole.log('Checking network...')
        await client.LXDUtils.info(callback => console.log(callback));
    }
}