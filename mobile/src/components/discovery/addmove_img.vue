<template>
  <main>
        <mt-header class="t" title="分享美食">
            <mt-button icon="back" slot="left" @click="back" class="l">返回</mt-button>
            <mt-button class="r" slot="right" @click="addMoving">发布</mt-button>
        </mt-header>
		<section class="content">
            <van-field
                v-model="content"
                rows="2"
                :autosize="{ maxHeight: 100, minHeight: 100 }"
                type="textarea"
                placeholder="这一刻的想法..."
                show-word-limit
            />
            <van-uploader :after-read="afterread" :max-count="9" :before-delete="beforedelete"  v-model="fileList"></van-uploader>
		</section>
  </main>
</template>

<script>
import { Toast, Dialog } from 'vant';
export default {
    data() {
        return {
            content:'',
            fileList:[],
            media:[],
            flagnum:'',
            arr:[]
        }
    },
    mounted(){
        this.getInit()
    },
    methods: {
        back(){
            if(this.media.length !== 0 || this.content !== ''){
                Dialog.confirm({
                    title: '',
                    message: '保留本次编辑？',
                    confirmButtonText:'保留',
                    cancelButtonText:'不保留'
                }).then(() => {
                    this.$store.commit('getmoveimg',{moveimg:{
                        media : this.media, 
                        content : this.content, 
                    }}) 
                    this.$router.go(-1)
                }).catch(() => {
                    this.$store.commit('getmoveimg',{moveimg:''}) 
                    window.localStorage.removeItem('moveimg')
                    console.log('不保留')
                    this.$router.go(-1)
                })
            }else{
                this.$store.commit('getmoveimg',{moveimg:''}) 
                window.localStorage.removeItem('moveimg')
                console.log('不保留')
                this.$router.go(-1)
            }
        },
        afterread(file){
            let params = new FormData(); //创建form对象
            params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
            let config = {
                headers: { //添加请求头
                Authorization:
                    "Bearer " + window.localStorage.getItem("managementToken"),
                "Content-Type": "multipart/form-data"
                }
            };
            // let url = "";
            this.$axios.post('/upload',params,config).then(res=>{
                console.log(res.data,'res.data')
                this.media.push(res.data.result.url)
            })
        },
        beforedelete(file){
            for(var i=0;i<this.fileList.length;i++){
                if(this.fileList[i].file){
                    if(this.fileList[i].file && this.fileList[i].file.name == file.file.name){
                        this.flagnum = i
                    }
                }else{
                    if(file.url === this.fileList[i].url){
                        this.flagnum = i
                    }
                }
            }
            this.$axios.post('/deleteImg',{
                url:this.media[this.flagnum]
            }).then(res => {
                this.fileList.splice(this.flagnum,1)
                this.media.splice(this.flagnum,1)
            })
        },
        addMoving(){
            console.log('发布成功')
            var time = new Date();
            if(this.content == ''){
                Toast({
                    message:'请先输入你要分享的内容',
                    position:"bottom"
                });
            }else if(this.media.length == 0){
                Toast({
                    message:'请至少上传一张照片喔~',
                    position:"bottom"
                });
            }
            else{
                let medias = {
                    type:'image',
                    matter:this.media
                }
                this.$axios.post('/addMoves',{
                    // id: Number(Math.random().toString().substr(3,length) + Date.now()).toString(36),
                    author : this.$store.state.userinfo.username,
                    avatar : this.$store.state.userinfo.avatar,
                    media : medias, 
                    content : this.content, 
                    time : time, 
                    status : 1
                }).then(res=>{
                    console.log(res.data)
                    Toast({
                        message: '发布成功',
                        icon: 'success'
                    });
                    setTimeout(()=>{
                        this.$router.replace({path:'/recommend'})
                    },1200)
                })
            }
        },
        getInit(){
            if(this.$store.state.moveimg){
                this.content = this.$store.state.moveimg.content
                if(this.$store.state.moveimg.media){
                    this.media = this.$store.state.moveimg.media
                    for(let i=0;i<this.$store.state.moveimg.media.length;i++){
                        this.fileList.push({url:this.$store.state.moveimg.media[i]}) 
                    }
                }
                
            }
        }
    },
}
</script>

<style scoped>
main{
        width: 100%;
        height: auto;
        /* background-color: #f5f5f5; */
    }
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
	/* .l{
	    background: url(../assets/images/back_icon.png) left center no-repeat;
    	background-size: 19px 44px;
    	padding-left: 16px;
	} */
	.l,.r{
		color: #ff5151;
		font-size: 16px;
    }
    /*网页内容*/
	.content{
		padding-top: 50px;
	}
    .content >>> .van-uploader{
        display: block;
    }
    .content >>> .van-uploader__preview ,.content >>> .van-uploader__upload{
        margin: 0 0 8px 8px;
    }
</style>