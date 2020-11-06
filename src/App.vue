<template>
  <div class="container">
    <div>
    	<uploader 
    	:options="{
    		baseUrl: 'http://localhost:3000/api'
    	}"
    	:handlers="{
    		'video/mp4': {
    			endpoint: '/uploads/video'
    		}
    	}" />
    </div>
  </div>
</template>
<script>
export default {
	components: {
		Uploader: () => import("@/uploader/components/Uploader"),
	},
  methods: {
    compound() {
      var cap = 200000;
      for(var i=1; i<=6; i++) {
        var int = (30/100) * cap
        console.log(`For month ${i}, cap ${cap} interest is ${int}`)
        cap+=int
      }

      console.log('Final money ==>', cap)
    }
  },
  mounted() {
    // this.compound()
  }
}
</script>