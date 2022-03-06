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
            "Content-Type" : "application/json",
            // "Access-Control-Allow-Origin": '*'
        }
    }

    if(body) {
        if (httpMethod === 'GET') {
            // console.log("mapquery")
            httpUrl = httpUrl + "?" + MapToQueryString(body);
        } else {
            // console.log("stringify")
            parameter["body"] = JSON.stringify(body);
        }
    }

    // console.log(`url = ${httpUrl}, body = ${JSON.stringify(parameter)}`)

    return new Promise(function (resolve, reject) {
        fetch(httpUrl, parameter)
            .then((response) => {
                // console.log("response = ", response)
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
    this.lihatBarang = async(id) => {
        return await request("/barang/view/" + id, "get");
    }
    this.tampilkanItem = async () => {
        return await request("/list-barang", "get");
    }
    this.buatBarang = async (param) => {
        return await request(
            "/barang",
            "post",
            param
        );
    }
    this.updateBarang = async (id, param) => {
        return await request(
            "/barang/update/" + id,
            "put",
            param
        );
    }
    this.deleteBarang = async(id) => {
        return await request(
            "/barang/" + id,
            "delete"
        )
    }
})();

export const TransaksiService = new (function() {
    this.viewInvoice = async (id) => {
        // console.log("request")
        return await request('/transaksi/view/'+id, 'get');
    }
    this.tampilkanInvoice = async (param) => {
        return await request("/list-transaksi", "get", param);
    }
    this.buatInvoice = async (param) => {
        return await request("/transaksi", "post", param);
    }
    this.editInvoice = async (id, param) => {
        return await request("/transaksi/update/" + id, "put", param);
    }
    this.hapusInvoice = async (id) => {
        return await request("/transaksi/" + id, "delete");
    }
})()

export const PembeliService = new (function() {
    this.viewPembeli = async (id) => {
        return await request('/pembeli/view/'+id, 'get');
    }
    this.tampilkanPembeli = async () => {
        return await request("/list-pembeli", "get",);
    }
    this.tampilkanListPembeli = async () => {
        return await request("/pembeli", "get",);
    }
    this.tambahPembeli = async (param) => {
        return await request("/pembeli", "post", param);
    }
    this.editPembeli = async (id, param) => {
        return await request("/pembeli/update/" + id, "put", param);
    }
    this.hapusPembeli = async (id) => {
        return await request("/pembeli/" + id, "delete");
    }
})()

export const listTransaksi = Common.URL.baseUrl + '/list-transaksi-v2';
export const listPembeli = Common.URL.baseUrl + '/list-pembeli';
export {request};