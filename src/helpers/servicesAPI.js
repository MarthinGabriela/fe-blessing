import {Common} from "./common"

const MapToQueryString = (body) => {
    return Object.keys(body)
        .map(
            (k) => `${k}=${encodeURI(body[k])}`
        )
        .join('&')
};

const request = (path, method, body) => {
    let httpUrl = Common.URL.baseUrl + path
    const httpMethod = `${method}`.trim().toUpperCase();

    let parameter = {
        method: httpMethod,
        headers: {
            "Content-Type" : "application/json"
        }
    }

    if(["PUT, POST"].indexOf(httpMethod) >= 0) {
        httpUrl = httpUrl+"?"+MapToQueryString(body);
    } else {
        parameter["body"] = JSON.stringify(body);
    }

    console.log(`url = ${httpUrl}, body = ${JSON.stringify(parameter)}`)

    return new Promise(function (resolve, reject) {
        fetch(httpUrl, parameter)
            .then((response) => {
                console.log("response = " + response)
                if(response.ok) {
                    return response.json()
                } else {
                    reject(response)
                }
            })
            .then(body => resolve(body))
            .catch((error) => reject(error));
    });
}

export const Authentication = new (function() {
    this.login = async (token) => {
        return await request(
            Common.URL.login,
            "post",
            {token: token}
        );
    }
})();

export const BarangService = new (function() {
    const endPoint =(path) => `${Common.URL.barang}/${path}`;

    this.tampilkanItem = async () => {
        return await request(endPoint("tampilkan"), "get")
    }
})();

export {request};