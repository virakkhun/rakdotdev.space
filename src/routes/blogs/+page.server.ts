import { FsType, type FsNode } from '../../components/fe/entity';
import type { PageServerLoad } from './[slug]/$types';
import fs from 'node:fs/promises';

const fileFromDirToLeaf = (filenames: string[]): FsNode[] =>
	filenames.map((filename) => ({
		label: filename,
		link: `/blogs/${filename.replace('.md', '')}`,
		type: FsType.FILE
	}));

export const load: PageServerLoad<FsNode> = async () => {
	const dirPath = [process.cwd(), 'static', 'blogs'].join('/');
	const filenames = await fs.readdir(dirPath);
	const leaf = fileFromDirToLeaf(filenames);
	return {
		label: 'blogs explorer',
		type: FsType.DIR,
		leaf
	};
};
