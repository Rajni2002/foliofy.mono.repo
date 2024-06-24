import { PlatformSocialEmbeds, PrimarySocialMediaLinks } from '@/types/ui/link-preview';
import { FacebookEmbed, InstagramEmbed, LinkedInEmbed, PinterestEmbed, XEmbed, YouTubeEmbed } from 'react-social-media-embed';


const PlatformBasedSocialEmbed = ({ platformName, url, ...props }: { platformName: keyof PrimarySocialMediaLinks, url: string }) => {
    const Embeds: PlatformSocialEmbeds = {
        twitter: XEmbed,
        instagram: InstagramEmbed,
        facebook: FacebookEmbed,
        youtube: YouTubeEmbed,
        pinterest: PinterestEmbed,
        linkedin: LinkedInEmbed,
    }
    const Comp = Embeds[platformName]
    return (
        <Comp url={url} {...props} />
    );
};

export default PlatformBasedSocialEmbed;
