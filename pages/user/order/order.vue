<template>
	<view>
		
	</view>
</template>

<script>
	import {addPreOrder} from '../../../api/user/order/index.js'
	export default {
		data() {
			return {
				start:1,
				limit:10
			};
		},
		methods:{
			init(){
				addPreOrder({
					
					}).then(res=>{
					console.log(res)
				})
				}
			},
		onLoad() {
			// this.init()
		}
	}
</script>

<style lang="scss" scoped>

</style>
