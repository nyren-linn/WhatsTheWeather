Vue.component('dropdown', {
	template: `
		<div>
			<button @click='toggleShow' class='anchor'>Select an Instrument</button>
			<div v-if='showMenu' class='menu'>
				<div class='menu-item' v-for='item in this.items' @click='itemClicked(item)'>{{item}}</div>
			</div>
		</div>
	`,
	data: function() {
		return {
			showMenu: false
		}
	},
	props: {
		onClick: 'function',
		items: {
			type: 'Object',
			default: []
		}
	},
	methods: {
		toggleShow: function() {
			this.showMenu = !this.showMenu;
		},
		itemClicked: function(item) {
			this.toggleShow();
			this.onClick(item);
		}
	}
})

const app = new Vue({
	el: '#app2',
	data: {
		activeInstrument: 'Piano',
		instruments: [
			'Piano',
			'Acoustic Guitar',
			'Drums',
			'Trumpet'
		]
	},
	methods: {
		changeInstrument: function(instrument) {
			this.activeInstrument = instrument;
		}
	}
})
