import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useEffect, useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	fontFamilyRef: React.MutableRefObject<OptionType>;
	fontSizeRef: React.MutableRefObject<OptionType>;
	fontColorRef: React.MutableRefObject<OptionType>;
	backgroundColorRef: React.MutableRefObject<OptionType>;
	contentWidthRef: React.MutableRefObject<OptionType>;
	Apply: (
		fontFamily: OptionType,
		fontSize: OptionType,
		fontColor: OptionType,
		backgroundColor: OptionType,
		contentWidth: OptionType
	) => void;
	Reset: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		props.fontFamilyRef.current
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		props.fontSizeRef.current
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		props.fontColorRef.current
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		props.backgroundColorRef.current
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		props.contentWidthRef.current
	);
	const asideClassName: any[] = [styles.container];
	if (props.isOpen) {
		asideClassName.push(styles.container_open);
	}

	/* Сброс неприменённых настроек на текущие при закрытии. */
	useEffect(() => {
		if (!props.isOpen) {
			setSelectedFontFamily(props.fontFamilyRef.current);
			setSelectedFontSize(props.fontSizeRef.current);
			setSelectedFontColor(props.fontColorRef.current);
			setSelectedBackgroundColor(props.backgroundColorRef.current);
			setSelectedContentWidth(props.contentWidthRef.current);
		}
	}, [props.isOpen]);

	return (
		<>
			<ArrowButton
				isOpen={props.isOpen}
				onClick={() => {
					props.setIsOpen(!props.isOpen);
				}}
			/>
			<aside className={asideClassName.join(' ')}>
				<form
					style={{ gap: 50 }}
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						props.Apply(
							selectedFontFamily,
							selectedFontSize,
							selectedFontColor,
							selectedBackgroundColor,
							selectedContentWidth
						);
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						selected={selectedFontFamily}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(selectedElement) => {
							setSelectedFontFamily(selectedElement);
						}}
					/>
					<RadioGroup
						name='размер шрифта'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={(selectedElement) => {
							setSelectedFontSize(selectedElement);
						}}
						title='размер шрифта'
					/>
					<Select
						selected={selectedFontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={(selectedElement) => {
							setSelectedFontColor(selectedElement);
						}}
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={(selectedElement) => {
							setSelectedBackgroundColor(selectedElement);
						}}
					/>
					<Select
						selected={selectedContentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={(selectedElement) => {
							setSelectedContentWidth(selectedElement);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setSelectedFontFamily(defaultArticleState.fontFamilyOption);
								setSelectedFontSize(defaultArticleState.fontSizeOption);
								setSelectedFontColor(defaultArticleState.fontColor);
								setSelectedBackgroundColor(defaultArticleState.backgroundColor);
								setSelectedContentWidth(defaultArticleState.contentWidth);
								props.Reset();
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
