<template>
	<div class="bg-white rounded-lg flex p-4 items-stretch mb-1">
		<div>
			{{ progress }}
		</div>
		<div class="flex flex-col justify-between">
			<div class="mb-2">
				<div class="font-medium mr-3 text-gray-700 leading-tight">
					{{upload.file.name}}
				</div>
				<div class="text-sm text-gray-600 leading-tight">
					{{sizeDisplay}} MB
				</div>
			</div>
			<div class="text-gray-600 text-sm align-baseline">
				<template v-if="state == states.WAITING">Waiting</template>
				<template v-if="state == states.COMPLETED">Completed</template>
				<template v-if="state == states.FAILED">Failed</template>
				<template v-if="state == states.UPLOADING">Uploading</template>
				<template v-if="state == states.UNSUPPORTED">Sorry, this file is not supported</template>
			</div>
		</div>
	</div>
</template>
<script>
import states from "@/uploader/states"
import axios from "axios"
export default {
	props: {
		baseUrl: {
			type: String,
			required: true
		},
		endpoint: {
			required: true
		},
		upload: {
			required: true,
			type: Object
		}
	},
	data () {
		return {
			state: null,
			progress: 0,
			states
		}
	},
	computed: {
		sizeDisplay() {
			return (this.upload.file.size / 1000000).toFixed(2)
		}
	},
	methods: {
		makeFormData(file) {
			const form = new FormData();
			form.append('file', file, file.name)
			return form
		},
		handleUploadProgress(e) {
			this.progress = Math.round((e.loaded * 100) / e.total)
		},
		startUpload() {
			this.state = states.UPLOADING
			axios.post(this.endpoint, this.makeFormData(this.upload.file), {
				baseURL: this.baseUrl,
				onUploadProgress: this.handleUploadProgress
			})
			.then(() => {
				this.state = states.COMPLETED
			})
			.catch((e) => {
				this.state = states.FAILED
			})
		}
	},
	mounted() {
		if(this.endpoint == null) {
			return this.state = states.UNSUPPORTED
		}

		this.state = states.WAITING

		this.startUpload()
	}
}
</script>