<script lang="ts">
	import Breadcrumb from '../../components/breadcrumb.svelte';
	import FileTree from '../../components/fe/file-tree.svelte';
	import { base } from '$app/paths';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const blogsTree = data;
	const _breadcrumbs = [
		{ link: `${base}/`, label: 'home' },
		{ link: `${base}/blogs`, label: 'blogs' }
	];
</script>

<svelte:head>
	<title>blogs by virak khun</title>
	<meta
		name="description"
		content="discover blogs related to web, javascript, typescript, node, script, react, vue and docker"
	/>
	<meta name="keywords" content="tech blogs, web blogs, js blogs" />
	<meta property="og:url" content="https://rakdotdev.space/blogs/" />
	<meta property="og:title" content="blogs by virak khun" />
	<meta
		property="og:description"
		content="discover blogs related to web, javascript, typescript, node, script, react, vue and docker"
	/>
	<meta name="twitter:url" content="https://rakdotdev.space/blogs/" />
	<meta name="twitter:title" content="blogs by virak khun" />
	<meta
		property="twitter:description"
		content="discover blogs related to web, javascript, typescript, node, script, react, vue and docker"
	/>
	<link rel="canonical" href="https://www.rakdotdev.space/blogs/" />

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Blog",
			"name": "blogs by virak khun",
			"url": "https://rakdotdev.space/blogs/",
			"description": "discover blogs related to web, javascript, typescript, node, script, react, vue and docker",
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": "https://rakdotdev.space/blogs/"
			}
		}
	</script>
</svelte:head>

<Breadcrumb breadcrumbs={_breadcrumbs} />
<FileTree tree={blogsTree} />
