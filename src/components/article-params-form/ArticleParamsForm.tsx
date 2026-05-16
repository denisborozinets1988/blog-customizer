import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
//import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { OptionType } from 'src/constants/articleProps';
import { useState } from 'react';

type ArticleParamsFormProps = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [defaultFontFamily] = useState({
		title: 'Open Sans',
		value: 'OpenSans',
		className: 'string',
	});
	const [selectedFontFamily, setSelectedFontFamily] = useState({
		title: 'Open Sans',
		value: 'OpenSans',
		className: 'string',
	});

	const asideClassName: any[] = [styles.container];
	if (props.isOpen) {
		asideClassName.push(styles.container_open);
	}

	//Наверное в app надо хранить эти списки чтобы при перерендеринге постоянно их не воссоздавать.

	const fontFamilyOptions: OptionType[] = [
		{
			title: 'Open Sans',
			value: 'OpenSans',
			className: 'string',
		},
		{
			title: 'Ubuntu',
			value: 'Ubuntu',
			className: 'string',
		},
		{
			title: 'Cormorant Garamond',
			value: 'CormorantGaramond',
			className: 'string',
		},
		{
			title: 'Days One',
			value: 'DaysOne',
			className: 'string',
		},
		{
			title: 'Merriweather',
			value: 'Merriweather',
			className: 'string',
		},
	];

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
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setSelectedFontFamily(defaultFontFamily);
					}}>
					<Select
						selected={selectedFontFamily}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(selectedElement) => {
							setSelectedFontFamily(selectedElement);
						}}
					/>
					{/* <RadioGroup /> 
					<Select selected={null} options={fontFamilyOptions} title='цвет шрифта' />
					<Separator />
					<Select selected={null} options={fontFamilyOptions} title='цвет фона' />
					<Select selected={null} options={fontFamilyOptions} title='ширина контента' />*/}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setSelectedFontFamily(defaultFontFamily);
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
