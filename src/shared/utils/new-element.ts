export class NewElement {
	private _self = <HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>{};

	constructor(
		tag: keyof HTMLElementTagNameMap | HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
	) {
		if (tag instanceof Element) this._self = tag;
		else this._self = document.createElement(tag);
	}

	addClass(...cls: string[]) {
		this._self.classList.add(...cls);
		return this;
	}

	setClass(cls: string) {
		return this.addClass(...cls.split(' '));
	}

	setData(key: string, value: string) {
		this._self.dataset[key] = value;
		return this;
	}

	get data() {
		return this._self.dataset;
	}

	setAttr(name: string, value: string) {
		this._self.setAttribute(name, value);
		return this;
	}

	on(e: keyof HTMLElementEventMap, listener: () => void) {
		this._self.addEventListener(e, listener);
		return this;
	}

	addChild(el: HTMLElementTagNameMap[keyof HTMLElementTagNameMap]) {
		this._self.appendChild(el);
		return this;
	}

	get self() {
		return this._self;
	}

	get childNodes() {
		return [...this._self?.childNodes];
	}
}
