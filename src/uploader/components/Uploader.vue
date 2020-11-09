<template>
	<div>
		<uploader-form @chosen="handleFilesChosen" />
			
		<div class="mb-4 flex justify-between px-4 text-gray-600 text-sm">
			<span>{{uploads.length}} uploads ({{currentUploadCount}} in progress / {{completeUploadCount}} complete)</span>
			<span>{{ overallProgress }}% complete</span>
		</div>


		<uploader-file 
			:endpoint="getEndpointFor(upload.file.type)"
			:baseUrl="options.baseUrl" 
			:upload="upload" 
			@progress="handleUploadProgress($event)"
			:key="uploads.id"
			@change="handleUploaderChange"
			v-for="upload in uploads" />
		
	</div>
</template>
<script>
import options from "@/uploader/options"
import get from "lodash.get"
import states from "../states"
import { v4 as uuid} from "uuid"
export default {
	props: {
		options: {
			type: Object,
			required: false,
			default: () => options
		},
		handlers: {
			type: Object,
			required: false,
		}, 
	},
	data () {
		return {
			uploads: []
		}
	},
	computed: {
		currentUploadCount() {
			return this.uploads.filter(upload => upload.uploading).length
		},
		completeUploadCount() {
			return this.uploads.filter(upload => upload.complete).length
		},
		overallProgress() {
			if(this.uploads.length === 0) return 0;

			let uploads = this.uploads.filter(upload => !upload.cancelled && !upload.failed)

			if(uploads.length === 0) return 0;

			return parseInt(uploads.reduce((a, b) => a + b.progress, 0) / uploads.length)
		}
	},
	components: {
		UploaderForm: () => import("@/uploader/components/UploaderForm"),
		UploaderFile: () => import("@/uploader/components/UploaderFile")
	},
	methods: {
		handleUploaderChange(e) {
			switch(e.state) {
				case states.UPLOADING:
					this.uploads = this.uploads.map(upload => {
						if(e.id === upload.id) {
							upload.uploading = true
						}

						return upload
					})
					break;
				case states.COMPLETED:
					this.uploads = this.uploads.map(upload => {
						if(e.id === upload.id) {
							upload.complete = true
							upload.uploading = false
						}

						return upload
					})
					break;
				case states.CANCELLED:
					this.uploads = this.uploads.map(upload => {
						if(e.id === upload.id) {
							upload.cancelled = true
							upload.uploading = false
						}

						return upload
					})
					break;
				case states.FAILED:
					this.uploads = this.uploads.map(upload => {
						if(e.id === upload.id) {
							upload.failed = true
							upload.uploading = false
						}

						return upload
					})
					break;
			}
		},
		handleUploadProgress(e) {
			this.uploads = this.uploads.map(upload => {
				if(e.id === upload.id) {
					upload.progress = e.progress
				}

				return upload
			})
		},
		handleFilesChosen(files) {
			this.uploads.push(...Array.from(files).map((file) => {
				return {
					id: uuid(),
					file,
					progress: 0,
					complete: false,
					uploading: false,
					failed: false,
					cancelled: false,
					queued: true
				}
			}))
		},
		getEndpointFor(fileType) {
			return get(this.handlers, [fileType, 'endpoint'], null)
		}
	},
	mounted() {
		setInterval(() => {
			if(this.currentUploadCount >= this.options.maxConcurrentUploads) return;

			let queued = this.uploads.filter(upload => upload.queued === true)

			if(queued.length) {
				queued[0].queued = false
			}
		}, 500)
		
	}
}
</script>