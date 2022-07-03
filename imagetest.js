const convertor = require('./utils/ImageHandler');

const rankCard = `<div class="ui container page-content">
<h1 class="ui center aligned header">
    <img src="{{ usericon }}" class="ui rounded staff image" alt="Vakea">
    <div class="content">
        {{ username }}
    </div>
</h1>
<div class="ui divider"></div>
    <div class="ui stackable grid" style="position:relative;">
        <div class="ui eight wide column">
            <h2 class="ui header">
                 Profile
                <div class="sub header"></div>
            </h2>
            <br>
            <div class="ui four small statistics">
                <div class="statistic">
                    <div class="value">
                        {{ level }}
                    </div>
                    <div class="label">
                        Level
                    </div>
                </div>
                <div class="statistic">
                    <div class="value">
                        {{ xp }}
                    </div>
                    <div class="label">
                        Scores
                    </div>
                </div>
                <div class="statistic">
                    <div class="value">
                        {{ rankname }}
                    </div>
                    <div class="label">
                        Rank
                    </div>
                </div>
                <div class="statistic">
                    <div class="value">
                        #{{ position }}
                    </div>
                    <div class="label">
                        Position
                    </div>
                </div>
            </div>
            <br>
            <div class="ui indicating progress" id="levels" data-percent="89">
                <div class="bar" style="transition-duration: 300ms; width: 89%;">
                    <div class="progress">350/400</div>
                </div>
                <div class="label">Level</div>
            </div>
        </div>
        <div class="ui vertical divider"></div>
        <div class="ui eight wide column">
            <h2 class="ui header">
                Badges
                <div class="sub header">All the badges of {{ username }}</div>
            </h2>
            </br>
            <a class="ui yellow label">
              Lurky cat
              <div class="detail">Official lurker</div>
            </a>
            </br>
            <a class="ui orange label">
              Expert Stimky cat
              <div class="detail">Good smell :3</div>
            </a>
            </br>
            <a class="ui yellow label">
              Expert chimken murder
              <div class="detail">Official murder of chimkens</div>
            </a>
            </br>
            <a class="ui purple label">
               Expert arson cat
              <div class="detail">Official arson</div>
            </a>
        </div>
</div>
</div>`;

convertor.generate(rankCard, { 
    usericon: 'https://cdn.discordapp.com/emojis/783810413279707186.webp',
    username: 'DevisTheCat#0666',
    level: 5,
    xp: 350,
    requiredXp: 400,
    rankname: 'Stimky',
    position: 1,
}, result => {
    console.log('Test result -> \n');
    console.log(result);

    console.log(convertor.rangePercentage(250, 0, 500) + '%');
});