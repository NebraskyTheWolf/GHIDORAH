var async = require('async')
var _ = require('underscore')
var DatatableQueryBuilder = require('node-datatable')

module.exports = {
    generate: function () {},

    display: function (req, res) {
        var datatableQueryBuilder = new DatatableQueryBuilder({
            sTableName: 'leaderboard'
        });

        var requestQuery = {
            iDisplayStart: 0,
            iDisplayLength: 5
        };
        requestQuery = Object.assign(requestQuery, req.query)

        var queries = datatableQueryBuilder.buildQuery(requestQuery);
    },
    displayLeaderboard: function (req, res) {

    },
    searchUser: function (req, res) {

    }
}