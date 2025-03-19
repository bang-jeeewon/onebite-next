/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // strict 모드가 켜져 있으면 리액트 앱에 존재하는 잠재적인 문제를 검사하기 위해서, 개발모드로 실행했을 때 컴포넌트를 두 번이나 실행을 시켜버리게 돼요. 근데 디버깅을 위해서 콘솔에 찍어볼 때 불편하기 때문에, 실습할 때는 false로 !!
}

export default nextConfig
