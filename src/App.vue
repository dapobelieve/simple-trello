<template>
  <div class="container">
    <div>
    	<uploader 
    	:options="{
    		baseUrl: 'http://localhost:5000/api'
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
	}
}
</script>