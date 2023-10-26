<script setup lang='ts'>
import router from "../../router";
import { SuggestItem } from "../../api/home/type";
let props = defineProps(['hospitalInfo'])
let info = props.hospitalInfo

const handleSelect = () => {
    router.push({name:'reserve', query:{hosCode:info.hoscode}})
}
</script>

<template>
    <div class="container" @click="handleSelect">
        <div class="left-entry">
            <span class="hospital-name">{{ info.hosname }}</span>
            <div class="info">
                <div class="left-info">
                    <svg t="1693452750917" class="icon like" viewBox="0 0 1078 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4012" width="16" height="16">
                        <path
                            d="M658.245834 1024C418.607781 1024 36.569213 1024 36.569213 1024 12.177548 1024 0 1007.507285 0 987.430787L0 438.892592C0 418.816094 17.077823 402.323379 36.569213 402.323379L255.98449 402.323379C275.841574 402.323379 311.386848 409.27153 323.89352 422.984985 366.386945 387.841971 478.946982 278.390316 478.946982 105.38137 478.946982 1.707651 581.560194 1.159113 581.560194 1.159113 581.560194 1.159113 767.368365-30.875518 767.368365 244.30781 767.368365 304.025335 731.384259 402.323379 731.384259 402.323379L841.091898 402.323379C841.091898 402.323379 1150.796563 348.712913 1060.507176 694.877084 978.9944 1007.470715 899.310085 1024 658.245834 1024L658.245834 1024ZM73.138426 475.461805 73.138426 950.861574 219.415278 950.861574 255.98449 950.861574 255.98449 475.461805 255.98449 475.461805 73.138426 475.461805ZM841.091898 475.461805 585.107408 475.461805C585.107408 475.461805 698.947367 367.509489 698.947367 226.937434 698.947367 86.365379 637.693936 70.640618 598.674586 70.640618 559.655236 70.640618 547.36798 83.110719 547.36798 105.38137 547.36798 365.315336 329.122916 512.031018 329.122916 512.031018L329.122916 950.861574C329.122916 950.861574 473.827293 950.861574 658.245834 950.861574 842.664375 950.861574 920.776213 945.705315 987.36875 694.877084 1060.580315 419.218356 841.091898 475.461805 841.091898 475.461805L841.091898 475.461805Z"
                            fill="#272636" p-id="4013"></path>
                    </svg>
                    <span class="level-info">{{ info.param.hostypeString }}</span>
                </div>
                <div class="right-info">
                    <svg t="1693461583670" class="icon time" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4991" width="16" height="16">
                        <path
                            d="M846.507 177.493c-92.16-92.16-211.627-139.947-337.92-139.947-129.707 0-249.173 51.2-337.92 139.947-92.16 92.16-139.947 211.627-139.947 337.92 0 129.707 51.2 249.173 139.947 337.92 92.16 92.16 211.627 139.947 337.92 139.947 129.707 0 249.173-51.2 337.92-139.947 187.733-184.32 187.733-488.107 0-675.84zM802.133 808.96c-78.507 78.507-184.32 122.88-293.547 122.88-112.64 0-215.040-44.373-293.547-122.88s-122.88-184.32-122.88-293.547c0-112.64 44.373-215.040 122.88-293.547s184.32-122.88 293.547-122.88 215.040 44.373 293.547 122.88c163.84 160.427 163.84 426.667 0 587.093zM713.387 634.88l-167.253-95.573v-262.827c0-20.48-17.067-40.96-40.96-40.96-20.48 0-40.96 17.067-40.96 40.96v279.893c0 13.653 17.067 27.307 30.72 34.133 3.413 3.413 13.653 10.24 17.067 13.653l163.84 98.987c20.48 10.24 40.96 3.413 51.2-13.653 17.067-20.48 6.827-44.373-13.653-54.613z"
                            fill="" p-id="4992"></path>
                    </svg>
                    <span class="time-info">每天{{ info.bookingRule.releaseTime }}放号</span>
                </div>
            </div>
        </div>
        <div class="right-entry">
            <img  class="logo" :src="`data:image/jpeg;base64,${info.logoData}`"/>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    padding: 20px 30px;
    min-height: 60px;
    border-width: 1px;
    border-style: solid;
    border-color: #E0E0E0;
    border-radius: 5px;
    transition:all 0.3s ease-out;
    justify-content: space-between;
}
.container:hover{
    box-shadow: 0 0 10px 3px #E0E0E0;
}
.hospital-name{
    font-weight: 500;
    margin-bottom: 20px;
}
.left-entry{
    display: flex;
    flex-direction: column;
    width: 60%;
    /* justify-content: space-between; */
}
.like{
    cursor: pointer;
    margin-right: 10px;
}
.time{
    cursor: pointer;
    margin-right: 10px;
}
.info{
    display: flex;
    justify-content: space-between;
}
.logo{
    width: 75px;
}
</style>