import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index('routes/home.tsx'),
    route('verify', 'routes/verify.tsx'),
    route('upload', 'routes/upload.tsx'),
    route('*', 'routes/not-found.tsx')
] satisfies RouteConfig;
