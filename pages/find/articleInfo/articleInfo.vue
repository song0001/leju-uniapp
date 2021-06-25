<template>
	<div class="article-main">
		<h2>{{article.title}}</h2>
		<p style="text-align: right;color:#333333">作者:{{article.author}}</p>
		<p style="text-align: right;color:#333333">时间: {{article.createTime}}</p>
		<p class="summary">概要描述: {{article.summary}}</p>
		<image style="width:100%;margin: 30rpx auto;" :src="article.coverImg" mode=""></image>
		<!-- <rich-text :nodes="article.content2"></rich-text> -->
		<jyf-parser :html="article.content2" ref="article"></jyf-parser>
	</div>
</template>

<script>
	import { productArticle } from '@/api/find/index.js'
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		name: 'Article',
		  components: {
		    jyfParser
		  },
		data(){
			return {
				id: '',
				article: {}
			}
		},
		onLoad(option){
			this.id = option.articleId;
			this.getArticleDetail();
		},
		methods:{
			async getArticleDetail(){
				var {data} = await productArticle(this.id);
				this.article = data.productArticle;
				uni.setNavigationBarTitle({
					title:data.productArticle.title
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.article-main{
		padding: 60rpx;
	}
</style>
