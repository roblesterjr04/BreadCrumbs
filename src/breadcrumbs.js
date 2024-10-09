import Cookies from 'js-cookie';

class breadcrumbs extends EventTarget {

	constructor(config) {
		super();
		this.config = config;
		this.current = this.hydrate();
	}
	
	options(options) {
		const config = this.config;
		this.config = {...config, ...options};
	}

	hydrate() {
		const saved = Cookies.get(this.config.cookieName);
		try {
			return JSON.parse(atob(saved) ?? '{}') || {};
		} catch(e) {
			return JSON.parse(Cookies.get(this.config.cookieName) ?? '{}') || {};
		}

	}

	dump() {
		return JSON.stringify(this.current);
	}

	update() {
		const value = this.current;

		const event = new CustomEvent('scp.update');
		this.dispatchEvent(event);

		return Cookies.set(this.config.cookieName, btoa(JSON.stringify(value)), {
			expires: this.config.expires || 7,
			path: this.config.path || '',
			domain: this.config.domain || null
		});
	}

	upsert(key, value, hard = false) {
		if (this.current[key] === undefined || hard) this.current[key] = value;
		const event = new CustomEvent('scp.upsert', {detail: {key: key, value: value}});
		this.dispatchEvent(event);
		return this.update();
	}

	formfill() {
		for (const key in this.current) {
			if (this.current.hasOwnProperty(key)) {
				// Select all form fields with the matching name attribute
				const formFields = document.querySelectorAll(`[name="${key}"]`);

				formFields.forEach(field => {
					const value = this.current[key];

					if (field.type === 'checkbox' || field.type === 'radio') {
						// For checkboxes or radio buttons, set checked status
						if (Array.isArray(value)) {
							field.checked = value.includes(field.value);
						} else {
							field.checked = field.value === String(value);
						}
					} else {
						// For other input types, update the value
						field.value = value;
					}
				});
			}
		}
	}

}

export default breadcrumbs;