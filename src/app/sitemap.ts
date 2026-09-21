import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://infinic.com.br'

    const routes = [
        { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
        { path: '/manutencao-computador-notebook', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/conserto-celular-tablet', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/atendimento-domiciliar-empresas', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/orcamento', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/sobre-nos', priority: 0.7, changeFrequency: 'monthly' as const },
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }))
}