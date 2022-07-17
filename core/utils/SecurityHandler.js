/**
 * 
 * @param Client The Client instance of discord. 
 * @param requests the request object returned by the server.
 * @param response The response  object returned by the server.
 * @param action The action selected for the middleware.
 * @param callback The return callback with result of middlewares.
 * 
 * @description This function are used to simplify middleware check in the GHIDORAH API.
 * @author NebraskyTheWolf
 * 
 */
module.exports.handler = async function (client, request, response, action = 'origins', callback = {}) {
    if (!client.IsLoaded)
        callback({
            status: false,
            code: 'REJECTED',
            message: 'Server not initialized.'
        });
    const middleware = client.middlewares.get(action);
    if (middleware) {
        middleware.execute(client, request, response, result => {
            callback({
                status: true,
                code: 'ALLOWED',
                middleware: result
            });
        });
    } else {
        callback({
            status: false,
            code: 'REJECTED',
            message: 'Middleware execution failed.'
        });
    }
}