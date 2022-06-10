module.exports.calculate = async function (client, data = {}, value) {
    let booster = process.env.XP_BOOST;

    let messagesCount = client.Database.countMessages(
        data.server_id,
        data.userId,
    );
    let moneyCount = 0;
    let claimsCount = 0;
    let eventsCount = 0;

    if (messagesCount < 250)
        value + 0.5;
    else if (messagesCount > 250)
        value + 0.8;
    else if (messagesCount > 500)
        value + 1;
    else if (messagesCount > 1000) 
        value + 1.2;
    
    if (moneyCount < 25000)
        value + 0.8;
    else if (moneyCount > 25000)
        value + 2.8;
     else if (moneyCount > 50000)
        value + 3.8;
     else if (moneyCount > 100000)
        value + 4.8;
     else if (moneyCount >= 250000)
        value + 5.8 * Math.abs(moneyCount) / 15 - 0.8;

    if (claimsCount >= 1)
        value + claimsCount;

    if (eventsCount >= 1)
        value + eventsCount * 350;
        
    return value * booster;
}