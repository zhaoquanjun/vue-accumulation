<template>
    <div id="lefthua">
        <div class="slider" v-for="(item,index) in list" :key="index">
            <div class="content" @touchstart='touchStart($event, index)' @touchmove='touchMove($event, index)' @touchend='touchEnd($event, index)' :style="posList[index].deleteSlider">
                <slot>
                    {{item}}
                </slot>
            </div>
            <div class="remove">删除</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sliderdelete',
    data() {
        return {
            posList: [], // 位置列表,
            list: ["www", "555", "999", 'dsdsad', 'rerqwrqw']
        }
    },
    created () {
        this.list.map(() => {
            this.posList.push({
                startX: 0, //触摸位置
                endX: 0, //结束位置
                moveX: 0, //滑动时的位置
                disX: 0, //移动距离
                deleteSlider: "", //滑动时的效果,使用v-bind:style="deleteSlider"
            })
        })
    },
    methods: {
        touchStart(ev, index) {
            ev = ev || event
            //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
            if(ev.touches.length == 1) {
            // 记录开始位置
                this.posList[index].startX = ev.touches[0].clientX;
            }
        },
        touchMove(ev, index) {
            ev = ev || event;
            if(ev.touches.length == 1) {
                // 滑动时距离浏览器左侧实时距离
                this.posList[index].moveX = ev.touches[0].clientX
                //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                this.posList[index].disX = this.posList[index].startX - this.posList[index].moveX;
                // 如果是向右滑动或者不滑动，不改变滑块的位置
                if(this.posList[index].disX < 0 || this.posList[index].disX == 0) {
                    this.posList[index].deleteSlider = "transform:translateX(0px)";
                    // 大于0，表示左滑了，此时滑块开始滑动
                } else if(this.posList[index].disX > 0) {
                    //具体滑动距离取的是 手指偏移距离*2。
                    this.posList[index].deleteSlider = "transform:translateX(-" + this.posList[index].disX * 2 + "px)";
                    // 最大也只能等于300px
                    if(this.posList[index].disX * 2 >= 300) {
                        this.posList[index].deleteSlider = "transform:translateX(-" + 100 + "px)";
                    }
                }
            }
        },
        touchEnd(ev, index) {
            ev = ev || event;
            // 判断是否是单手触摸
            if(ev.changedTouches.length == 1) {
                let endX = ev.changedTouches[0].clientX;
                // 结束时的位置
                this.posList[index].disX = this.posList[index].startX - endX;
                // 左滑距离不超过屏幕一半的时候回到原来位置
                if((this.posList[index].disX * 2) < 175) {
                    this.posList[index].deleteSlider = "transform:translateX(0px)";
                } else {
                    //大于一半 滑动到最大值
                    this.posList[index].deleteSlider = "transform:translateX(-" + 375 + "px)";
                }
            }
        }
    }
}
</script>

<style>
.slider{
    position: relative;
}
.content {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 100px;
    text-align: center;
    background-color: #ccc;
    margin-top: 0.3rem;
}
.remove {
    position: absolute;
    width: 100px;
    height: 50px;
    line-height: 50px;
    background-color: #333;
    left: 0;
    top: 0;
    color: orange;
    text-align: center;
    font-size: 0.5rem;
}
</style>
