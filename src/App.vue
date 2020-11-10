<template>
  <div class="container">
    <div>
    	<uploader 
    	:handlers="{
    		'video/mp4': {
    			endpoint: '/uploads/video'
    		},
            'image/png': {
                endpoint: '/uploads/video'
            },
            'image/jpeg': {
                endpoint: '/uploads/video'
            },
            'image/jpg': {
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