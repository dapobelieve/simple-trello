<template>
	<form 
		enctype="multipart/form-data" 
		novalidate 
		action=""
		class="bg-gray-200 border-gray-400 border-2 border-dashed rounded-lg p-10 flex items-center justify-center relative mb-6"
		@dragover.prevent="handleDragOver"
		@dragleave.prevent="handleDragLeave"
		:class="{'border-gray-600': dragging}"
		>
		<input @change="handleFilesChosen" type="file" multiple class="absolute bg-red-300 opacity-0 w-full h-full left-0 top-0">
		<template v-if="dragging">
			<div class="text-gray-700">
				Let go to upload {{ draggingCount }} items
			</div>
		</template>
		<template v-else>
			<div class="text-gray-700">
				Drop here to upload or <span class="text-blue-500 cursor-pointer">choose files</span>
			</div>
		</template>
	</form>
</template>
<script>
export default {
	data () {
		return {
			dragging: false,
			draggingCount: 0
		}
	},
	methods: {
		handleFilesChosen(e) {
			this.dragging = false
			this.$emit('chosen', e.target.files) //File list
		},
		handleDragOver(e) {
			this.dragging = true
			this.draggingCount = e.dataTransfer.items.length
		},
		handleDragLeave() {
			this.dragging = false;
			this.draggingCount = 0
		}
	}
}
</script>