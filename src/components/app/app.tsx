import { CSSProperties, useRef, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	OptionType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [, setApply] = useState({});
	const fontFamilyRef = useRef<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const fontSizeRef = useRef<OptionType>(defaultArticleState.fontSizeOption);
	const fontColorRef = useRef<OptionType>(defaultArticleState.fontColor);
	const backgroundColorRef = useRef<OptionType>(
		defaultArticleState.backgroundColor
	);
	const contentWidthRef = useRef<OptionType>(defaultArticleState.contentWidth);

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
					'--font-family': fontFamilyRef.current.value,
					'--font-size': fontSizeRef.current.value,
					'--font-color': fontColorRef.current.value,
					'--container-width': contentWidthRef.current.value,
					'--bg-color': backgroundColorRef.current.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				fontFamilyRef={fontFamilyRef}
				fontSizeRef={fontSizeRef}
				fontColorRef={fontColorRef}
				backgroundColorRef={backgroundColorRef}
				contentWidthRef={contentWidthRef}
				Apply={(
					fontFamily: OptionType,
					fontSize: OptionType,
					fontColor: OptionType,
					backgroundColor: OptionType,
					contentWidth: OptionType
				) => {
					fontFamilyRef.current = fontFamily;
					fontSizeRef.current = fontSize;
					fontColorRef.current = fontColor;
					backgroundColorRef.current = backgroundColor;
					contentWidthRef.current = contentWidth;
					setApply({});
				}}
				Reset={() => {
					fontFamilyRef.current = defaultArticleState.fontFamilyOption;
					fontSizeRef.current = defaultArticleState.fontSizeOption;
					fontColorRef.current = defaultArticleState.fontColor;
					backgroundColorRef.current = defaultArticleState.backgroundColor;
					contentWidthRef.current = defaultArticleState.contentWidth;
					setApply({});
				}}
			/>
			<Article />
		</main>
	);
};
