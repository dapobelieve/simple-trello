<template>
	<div class="bg-white rounded-lg flex p-4 items-stretch mb-1">
		<uploader-progress :progress="progress" />
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
				<template v-if="state == states.CANCELLED">Cancelled</template>
				<template v-if="state == states.FAILED">Failed</template>
				<template v-if="state == states.UPLOADING">
					<a @click.prevent="cancelUpload" href="#" class="text-blue-500">Cancel</a>
				</template>
				<template v-if="state == states.UNSUPPORTED">Sorry, this file is not supported</template>
			</div>
		</div>
	</div>
</template>
<script>
import states from "@/uploader/states"
import UploaderProgress from "./UploaderProgress"
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
	components: {
		UploaderProgress
	},
	data () {
		return {
			state: null,
			progress: 0,
			states,
			axios: {
				cancel: null
			}
		}
	},
	computed: {
		sizeDisplay() {
			return (this.upload.file.size / 1000000).toFixed(2)
		}
	},
	watch: {
		'upload.queued' (queued) {
			if(this.state == states.UNSUPPORTED) return;

			if(!queued)
				this.startUpload()
		},
		state(state) {
			this.$emit('change', {
				id: this.upload.id,
				state
			})
		},
		progress(progress) {
			this.$emit('progress', {
				id: this.upload.id,
				progress,
			})
		}
	},
	methods: {
		cancelUpload() {
			this.axios.cancel()
		},
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
				onUploadProgress: this.handleUploadProgress,
				cancelToken: new axios.CancelToken((token) => {
					this.axios.cancel = token
				})
			})
			.then(() => {
				this.state = states.COMPLETED
			})
			.catch((e) => {
				if(e instanceof axios.Cancel) {
					return this.state = states.CANCELLED
				}


				this.state = states.FAILED
			})
		}
	},
	mounted() {
		if(this.endpoint == null) {
			return this.state = states.UNSUPPORTED
		}

		this.state = states.WAITING
	}
}
</script>