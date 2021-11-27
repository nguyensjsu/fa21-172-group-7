

/**toggle for kong or local
 * true = spring 8080 server
 * false = kong /api/...
 */
var kong = false

var spring_prefix = ""

var api_host =  kong? spring_prefix : "/api"

var axio_header = {headers: { apikey: '2H3fONTa8ugl1IcVS7CjLPnPIS2Hp9dJ' }}

module.exports = {
    api_host, axio_header
}
