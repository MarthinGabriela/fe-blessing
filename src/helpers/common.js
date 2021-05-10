export const Common = {
    URL: {
        baseUrl: "https://tb-blessing.herokuapp.com/api/v1",
        barang: "/barang",
        login: "/login"
    },
    TOKEN: ''
}

export function currencyFormatting(value) {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
