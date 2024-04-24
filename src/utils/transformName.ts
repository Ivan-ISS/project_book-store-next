export default function transformPageNameToPath(pageName: string) {
    return pageName.split(' ')[0].toLowerCase();
}