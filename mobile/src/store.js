import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let token = ''
let userinfo = ''
let newsdetails = ''
let recipedetails = ''

try{
	if (sessionStorage.token)
    token=JSON.parse(sessionStorage.token)
    if (sessionStorage.userinfo)
        userinfo=JSON.parse(sessionStorage.userinfo)
    if (localStorage.newsdetails)
        newsdetails=JSON.parse(localStorage.newsdetails)
    if (localStorage.recipedetails)
        recipedetails=JSON.parse(localStorage.recipedetails)
}catch (e) {
    console.log(e,'error')
}

export default new Vuex.Store({
    state: {
        token:token,
        userinfo:userinfo,
        newsdetails:newsdetails,
        recipedetails:recipedetails
	},
    mutations: {
        gettoken(state, msg) {
            state.token = msg.token
            sessionStorage.token = JSON.stringify(msg.token)
        },
        getuserinfo(state, msg) {
            state.userinfo = msg.userinfo
            sessionStorage.userinfo = JSON.stringify(msg.userinfo)
        },
        getnewsdetails(state, msg) {
            state.newsdetails = msg.newsdetails
            localStorage.newsdetails = JSON.stringify(msg.newsdetails)
        },
        getrecipedetails(state, msg) {
            state.recipedetails = msg.recipedetails
            localStorage.recipedetails = JSON.stringify(msg.recipedetails)
        },
    }
})