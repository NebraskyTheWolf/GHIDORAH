const convertor = require('./utils/ImageHandler');

const rankCard = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://skf-studios.com/css/semantic.min.css">
    <link rel="stylesheet" href="https://skf-studios.com/css/search.min.css">
    <link rel="stylesheet" href="https://skf-studios.com/css/transition.min.css">
    <link rel="stylesheet" href="https://skf-studios.com/css/custom-responsive.css">
    <link rel="stylesheet" href="https://skf-studios.com/css/app.css">
</head>
<body class="front">
    <div class="pusher">
        <div class="container">
            <div class="ui container page-content">
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
                            <div class="ui indicating progress" id="levels" data-percent="50">
                                <div class="bar" style="transition-duration: 300ms; width: 50%;">
                                    <div class="progress">45000/65000</div>
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
							  Lurky fox
							  <div class="detail">Official Vakea lurker</div>
							</a>
                            </br>
                            <a class="ui orange label">
							  Expert Stimky fox
							  <div class="detail">Good smell healthy :3</div>
							</a>
                            </br>
                            <a class="ui yellow label">
							  Sus
							  <div class="detail">Official sussy foxxo of Vakea ;3</div>
							</a>
                            </br>
                            <a class="ui purple label">
							   Expert arson
							  <div class="detail">Official arson fox</div>
							</a>
                            </br>
                            <a class="ui pink label">
							  Vakea of husband
							  <div class="detail">Married don't touch UwU</div>
							</a>
                        </div>
                    </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="https://skf-studios.com/js/semantic.min.js"></script>
    <script type="text/javascript" src="https://skf-studios.com/js/search.min.js"></script>
    <script type="text/javascript" src="https://skf-studios.com/js/transition.min.js"></script>
    <script type="text/javascript" src="https://skf-studios.com/js/app.js"></script>
    <script type="text/javascript" src="https://skf-studios.com/js/form.js"></script>
    <script type="text/javascript" src="https://skf-studios.com/js/jquery-3.2.1.min.js"></script>

    <script type="text/javascript">
        $('#levels').progress({
            total: '400',
            value: '100',
            text: {
                percent: '100/400'
            }
        })
        $(document).ready(function () {
            $('[data-toggle="popup"]').each(function (k, el) {
                $(el).popup({
                    html: $(el).attr('data-content'),
                    position: $(el).attr('data-placement'),
                    variation: $(el).attr('data-variation')
                })
            })
        })
    </script>
</body>
</html>`;

convertor.generate(rankCard, { 
    usericon: 'https://cdn.discordapp.com/attachments/938559366582370314/991048525930446858/6FC7036B-8604-4BD4-8E58-34FB6B408ACB.jpg',
    username: 'Skarzz Enjoyer of leona ✨#0666',
    level: 69,
    xp: 45000,
    requiredXp: 65000,
    rankname: 'Good fox',
    position: 1,
}, result => {
    console.log('Test result -> \n');
    console.log(result);
});