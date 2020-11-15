<template>
    <div>
        <h1 style="margin-left: 10px">{{$appName}}</h1>

        <b-navbar v-if="!hideNavBar"
                  type="dark"
                  variant="dark"
        >
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item v-for="(menu, index) in menus"
                                :active="active === menu.route"
                                :key="menu+index"
                                :style="{fontWeight: 'bold'}"
                                :to="menu.route"
                    >{{menu.caption}}</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            active: String,
            hideNavBar: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                menus: [
                    {caption : "Home", route: "home"},
                    {caption: "Stok", route: 'stok'},
                    {caption: "Transaksi", route: 'transaksi'}
                ]
            }
        },
    }
</script>