<template>
	<div>
		<div>
			<label>
				Updates Per Frame
				<input type="text" @keyup="handleUpdatesChange" :value="alpha.updatesPerFrame" />
			</label>
			<br/>
			<button @click="newLayout(5, 5)">5x5</button>
			<button @click="newLayout(10, 5)">10x5</button>
			<button @click="newLayout(5, 10)">5x10</button>
			<button @click="newLayout(10, 10)">10x10</button>
			<button @click="newLayout(100, 100)">100x100</button>
		</div>
		<button @click="start">Start</button>
		<button @click="stop">Stop</button>
		<button @click="fill">Fill</button>
		<button @click="clear">Clear</button>
		<button @click="toggleVisible">{{alpha.visible ? "Hide" : "Show"}}</button>
		<div >
			<alpha-table id="alphaTable" v-show="alpha.visible" :layout="alpha.layout"></alpha-table>
		</div>
	</div>
</template>

<script>
	import AlphaTable from './components/AlphaTable.vue'
	import state from './state/state'
	import alphaState from './state/alpha/alpha'
	import Stats from 'stats-js'

	export default {
		components: {AlphaTable},
		data() {
			return {
				alpha: state.alpha,
				running: false
			};
		},
		methods: {
			toggleVisible: alphaState.toggleVisible,
			newLayout: alphaState.newLayout,
			updateTable: function(ms) {
				let self = this;

				stats.setMode(0);

				function update(ms) {
					stats.end();
					stats.begin();


					for (let i=0; i<self.alpha.updatesPerFrame; i++) {
						alphaState.toggleRandomCell(self.alpha.width, self.alpha.height);
					}

					//cleared = !cleared;
					//cleared
					//	? alphaState.clearTheTable()
					//	: alphaState.fillTheTable();

					self.running && setTimeout(update, ms);
				}

				update(ms);
			},

			start: function() {
				this.running = true;
				this.updateTable(0);
			},

			stop: function() {
				this.running = false;
			},

			fill: function() {
				alphaState.fillTheTable(this.alpha.width, this.alpha.height);
			},

			clear: function() {
				alphaState.clearTheTable(this.alpha.width, this.alpha.height);
			},

			handleUpdatesChange: function(e) {
				console.log(e.target.value);
				this.alpha.updatesPerFrame = e.target.value
			}
		},

		beforeDestroy: function() {
			console.log("beforeDestroy");
			this.stop();
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@require 'common/normalize'
	@require 'common/stylusIncludes'

	body, h1, h2, h3, h4, h5, h6,
	p, div, p, span, li, ul, ol,
	a, a:link, a:visited
		font-family "Helvetica Neue", Helvetica, "Trebuchet MS", Jamrul Arial, sans-serif
		color #404040
		font-weight 100
		line-height 1.2em
		box-sizing border-box

	a, a:link, a:visited
		text-decoration none


	input[type=text]
	textarea
		border solid 1px #a5a5a5 !important
		padding 3px 8px
		background #ffffff !important
		width 60px
		margin 0 10px
		color #000000


	input:focus
		box-shadow inset 0 0 80px rgba(200 255 255 0.5)

	input.error
	input.error:focus
		box-shadow inset 0 0 80px rgba(255 0 0 0.5)

	.show
		display inherit

	.hide
		display none !important

	br.clear
		height 0
		line-height 0
		font-size 0
		clear both

	shadow()
		box-shadow 0 2px 3px rgba(0 0 0 0.2)
</style>
