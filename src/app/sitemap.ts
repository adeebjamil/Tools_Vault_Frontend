import { MetadataRoute } from 'next'
import { allTools } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tools-vault.app'

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/contact',
        '/privacy',
        '/terms',
        '/blog',
        '/tools',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Tool pages
    const toolPages = allTools.map((tool) => ({
        url: `${baseUrl}${tool.href}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...staticPages, ...toolPages]
}
