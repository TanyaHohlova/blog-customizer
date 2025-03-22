import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';
// import {BackgroundColorsSelect, ContentWidthSelect, FontsColorSelect, FontSizeRadioGroup, FontsSelect} from './components/article-params-form/componentsForm'

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);


type ParamsStyle = {
	fontSizeOption: string;
	fontFamilyOption: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
}
const App = () => {
	const [articleParams, setArticleParams] = useState({
		fontSizeOption: defaultArticleState.fontSizeOption.value,
		fontFamilyOption: defaultArticleState.fontFamilyOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value
	  });
	  
	  const handleApplyParams = (newParams:ParamsStyle) => {
		setArticleParams(newParams);
	  };
		
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamilyOption,
					'--font-size': articleParams.fontSizeOption,
					'--font-color': articleParams.fontColor,
					'--container-width': articleParams.contentWidth,
					'--bg-color': articleParams.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply = {handleApplyParams}/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
