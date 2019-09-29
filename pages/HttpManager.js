export default class HttpManager {
    constructor(){}
    async getDataFromURL(targetURL) {
        const response = await fetch(`${targetURL}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        //alert(json);     // <-- (1) [Object]
        return json;
    }


}
