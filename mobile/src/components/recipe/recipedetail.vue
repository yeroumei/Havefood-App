<template>
    <main>
        <!-- <header class="head">
			<router-link to="/recommend"><span class="t_l btn"> < 美食杰 </span></router-link>
			<router-link to="/classify"><span class="t_r btn">菜谱分类 ></span></router-link>
		</header> -->
        <mt-header class="t" title="食谱详情">
            <mt-button icon="back" slot="left" @click="back" class="l">返回</mt-button>
        </mt-header>
        <section style="padding-top:50px">
            <div v-if="$store.state.recipedetails.style == 'video'">
                
                <div class="bgblur" :style="{'height':'350px' ,'background': 'url('+$store.state.recipedetails.step[$store.state.recipedetails.step.length-1].img+') center /cover no-repeat','background-size': 'cover'}" ></div>
                <div class="content-front" style="height:350px">
                    <video :src="$store.state.recipedetails.cover_pic" width="100%" height="100%" controls="controls" />
                </div>
            </div>
            <p v-if="$store.state.recipedetails.style == 'image'" class="bg" :style="{'background': 'url('+$store.state.recipedetails.cover_pic+') center /cover no-repeat','background-size': 'cover'}"></p>
            <div class="title">
				<h2 class="name">{{$store.state.recipedetails.title}}</h2>
				<span class="look">获赞  {{$store.state.recipedetails.loves.length}} ， 收藏  {{this.collects.length}}</span>
			</div>
            <div class="comment">
				<div class="user">
					<img :src="$store.state.recipedetails.avatar" />
					<p>{{$store.state.recipedetails.author}}</p>
					<span>{{$store.state.recipedetails.time}}</span>
				</div>
				<p style="margin-top:1em" :class="checkall ? '' : 'wraptext'">&nbsp;&nbsp;&nbsp;&nbsp;{{$store.state.recipedetails.des}}</p>
                <van-divider @click="checkall = !checkall">{{checkall ? '收回' : '查看'}}<van-icon name="arrow-down" style="padding-left:6px" /></van-divider>
			</div>
            <div class="box">
				<h2>
					类别
				</h2>
				<ul class="icon_ul">
					<li class="icon_li" v-for="item in $store.state.recipedetails.type">
						<i class="icon"></i>{{item}}
					</li>
				</ul>
				<h2>
					主要食材
					<span class="no">用量</span>
				</h2>
                <ul>
                    <li v-if="!checkall2" class="text_p">
                        <span>{{$store.state.recipedetails.menu ? $store.state.recipedetails.menu[0].list :'' }}</span>
                        <span style="color: #666;">{{$store.state.recipedetails.menu ? $store.state.recipedetails.menu[0].size :''}}</span>
                    </li>
                    <li v-if="!checkall2" class="text_p">
                        <span>{{$store.state.recipedetails.menu ? $store.state.recipedetails.menu[1].list :''}}</span>
                        <span style="color: #666;">{{$store.state.recipedetails.menu[1].size}}</span>
                    </li>
                    <li v-if="checkall2 && $store.state.recipedetails" class="text_p"  v-for="item in $store.state.recipedetails.menu">
                        <span>{{$store.state.recipedetails.menu ?item.list :''}}</span>
                        <span style="color: #666;">{{item.size}}</span>
                    </li>
                    <van-divider @click="checkall2 = !checkall2">{{checkall2 ? '收回' : '查看'}}<van-icon name="arrow-down" style="padding-left:6px" /></van-divider>
                </ul>
			</div> 
            <ul>
				<li class="steps" v-for="(item,index) in $store.state.recipedetails.step">
					<h2>步骤 {{index+1}}</h2>
					<img :src="item.img"/>
					<p>{{item.temp}}</p>
				</li>
			</ul>
            <p style="font-size:14px;color:#ccc;padding:1em">完、有我有你有美食~</p>
		</section>
        <button class="topbtn" ref="totop" @click="goTop()"></button>

		<nut-buttongroup style="position:fixed;bottom:0">
            <van-button :icon="$store.state.recipedetails.loves.indexOf($store.state.userinfo.username) == -1 ? 'like-o': 'like' " color="#ff5151" plain hairline style="width:100%" @click="onlove">点赞 {{$store.state.recipedetails.loves.length}}</van-button>
            <van-button :icon="flag ? 'star' : 'star-o' " color="#ff5151" plain hairline style="width:100%" @click="onCollect">收藏  {{this.collects.length}}</van-button>
        </nut-buttongroup>
    </main>
</template>

