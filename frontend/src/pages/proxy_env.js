

/**toggle for kong or local
 * true = spring 8080 server
 * false = kong /api/...
 */
var dev = false



var kong_host = "http://localhost"
var spring_host = "http://localhost:8080"

var api_host =  dev? spring_host : kong_host+"/api"

var axio_header = {headers: { apikey: '2H3fONTa8ugl1IcVS7CjLPnPIS2Hp9dJ' }}

module.exports = {
    api_host, axio_header, dev
}
