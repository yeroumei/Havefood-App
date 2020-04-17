import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let token = ''
let userinfo = ''
let newsdetails = ''
let recipedetails = ''
let moveimg = ''
let movevideo = ''
try{
	if (sessionStorage.token)
        token=JSON.parse(sessionStorage.token)
    if (sessionStorage.userinfo)
        userinfo=JSON.parse(sessionStorage.userinfo)
    if (localStorage.newsdetails)
        newsdetails=JSON.parse(localStorage.newsdetails)
    if (localStorage.recipedetails)
        recipedetails=JSON.parse(localStorage.recipedetails)
    if (localStorage.moveimg) movevideo
        moveimg=JSON.parse(localStorage.moveimg)
    if (localStorage.movevideo) 
        movevideo=JSON.parse(localStorage.movevideo)
}catch (e) {
    console.log(e,'error')
}

export default new Vuex.Store({
    state: {
        token:token,
        userinfo:userinfo,
        newsdetails:newsdetails,
        recipedetails:recipedetails,
        moveimg:moveimg,
        movevideo:movevideo,
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
        getmoveimg(state, msg) {
            state.moveimg = msg.moveimg
            localStorage.moveimg = JSON.stringify(msg.moveimg)
        },
        getmovevideo(state, msg) {
            state.movevideo = msg.movevideo
            localStorage.movevideo = JSON.stringify(msg.movevideo)
        },
    }
})