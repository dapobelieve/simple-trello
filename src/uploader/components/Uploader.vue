<template>
	<div>
		<uploader-form @chosen="handleFilesChosen" />
		<uploader-file 
			:endpoint="getEndpointFor(upload.file.type)"
			:baseUrl="options.baseUrl" 
			:upload="upload" 
			v-for="upload in uploads" />
		{{options}}
	</div>
</template>
<script>
import options from "@/uploader/options"
import get from "lodash.get"
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
	components: {
		UploaderForm: () => import("@/uploader/components/UploaderForm"),
		UploaderFile: () => import("@/uploader/components/UploaderFile")
	},
	methods: {
		handleFilesChosen(files) {
			this.uploads.push(...Array.from(files).map((file) => {
				return {
					file
				}
			}))
		},
		getEndpointFor(fileType) {
			return get(this.handlers, [fileType, 'endpoint'], null)
		}
	}
}
</script>