import { createGlobalStyle } from 'styled-components';

const lightTheme = {
    body: '#F4F1DE', //배경색
    text: '#484848',
    primary: '#fff',
    input: '#f2f1ee',
    button: '#3D405B',
    graph: '#3D405B',
    resultText: '#ffffff',
    resultHeader: '#3D405B',
    resultBackground: '#3D405B',
    resultExit: '#d8d8d8',
};

const darkTheme = {
    body: '#121212',
    text: '#d8d8d8',
    primary: '#121212',
    input: '#1f1f1f',
    button: '#E07A5F',
    graph: '#1e1e1e',
    resultText: '#d8d8d8',
    resultHeader: '#1e1e1e',
    resultBackground: '#121212',
    resultExit: '#484848',
    test: 'dark',
};

export { lightTheme, darkTheme };