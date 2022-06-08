module.exports.calculate = async function (data = {}, value = 0, result = {}) {
    let booster = proccess.env.XP_BOOST;

    const userProfile = client.Database.fetchUser(data.userId);
    let messagesCount = client.Database.countMessages(
        data.server_id,
        data.userId,
    );
    let moneyCount = userProfile.stats.money;
    let claimsCount = userProfile.stats.kills;
    let eventsCount = userProfile.stats.wins;

    if (messagesCount < 250)
        value += 0.5;
    else if (messagesCount > 250)
        value += 0.8;
    else if (messagesCount > 500)
        value += 1;
    else if (messagesCount > 1000) 
        value += 1.2;
    
    if (moneyCount < 25000)
        value += 0.8;
    else if (moneyCount > 25000)
        value += 2.8;
     else if (moneyCount > 50000)
        value += 3.8;
     else if (moneyCount > 100000)
        value += 4.8;
     else if (moneyCount >= 250000)
        value += 5.8 * Math.abs(moneyCount) / 15 - 0.8;

    if (claimsCount >= 1)
        value += claimsCount;

    if (eventsCount >= 1)
        value += eventsCount * 350;
    
    result(value %= booster * 0.002);
}