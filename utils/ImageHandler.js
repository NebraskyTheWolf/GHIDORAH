const nodeHtmlToImage = require('node-html-to-image');

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
    await nodeHtmlToImage({
        html: html,
        content: content
    })
    .then(result => callback({ status: true, data: result }))
    .catch(result => callback({ status: false, data: result }));
}
