<template>
	<div class="relative h-20 w-20 mr-6">
		<div class="absolute inset-0 flex items-center justify-center">
			<span class="leading-tight text-sm text-blue-500 font-medium">{{ progress}}%</span>
		</div>
		<svg viewBox="0 0 120 120" class="transform -rotate-90">
			<circle 
				cx="60"
				cy="60"
				:r="radius"
				fill="none"
				stroke-width="12"
				class="stroke-current text-gray-200"
			/>
			<circle 
				cx="60"
				cy="60"
				:r="radius"
				fill="none"
				stroke-width="12"
				:stroke-dasharray="dash"
				:stroke-dashoffset="offset"
				class="stroke-current text-blue-500"
			/>
		</svg>
	</div>
</template>
<script>
export default {
	props: {
		progress: {
			type: Number,
			required: true
		}
	},
	data () {
		return {
			radius: 54
		}
	},
	computed: {
		dash() {
			return 2 * Math.PI * this.radius
		},
		offset() {
			let circ = this.dash
			let progress = this.progress / 100

			return circ * (1 - progress)
		}
	}
}
</script>