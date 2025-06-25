<script lang="ts">
	import { NewElement } from '../shared/utils/new-element';
	import { onMount } from 'svelte';
	import '../assets/css/shade-of-purple.css';
	import CopyIcon from '../assets/icons/copy.svg';

	export let content: string;

	const FIVE_SECONDS = 5000;
	const REGEX = /(`{3}\w{1})/g;
	let markdownValue = '';
	let showAlert = false;
	let timeoutId: NodeJS.Timeout;

	function parseOperation(value: string) {
		if (!value) return;
		const isCodeSyntax = REGEX.test(value.slice(-4));
		if (isCodeSyntax) return;
		markdownValue = String(value).replaceAll(/"(\d{1})"/g, (v) => {
			return `' ${v.replaceAll('"', '')}'`;
		});
	}

	function appendBtnEleToEachPre() {
		const preEleRefs = [...document.querySelectorAll('pre')];

		for (const el of preEleRefs) {
			const instance = new NewElement(el);
			const content = [...instance.childNodes].map((node) => node.textContent).join('');
			const btn = getCopyEle(content);
			const lineNr = getLineNumberIndicatorEle();
			instance
				.addClass('relative')
				.addChild(btn)
				.addChild(lineNr)
				.on('scroll', () => {
					const scrollLeft = el.scrollLeft;
					btn.style.transform = `translateX(${scrollLeft}px)`;
					btn.style.transition = 'none';
				});
		}
	}

	function copyToClipboard(value: string) {
		navigator.clipboard.writeText(value).then(() => {
			showAlert = !showAlert;

			if (timeoutId) clearTimeout(timeoutId);

			timeoutId = setTimeout(() => {
				showAlert = !showAlert;
			}, FIVE_SECONDS);
		});
	}

	function getLineNumberIndicatorEle() {
		const div = new NewElement('div').addClass(
			'absolute',
			'top-0',
			'left-0',
			'w-12',
			'bg-[#1e243e]',
			'h-full',
			'-z-10'
		);
		return div.self;
	}

	function getCopyEle(value: string) {
		const btn = new NewElement('button')
			.setClass(
				'absolute text-sm top-4 right-4 p-2 rounded-md bg-primary hover:bg-secondary transition-all duratiion-200'
			)
			.setData('content', value)
			.on('click', () => {
				copyToClipboard(btn.data.content ?? '');
			})
			.addChild(getCopyImgSrc());
		return btn.self;
	}

	function insertIdToParent() {
		const anchors = [...document.querySelectorAll('a')];
		for (const anchor of anchors)
			if (anchor.parentElement?.nodeName === 'P') {
				const { hash } = new URL(anchor.href);
				anchor.parentElement.id = hash.replace('#', '');
				anchor.parentElement.className = 'section';
			}
	}

	function getCopyImgSrc() {
		const img = new NewElement('img')
			.setAttr('src', CopyIcon)
			.setAttr('width', '16')
			.setAttr('height', '16')
			.setAttr('alt', 'copy icon');
		return img.self;
	}

	$: {
		parseOperation(content);
	}

	onMount(() => {
		insertIdToParent();
		appendBtnEleToEachPre();

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	});
</script>

<div class="code-wrapper">
	{@html markdownValue}
</div>

{#if showAlert}
	<p class="text-sm p-2 rounded-md fixed bottom-4 right-4 bg-primary text-background">
		copied to clipboard
	</p>
{/if}
