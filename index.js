const axios = require('axios').default;
var fs = require('fs');
const options = {
    headers: {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        'sec-ch-ua-mobile': '?0',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Service-Worker-Navigation-Preload': 'trueSec-Fetch-Site: none',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Dest': 'document',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.9'
    }
};
var array = fs.readFileSync('data').toString().split("\n");

//status":"ERROR","reason

for (i in array) {

    let vidUrl = array[i].split('|')[0];
    let keyWord = array[i].split('|')[1];

    axios.get(vidUrl, options).then(function (response) {
        const regexp = /ERROR","reason":"(.*?)","errorScreen/;
        const str = response.data;
        const status = str.match(regexp)
        if(status !== null){
        console.log("!!REMOVED!! The status of your --->" + keyWord +" <--- video is: " + status[1])
        }

    });

    axios.get('https://www.youtube.com/results?search_query=' + keyWord.replace(' ', '+'), options).then(function (response) {
        const regexp = /url":"\/watch(.*?)","webPageType":"WEB_PAGE_TYPE_WATCH","rootVe"/g;
        const str = response.data;

        const array = [...str.matchAll(regexp)];
        let rank = 1
        array.forEach((video) => {
            //console.log(video[1]) 
            if (video[1] === vidUrl.split('watch')[1]) {
                console.log(keyWord + " is ranked at position " + rank)
            }
            rank += 1;
        });

    });
}





