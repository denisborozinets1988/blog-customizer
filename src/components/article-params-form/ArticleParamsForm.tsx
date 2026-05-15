import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [asideClassName, setAsideClassName] = useState([styles.container]);

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
					if (isOpen) {
						setAsideClassName([styles.container]);
					} else {
						setAsideClassName([styles.container, styles.container_open]);
					}
				}}
			/>
			<aside className={asideClassName.join(' ')}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						{/* <Select /> */}
						{/* <RadioGroup /> */}
						{/* <Select /> */}
						<Separator />
						{/* <Select /> */}
						{/* <Select /> */}
						{/* <Select /> */}
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
