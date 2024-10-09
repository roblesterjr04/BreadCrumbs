import breadcrumbs from './breadcrumbs';
const getParameter = require('get-parameter');

const baseConfig = {
	cookieName: '_hansel',
	fillOnLoad: true,
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
		return this.breadcrumbs;
	},

	stage: function() {
		const _this = this;
		this.breadcrumbs.config.watching.forEach((item, index) => {
			const paramValue = getParameter(item);
			if (paramValue) _this.breadcrumbs.upsert(item, paramValue);
		});
		const event = new CustomEvent('breadcrumbs.init', {detail: _this.breadcrumbs});
		document.dispatchEvent(event);
		if (this.breadcrumbs.config.fillOnLoad) this.breadcrumbs.fillform();
	}

};

const BreadCrumbs = Stack.init();

Stack.stage();

export default BreadCrumbs;