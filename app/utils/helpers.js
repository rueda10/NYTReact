import axios from 'axios';

const NYT_KEY = 'b3b4ba7816ee49c9aeebb09ed6c1ed02';

module.exports = {
    runQuery: function(topic, startYear, endYear) {
        var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        queryURL += '?' + NYT_KEY + '&q=' + topic;
        if (startYear) {
            queryURL += '&begin_date' + startYear;
        }
        if (endYear) {
            queryURL += '&end_date' + endYear;
        }

        console.log(queryURL);

        return axios.get(queryURL).then(function(response) {
            if (response.data.results[0]) {
                return response.data.results[0].formatted;
            }

            return "";
        });
    },
    getArticles: function() {
        return axios.get('/api/saved');
    },
    saveArticle: function(article) {
        return axios.post('/api/saved', article);
    },
    deleteArticle: function(article) {
        return axios.delete('/api/saved', article);
    }
};