<template>
    <main>
        <mt-header class="t" title="我的收藏">
            <mt-button icon="back" slot="left" @click="back" class="l">返回</mt-button>
        </mt-header>
        <van-tabs v-model="activeName" @click="onClick" style="padding-top: 50px;">
            <van-tab title="食谱" name="recipe">
                <section>
                    <ul class="content">
                        <li @click="recipeDetails(item)" class="lists" v-for="(item,index) in recipedata">
                            <p :class=" item.style == 'video' ? 'lists_l' : 'lists_img' ">
                                <van-image
                                    v-if="item.style == 'video'"
                                    width="100%"
                                    height="100%"
                                    fit="cover"
                                    :src="item.step[item.step.length-1].img"
                                />
                                <van-image
                                    v-if="item.style == 'image'"
                                    width="100%"
                                    height="100%"
                                    fit="cover"
                                    :src="item.cover_pic"
                                />
                                <img
                                    v-else
                                    width="100%"
                                    height="100%"
                                    src="../../assets/images/myedit2.jpg"
                                />
                            </p>
                            <p class="lists_p">{{item.title}}</p>
                            <span class="lists_s">{{item.time}}</span>
                        </li>
                    </ul>
                </section>
            </van-tab>
            <van-tab title="文章" name="news">
                <section>
                    <ul class="content">
                        <li @click="newsDetails(item)" class="lists" v-for="(item,index) in newsdata">
                            <p class=" lists_img">
                                <van-image
                                    v-if="item.cover_pic"
                                    width="100%"
                                    height="100%"
                                    fit="cover"
                                    :src="item.cover_pic"
                                />
                                <img
                                    v-else
                                    width="100%"
                                    height="100%"
                                    src="../../assets/images/myedit1.jpg"
                                />
                            </p>
                            <p class="lists_p">{{item.title}}</p>
                            <span class="lists_s">{{item.time}}</span>
                        </li>
                    </ul>
                </section>
            </van-tab>
         </van-tabs>  
    </main>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'recipe',
            value:'',
            recipedata:[],
            newsdata:[]
        }
    },
    mounted() {
        this.toSearch()
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        onClick(name, title) {
            this.toSearch()
            console.log(name,title);
        },
        toSearch(){
            switch(this.activeName){
                case 'recipe':
                    this.$axios.get('/recipeList',{
                        params:{
                            status:2,  //只显示草稿的
                        }
                    }).then(resp=>{
                        this.recipedata = resp.data
                })  
                break;
                case 'news':
                    this.$axios.get('/newsCollect',{
                        params:{
                            status:2,  //只显示草稿的
                        }
                    }).then(resp=>{
                        console.log(resp.data,"wenzhang")
                        this.newsdata = resp.data
                    })
                      
                break;
            }
        },
        // 查看食谱详情
		recipeDetails(item){
			console.log(item,'item的详情')
			this.$store.commit('getrecipedetails',{recipedetails:item}) 
			this.$router.push({name:'addrecipe', params: {id:item._id}})
        },
        // 查看今日推荐详情
		newsDetails(item){
			console.log(item,'item的详情')
			this.$store.commit('getnewsdetails',{newsdetails:item}) 
			this.$router.push({name:'addnews', params: {id:item._id}})
        },
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
/*页面内容*/
	.content{
		margin: 0 15px;
	}
	.lists{
		width: 100%;
		border-bottom: 1px dashed #ddd;
		padding: 14px 0;
        overflow: hidden;
        position: relative;
	}
    .lists_l{
		width: 40%;
        height: 6em;
		float: left;
		position: relative;
	}
	.lists_img{
		width: 40%;
        height: 6em;
		float: left;
		position: relative;
	}
	.lists_l::before{
		content: '';
		display: block;
		position: absolute;
	    top: calc(50% - 6px);
		left: calc(50% - 4px);
	    width: 0;
	    height: 0;
	    border-top: 7px solid transparent;
	    border-bottom: 7px solid transparent;
	    border-left: 9px solid #fff;
	    z-index: 1;
	}
	.lists_l::after{
		content: '';
		display: block;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: rgba(0,0,0,0.6);
		position: absolute;
		top: calc(50% - 16px);
		left: calc(50% - 16px);
	}
	.lists_l img{
		width: 100%;
		float: left;
	}
	/* .lists_t{
		display: block;
		background-color: rgba(99,99,99,0.8);
		width: 37px;
		height: 15px;
		line-height: 16px;
		font-size: 10px;
		color: #fff;
		padding: 1px 2px;
		position: absolute;
		right: 0;
		bottom: 0;
	} */
	.lists_p,.lists_s{
		display: block;
		width: 48%;
		float: left;
		text-align: left;
		box-sizing: border-box;
		padding-left: 10px;
		overflow: hidden;
	}
	.lists_p{
		font-size: 16px;
		line-height: 24px;
	}
	.lists_s{
		font-size: 12px;
    	color: #ccc;
    	line-height: 28px;
	}
    .title{
        color:#aaa;
        text-align:left;
        padding-bottom:1em;
        width: 100%;
		font-size: 14px;
	   	overflow: hidden;    
		text-overflow: ellipsis; 
		white-space: nowrap; 
    }
</style>