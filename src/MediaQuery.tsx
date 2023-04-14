import breakpoints from 'styled-components-breakpoints';

// 반응형 웹 사이즈 정의
const sizes = {
  ph: 450,
  sm: 600,
  md: 768,
  lg: 992,
  xl: 1200,
  max: 1450,
};

// media query 생성
export default breakpoints(sizes);