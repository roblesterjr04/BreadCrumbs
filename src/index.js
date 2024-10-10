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
		'email',
		'gclid',
	],
	overwrite: [
		'utm_term',
		'utm_source',
		'utm_campaign',
		'utm_content',
		'utm_medium',
		'email',
		'gclid',
	]
};

const Stack = {

	breadcrumbs: null,

	init: function(options) {
		const config = options || {};
		this.breadcrumbs = new breadcrumbs({...baseConfig, ...config});
		this.stage();
		const event = new CustomEvent('breadcrumbs.initialized', {detail: this.breadcrumbs});
		document.dispatchEvent(event);
		return this.breadcrumbs;
	},
	
	visitor: function() {
		const timestamp = Date.now().toString(36); // Convert timestamp to a base-36 string
		const randomNum = Math.random().toString(36).substr(2, 9); // Generate a random base-36 string
		const visitorID = `${timestamp}-${randomNum}`; // Combine timestamp and random string
		return visitorID;
	},

	stage: function() {
		const event = new CustomEvent('breadcrumbs.before_init', {detail: this.breadcrumbs});
		document.dispatchEvent(event);
		const _this = this;
		
		const visitorId = this.breadcrumbs.get('vid') || this.visitor();
		this.breadcrumbs.upsert('vid', visitorId);
		
		this.breadcrumbs.config.watching.forEach((item, index) => {
			const paramValue = getParameter(item);
			if (paramValue) _this.breadcrumbs.upsert(item, paramValue, _this.breadcrumbs.config.overwrite.indexOf(item) >= 0);
		});
		if (this.breadcrumbs.config.formfill) this.breadcrumbs.formfill();
	}

};

const BreadCrumbs = Stack.init();

export default BreadCrumbs;