<script>
export default {
    data() {
        return {
            checkall:false,
			checkall2:false,
			collects:[],
            flag:''
        }
    },
    mounted() {
        this.$store.state.recipedetails.time =  new Date(this.$store.state.recipedetails.time).format("yyyy-MM-dd hh:ss:mm");
		this.needScroll()
		this.getCollect()
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        // 回到顶部
        needScroll(){
            let clientHeight = document.documentElement.clientHeight
            let ototop = this.$refs.totop
            document.documentElement.scrollTop = 0  //进来是顶部
            window.onscroll = function () {
                let osTop = document.documentElement.scrollTop || document.body.scrollTop
                if (osTop >= clientHeight) {
                    ototop.style.opacity = '1'
                } else {
                    ototop.style.opacity = '0'
                }
                if (!this.isTop) {
                    clearInterval(this.timer)
                }
                this.isTop = false
            }
        },
        goTop () {
            let self = this
            self.timer = setInterval(function () {
                let osTop = document.documentElement.scrollTop || document.body.scrollTop
                let ispeed = Math.floor(-osTop / 5)
                document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
                self.isTop = true
                if (osTop === 0) {
                    clearInterval(self.timer)
                }
            }, 30)
		},
		//  点赞
        onlove(item) {
            if(this.$store.state.userinfo.username){ //验证已登录
                var flag = this.$store.state.recipedetails.loves.indexOf(this.$store.state.userinfo.username);
                if (flag !== -1) {
                    this.$store.state.recipedetails.loves.splice(flag, 1);
                } else {
                    this.$store.state.recipedetails.loves.push(this.$store.state.userinfo.username);
                }
                this.$axios
                    .post("/loveRecipe", {
                    loves: this.$store.state.recipedetails.loves,
                    _id: this.$store.state.recipedetails._id
                    })
                    .then(res => {
						this.$store.commit('getnewsdetails',{recipedetails:res.data[0]}) 
                        console.log(res.data, "谁点赞了呢");
                });
            }else{
                this.$router.push({path:'/login'})
                console.log('请先登录')
            }
        },
        onCollect(){
            if(this.flag){
                this.$axios
                    .post("/deleteCollects", {
                        user : this.$store.state.userinfo.username, 
                        type: 'recipe',
                        favorite : this.$store.state.recipedetails._id, 
                    })
                    .then(res => {
                        this.getCollect()
                        this.flag = false
                        console.log(res.data,'谁不收藏我了')
                });
            }else{
                this.$axios
                    .post("/addCollects", {
                        user : this.$store.state.userinfo.username, 
                        type: 'recipe',
                        favorite : this.$store.state.recipedetails._id, 
                    })
                    .then(res => {
                        this.getCollect()
                        this.flag = true
                        console.log(res.data,'谁收藏我了')
                });
            }
        },
        getCollect(){
            this.$axios.get('/collectsList',{
                params:{
                    type : 'recipe',
                    favorite : this.$store.state.recipedetails._id
                }
            }).then(res=>{
                this.collects = res.data
                for(let i = 0;i < res.data.length;i++){
                    if(res.data[i].user == this.$store.state.userinfo.username){
                        this.flag = true
                    }else{
                        this.flag = false
                    }
                }
                console.log(res.data,'这是收藏的文章')
            })
        }
    },
}
</script>

<style scoped>
.t{
		height: 50px;
	    background: #fdfdfd;
	    padding: 0px 16px;
	    color: #000;
	    font-size: 18px;
        width: 100%;
        position: fixed;
        z-index: 1;
	}
	.l,.r{
		color: #ff5151;
		font-size: 16px;
    }
