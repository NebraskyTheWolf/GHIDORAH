const nodeHtmlToImage = require('node-html-to-image');

const { v4 } = require('uuid');

/**
 * @function generate()
 * 
 * @param html html code to be converted
 * @param content arguments
 * @param callback buffer imaged callback
 * 
 * @author NebraskyTheWolf
 */
module.exports.generate = async function (html, content, callback) {
    const id = v4();
    const images = await nodeHtmlToImage({
        html: `<!DOCTYPE html>
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
                    ${html}
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
        </html>`,
        transparent: true,
        type: 'png',
        quality: 100,
        content: content,
        puppeteerArgs: {
            args: ['--no-sandbox'],
            defaultViewport: { width: 785, height: 417},
            timeout: 3000
        }
    })
    .then(result => callback({ status: true, data: result, path: `./assets/build/${id}.png` }))
    .catch(result => callback({ status: false, data: result }));
}


module.exports.rangePercentage = function (input, range_min, range_max) {
    return ((input - range_min) * 100) / (range_max - range_min);
}