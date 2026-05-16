import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		<main
			/* Нажатие вне сайдбара. */
			onClick={(e) => {
				const target = e.target as HTMLElement;
				/* Конечно, будь в кнопке id - было бы проще, но что имеем. */
				const isButton =
					target.getAttribute('role') === 'button' ||
					target.parentElement?.getAttribute('role') === 'button';

				if (
					isOpen &&
					!isButton &&
					!document.getElementsByTagName('aside')[0].contains(target)
				) {
					setIsOpen(false);
				}
			}}
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm isOpen={isOpen} setIsOpen={setIsOpen} />
			<Article />
		</main>
	);
};
