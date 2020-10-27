<template>
    <div class="tab_bar_item" @click="itemClic">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <!-- 若将class属性直接绑定到插槽上，替换后该属性就不存在了 -->
        <div :style ="activeStyle">
            <slot name="item-text"></slot>
        </div>
        
        
        
    </div>
</template>

<script>
    export default {
        name: 'TabBarItem',
        props:{
            path: String,
            activeColor: {
                type: String,
                default: 'red'
            }
        },
        data() {
            return {
                //isActive: false
            }
        },
        computed: {
            isActive(){
                return this.$route.path.indexOf(this.path) !== -1 //当前活跃的路由是否包含于this.path
            },
            activeStyle(){
                return this.isActive? {color: this.activeColor} : {}
            }
        },
        methods: {
            itemClic(){
                this.$router.replace(this.path).catch(err => {})
            },
        }
    }
</script>

<style>
    .tab_bar_item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab_bar_item img {
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
      margin-bottom: 2px;
  }




</style>