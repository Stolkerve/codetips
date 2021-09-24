<template>
	<v-snackbar
		v-model="enabled"
		class="mt-0"
		:color="snackbarModule.color"
		:timeout="snackbarModule.timeout"
	>
		{{snackbarModule.message}}
	</v-snackbar>
</template>

<script lang="ts">
import {Vue, Component, Watch} from "vue-property-decorator"
import {getModule} from "vuex-module-decorators";

import SnackBarModule from "@/store/SnackBarModule";

@Component
export default class SnackBarComponent extends Vue {
	snackbarModule: SnackBarModule = getModule(SnackBarModule)

	get enabled() {
		return this.snackbarModule.enabled;
	}
	set enabled(v: boolean) {
		this.snackbarModule.setSnackbarEnabled(v);
	}

	@Watch('enabled')
	onChildChanged(val: string, oldVal: string) {
		if (!val) {
				this.snackbarModule.checkQueueMessages();
		}
	}
}
</script>