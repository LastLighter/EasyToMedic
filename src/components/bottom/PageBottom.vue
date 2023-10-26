<script setup lang="ts">
</script>

<template>
    <div class="container">
        <div class="left-entry">
            <div class="left-item">
                <a>沪ICP备 19018275号</a>
            </div>
            <div class="left-item">
                <span>电话挂号 010-7758258</span>
            </div>
        </div>
        <div class="right-entry">
            <div class="right-item"><a>联系我们</a></div>
            <div class="right-item"><a>合作伙伴</a></div>
            <div class="right-item"><a>用户协议</a></div>
            <div class="right-item"><a>隐私协议</a></div>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 100%;
    background-color: #E3E3E3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 80px;
}
a{
    cursor: pointer;
}
.left-entry{
    display: flex;
    color: #7F7F7F;
    /* justify-content: left; */
}
.left-item{
    margin-right: 24px;
}
.right-entry{
    color: #7F7F7F;
    display: flex;
}
.right-item{
    margin-right:12px;
}
a:hover{
    color: #1F1F1F;
}

</style>