import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useEffect, useRef, useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onApply: (articleState: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [, setChanged] = useState({});
	const selectedArticleState = useRef<ArticleStateType>({
		...defaultArticleState,
	});

	let asideClassName = clsx(styles.container);
	if (isOpen) {
		asideClassName = clsx(styles.container, styles.container_open);
	}

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
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
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside className={asideClassName}>
				<form
					className={clsx(styles.form, styles.gap)}
					onSubmit={(e) => {
						e.preventDefault();
						props.onApply({ ...selectedArticleState.current });
					}}
					onReset={() => {
						selectedArticleState.current = { ...defaultArticleState };
						props.onReset();
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						selected={selectedArticleState.current.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(selectedElement) => {
							selectedArticleState.current.fontFamilyOption = selectedElement;
							setChanged({});
						}}
					/>
					<RadioGroup
						name='размер шрифта'
						options={fontSizeOptions}
						selected={selectedArticleState.current.fontSizeOption}
						onChange={(selectedElement) => {
							selectedArticleState.current.fontSizeOption = selectedElement;
							setChanged({});
						}}
						title='размер шрифта'
					/>
					<Select
						selected={selectedArticleState.current.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={(selectedElement) => {
							selectedArticleState.current.fontColor = selectedElement;
							setChanged({});
						}}
					/>
					<Separator />
					<Select
						selected={selectedArticleState.current.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={(selectedElement) => {
							selectedArticleState.current.backgroundColor = selectedElement;
							setChanged({});
						}}
					/>
					<Select
						selected={selectedArticleState.current.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={(selectedElement) => {
							selectedArticleState.current.contentWidth = selectedElement;
							setChanged({});
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
