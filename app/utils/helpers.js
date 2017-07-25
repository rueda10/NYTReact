import axios from 'axios';

const NYT_KEY = 'b3b4ba7816ee49c9aeebb09ed6c1ed02';

module.exports = {
    runQuery: function(topic, startYear, endYear) {
        var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        queryURL += '?api-key=' + NYT_KEY + '&q=' + topic;
        if (startYear) {
            queryURL += '&begin_date=' + startYear + '0101';
        }
        if (endYear) {
            queryURL += '&end_date=' + endYear + '1231';
        }

        return axios.get(queryURL).then(function(response) {
            if (response.data.response.docs[0]) {
                return response.data.response.docs;
            }

            return [];
        });
    },
    getArticles: function() {
        return axios.get('/api/saved').then(function(results) {
            return results;
        });
    },
    saveArticle: function(article) {
        return axios.post('/api/saved', article).then(function(results) {
            return results._id;
        });
    },
    deleteArticle: function(article) {
        return axios.delete('/api/saved', article);
    }
};