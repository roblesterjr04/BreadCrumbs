import breadcrumbs from './breadcrumbs';
const getParameter = require('get-parameter');

const baseConfig = {
	cookieName: '_hansel',
	formfill: false,
	watching: [
		'utm_term',
		'utm_source',
		'utm_campaign',
		'utm_content',
		'utm_medium',
		'email'
	]
};

const Stack = {

	breadcrumbs: null,

	init: function(options) {
		const config = options || {};
		this.breadcrumbs = new breadcrumbs({...baseConfig, ...config});
		const event = new CustomEvent('breadcrumbs.initialized', {detail: this.breadcrumbs});
		document.dispatchEvent(event);
		return this.breadcrumbs;
	},

	stage: function() {
		const event = new CustomEvent('breadcrumbs.before_init', {detail: this.breadcrumbs});
		document.dispatchEvent(event);
		const _this = this;
		this.breadcrumbs.config.watching.forEach((item, index) => {
			const paramValue = getParameter(item);
			if (paramValue) _this.breadcrumbs.upsert(item, paramValue);
		});
		if (this.breadcrumbs.config.formfill) this.breadcrumbs.formfill();
	}

};

const BreadCrumbs = Stack.init();

Stack.stage();

export default BreadCrumbs;