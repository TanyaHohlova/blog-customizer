import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { OptionType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import clsx from 'clsx';

interface ArticleParamsFormProps {
    onApply: (params: any) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({onApply}) => {
	const [openButtomForm, setOpenButtomForm] = useState(false)

	const [stateFontSizeOptions, selectFontSizeOptions] = useState(fontSizeOptions[0])
	const [stateFontFamilyOptions, selectFontFamilyOptions] = useState(fontFamilyOptions[0])
	const [stateFontColors, selectFontColors] = useState(fontColors[0])
	const [stateBackgroundColors , selectBackgroundColors] = useState(backgroundColors[0])
	const [stateContentWidthArr, selectContentWidthArr] = useState(contentWidthArr[0])

	const asideRef = useRef<HTMLElement>(null)
	
	const toggleOpenButtomForm = () => {
		setOpenButtomForm(prevOpen => !prevOpen)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (asideRef.current && event.target instanceof Node && !asideRef.current.contains(event.target)){
				setOpenButtomForm(false)
			}
		}
		if (openButtomForm) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		}
	},[openButtomForm])

	return (
		<>
			<ArrowButton isOpen={openButtomForm} onClick={toggleOpenButtomForm} />
			<aside ref={asideRef} className={clsx(styles.container, { [styles.container_open]: openButtomForm })}>
				<form className={styles.form} onSubmit={(event) => {
					event.preventDefault(); // Предотвращаем перезагрузку страницы
					if (stateFontColors.value !== stateBackgroundColors.value ) {
						const params = {
							fontSizeOption: stateFontSizeOptions.value,
							fontFamilyOption: stateFontFamilyOptions.value,
							fontColor: stateFontColors.value,
							backgroundColor: stateBackgroundColors.value,
							contentWidth: stateContentWidthArr.value
						}

						onApply(params)					} 
					}} >

					<Select selected={stateFontFamilyOptions} onChange={selectFontFamilyOptions} options={fontFamilyOptions} 
					title='шрифт'/>
					<RadioGroup name={'radio'} selected={stateFontSizeOptions} onChange={selectFontSizeOptions} options={fontSizeOptions} 
					title={'размер шрифта'}	/>
                    <Select selected={stateFontColors} onChange={selectFontColors} options={fontColors}
					title='Цвет шрифта'/>
					<Separator/>
                    <Select selected={stateBackgroundColors} onChange={selectBackgroundColors} options={backgroundColors}
					title='Цвет фона'/>
                    <Select selected={stateContentWidthArr} onChange={selectContentWidthArr} options={contentWidthArr}
					title='Ширина контента'/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear'  onClick={() => {
                            // Логика сброса значений 
							selectFontSizeOptions(fontSizeOptions[0])
							selectFontFamilyOptions(fontFamilyOptions[0])							
							selectFontColors(fontColors[0])
							selectBackgroundColors(backgroundColors[0])
							selectContentWidthArr(contentWidthArr[0])

							const params = {
								fontFamilyOption: fontFamilyOptions[0],
								fontColor: fontColors[0],
								backgroundColor: backgroundColors[0],
								contentWidth: contentWidthArr[0],
								fontSizeOption: fontSizeOptions[0],
							}
	
							onApply(params)	
							
                        }} />
						<Button title='Применить' htmlType='submit' type='apply'  />

					</div>

				</form>
			</aside>
		</>
	);
}