/* 顶部导航 
    .head{
		height: 45px;
		width: 100%;
		position: fixed;
		z-index: 1;
	}
	.btn{
		display: inline-block;
		height: 30px;
		line-height: 30px;
		border-radius: 15px;
		padding: 0 12px;
		background: rgba(0,0,0,0.5);
		color: #fff;
		font-size: 14px;
		position: absolute;
		bottom: 0;
	}
	.t_l{
		left: 4%;
	}
	.t_r{
		right: 4%;
	}*/
    /* 封面图 */
    .bgblur{
        float: left;
            width: 100%;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            -webkit-filter: blur(10px);
            -moz-filter: blur(10px);
            -o-filter: blur(10px);
            -ms-filter: blur(10px);
            filter: blur(10px);
    }
    .content-front {
          position:absolute;
          /* left: 10px;
          right: 10px; */
          height:350px;
          text-align: center;
        }
    .bg{
		width: 100%;
		padding-bottom: 60%;
	}
    .title{
		text-align: left;
		padding: 20px;
	    background-color: #fff4d6;
	}
	.name{
		font-size: 24px;
		font-weight: 900;
	    line-height: 32px;
	}
	.look{
		display: block;
		font-size: 12px;
		color: #666;
		padding: 8px 0 16px 0;
	}
    
	.comment{
		padding: 5px 20px;
		text-align: left;
		box-sizing: border-box;
		position: relative;
	}
	.user{
		padding: 10px 0;
		position: relative;
	}
	.user>img{
		display: inline-block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		float: left;
	}
	.user>p{
		font-size: 14px;
		color: #666;
		padding-left: 50px;
		line-height: 22px;
	}
	.user>span{
		font-size: 12px;
		color: #999;
		padding-left: 10px;    
		line-height: 18px;
	}
	.user::after{
		content: '关注';
	    display: inline-block;
		height: 26px;
	    line-height: 26px;
		font-size: 14px;
	    border: 1px solid #ff4c39;
	    color: #ff4c39;
	    padding: 0px 15px;
	    border-radius: 14px;
	    position: absolute;
	    right: 0;
	    top: 16px;
	}
    .wraptext{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
	.comment:after{
		content: '';
		display: block;
		width: 200%;
		height: 1px;
		background: #e2e2e2;
		position: absolute;
		left: -50%;
		bottom: 0;
		transform: scale(0.5);
	}
    .box{
		padding: 0 20px;
		text-align: left;
		box-sizing: border-box;
		position: relative;
	}
	.box:before{
		content: '';
		display: block;
		width: 48px;
	    height: 80px;
	    position: absolute;
	    top: 0px;
	    right: 20px;
	    background: url(../../assets/images/bgbtn.png) 0px -24px no-repeat;
	    background-size: 400px 400px;
	}
	.box>h2{
		display: inline-block;
		height: 36px;
		font-size: 16px;
		font-weight: 900;
		line-height: 36px;
		padding-top: 20px;
	}
	.stars{
		height: 21px;
	    line-height: 21px;
	    margin-top: 6px;
	    display: inline-block;
	    vertical-align: top;
	    margin-left: 15px;
	}
	.on{
		display: inline-block;
		width: 21px;
		height: 21px;
		margin-right: 4px;
	}
	.s_l{
		background: url(../../assets/images/bgbtn.png);
		background-size: 300px 300px;
    	background-position: 0px -78px;
	}
	.s_r{
		background: url(../../assets/images/bgbtn.png);
		background-size: 300px 300px;
    	background-position: -21px -78px;
	}
	.icon_ul{
		width: 100%;
		padding-top: 2px;
	}
	.icon_li{
		width: 40%;
		height: 24px;
		color: #666;
		vertical-align: top;
        float: left;
	}
	.icon{
		display: inline-block;
		background: url(../../assets/images/bgbtn.png) no-repeat;
		background-size: 400px 400px;
		height: 24px;
		width: 24px;
		margin-right: 4px;
		vertical-align: top;
	}
	.icon_li:nth-of-type(2) .icon{
    	background-position: -1px -0px;
	}
	.icon_li:nth-of-type(1) .icon{
    	background-position: -73px -0px;
	}
    /*辅料*/
	.no{
		display: inline-block;
		font-size: 14px;
		color: #999;
		font-weight: normal;
	}
    .text_p{
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
    }
	.steps{
		width: 100%;
	}
	.steps>h2{    
		height: 44px;
    	line-height: 44px;
		font-size: 19px;
		font-weight: normal;    
		margin: 30px 0px 10px;
	}
	.steps>img{
		width: 100%;	
	}
	.steps>p{
		padding: 16px 20px;
		font-size: 17px;
		text-align: left;
	}
	/*tab显示*/
	.picbox{
		width: 100%;
		padding-top: 66.666666%;
		box-sizing: border-box;
    	position: relative;
		overflow: hidden;
	}
	.picbox>img{
		width: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.btnbox{
		overflow: hidden;
		padding: 20px;
	}
	.picbtn{
		width: 20vw;
		height: 20vw;
		float: left;
		display: inline-block;
		overflow: hidden;
		margin-right: 10px;
		box-sizing: border-box;
		opacity: 0.5;
		position: relative;
	}
	.picbtn>img{
		display: block;
		width: 100%;
		margin: auto;
		position: absolute;
	    left: 0px;
	    right: 0px;
	    bottom: 0px;
	    top: 0px;
	}
	.active{
		opacity: 1;
	}
	.foot{
		text-align: left;
		font-size: 12px;
	    color: #777777;
	    padding: 10px 0 10px 20px;
	}
	.topbtn{
		border: 0;
		outline: none;
	    position: fixed;
	     z-index: 200; 
	    right: 0px;
	    bottom: 0px;
	    background: url(../../assets/images/bgbtn.png) 0px -220px no-repeat;
	    background-size: 400px 400px;
	    height: 40px;
	    width: 25px;
	    opacity: 0;
	    transition: all 1s;
	}
</style>